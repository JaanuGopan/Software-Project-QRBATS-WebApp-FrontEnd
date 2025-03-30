import { CircularProgress } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import Select from 'react-select';
import { toast } from 'react-toastify';
import LectureService from '../../api/services/LectureService';
import ModuleService from '../../api/services/ModuleService';
import CreatedLectureModal from './CreatedLectureModal';

const SingleLectureCreate = () => {
  const today = new Date().toISOString().split('T')[0];
  const [lectureName, setLectureName] = useState();
  const [lectureModuleCode, setLectureModuleCode] = useState();
  const [lectureDate, setLectureDate] = useState(today);
  const [lectureStartTime, setLectureStartTime] = useState(
    new Date(new Date().getTime() + 5 * 60000).toTimeString().slice(0, 5)
  );
  const [lectureEndTime, setLectureEndTime] = useState();
  const [locationId, setLocationId] = useState();
  const [showCreatedLecture, setShowCreatedLecture] = useState(false);
  const [lectureSaveLoading, setLectureSaveLoading] = useState(false);
  const [selectedModuleId, setSelectedModuleId] = useState();
  const [selectedModule, setSelectedModule] = useState(null);
  const [moduleList, setModuleList] = useState([]);
  const [createdLecture, setCreatedLecture] = useState({});

  const locationList = useSelector((state) => state.locationList);

  useEffect(() => {
    ModuleService.getModulesByUserId().then((res) => {
      setModuleList(res);
    });
  }, []);

  const handleSaveLecture = async (e) => {
    e.preventDefault();

    if (lectureDate === today && lectureStartTime < new Date().toTimeString().slice(0, 5)) {
      toast.warning('The lecture start time should be in the future.');
      return;
    }

    if (lectureEndTime <= lectureStartTime) {
      toast.warning('The lecture end time should be greater than the lecture start time.');
      return;
    }

    const data = {
      name: `${selectedModule.moduleCode}_${lectureDate}_${lectureStartTime}_Lecture`,
      lectureDate: lectureDate,
      lectureStartTime: lectureStartTime,
      lectureEndTime: lectureEndTime,
      locationId: locationId,
      lectureStatus: 'PENDING',
      moduleId: selectedModule.id,
      lectureType: 'LECTURE',
    };

    console.log(data);

    try {
      setLectureSaveLoading(true);
      await LectureService.createSingleLecture(data).then((responseDate) => {
        toast.success('Lecture successfully created.');
        setShowCreatedLecture(true);
        setCreatedLecture(responseDate);
      });
    } finally {
      setLectureSaveLoading(false);
    }
  };

  const clearFields = () => {
    setLectureName('');
    setLectureModuleCode('');
    setLectureDate(today);
    setLectureStartTime(new Date().toTimeString().slice(0, 5));
    setLectureEndTime();
    setLocationId();
  };

  const handleReset = () => {
    clearFields();
    setSelectedModuleId();
    setSelectedModule(null);
  };

  function handleModuleChange(e) {
    const module = moduleList.find((module) => module.id === e.value);
    if (module?.endingDate >= today) {
      setSelectedModuleId(e.value);
      setSelectedModule(module);
    } else {
      toast.warn(`The module ${module.moduleName} has already ended.`);
    }
  }

  return (
    <div className="row px-3">
      <div className="col">
        <form onSubmit={handleSaveLecture}>
          <div className="row justify-content-center mb-3">
            <div className="col-auto">
              <h5>Create Single Lecture</h5>
            </div>
          </div>
          <div className={'row mb-3'}>
            <div className={'col'}>
              <label>Module Name</label>
              <Select
                id="selectModule"
                placeholder={'Select Module Name'}
                onChange={(e) => {
                  handleModuleChange(e);
                }}
                options={moduleList.map((module) => ({
                  value: module.id,
                  label: module.moduleName,
                }))}
                value={
                  selectedModuleId
                    ? {
                        value: selectedModuleId,
                        label: moduleList.find((module) => module.id === selectedModuleId)
                          ?.moduleName,
                      }
                    : null
                }
              />
            </div>
            <div className={'col'}>
              <label>Module Code</label>
              <Select
                id="selectModule"
                placeholder={'Select Module Code'}
                onChange={(e) => {
                  handleModuleChange(e);
                }}
                options={moduleList.map((module) => ({
                  value: module.id,
                  label: module.moduleCode,
                }))}
                value={
                  selectedModuleId
                    ? {
                        value: selectedModuleId,
                        label: moduleList.find((module) => module.id === selectedModuleId)
                          ?.moduleCode,
                      }
                    : null
                }
              />
            </div>
          </div>
          {selectedModule ? (
            <>
              <div className="row">
                <div className="col">
                  <div className="row">
                    <label htmlFor="lectureName">Lecture Date</label>
                  </div>
                  <div className="row px-2">
                    <input
                      required
                      type="date"
                      id="lectureDate"
                      name="lectureDate"
                      placeholder={'Lecture Date'}
                      className="form-control mb-2"
                      value={lectureDate}
                      onChange={(e) => setLectureDate(e.target.value)}
                      min={new Date().toISOString().split('T')[0]}
                      max={selectedModule.endingDate}
                    />
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col">
                  <div className="row">
                    <label htmlFor="venue">Venue</label>
                  </div>
                  <div className="row px-2">
                    <select
                      required
                      value={locationId}
                      onChange={(e) => setLocationId(e.target.value)}
                      className="form-control mb-2"
                    >
                      <option value="">Select Venue</option>
                      {locationList.map((option, index) => (
                        <option key={index} value={option.locationId}>
                          {option.locationName}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col">
                  <div className="row">
                    <label className="form-label" htmlFor="eventDate">
                      Lecture Starting Time
                    </label>
                  </div>
                  <div className="row px-2">
                    <input
                      required
                      type="time"
                      value={lectureStartTime}
                      onChange={(e) => {
                        if (
                          lectureDate === today &&
                          e.target.value < new Date().toTimeString().slice(0, 5)
                        ) {
                          toast.warning('The lecture start time should be in future.');
                          return;
                        }
                        setLectureStartTime(`${e.target.value}:00`);
                        setLectureName(
                          `${lectureModuleCode}_${lectureDate}_${e.target.value}:00_Lecture`
                        );
                      }}
                      className="form-control mb-2"
                      min={lectureDate === today && new Date().toTimeString().slice(0, 5)}
                    />
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col">
                  <div className="row">
                    <label className="form-label" htmlFor="eventEndTime">
                      Lecture Ending Time
                    </label>
                  </div>
                  <div className="row px-2">
                    <input
                      required
                      type="time"
                      value={lectureEndTime}
                      onChange={(e) => {
                        if (
                          lectureDate === today &&
                          e.target.value < new Date().toTimeString().slice(0, 5)
                        ) {
                          toast.warning('The lecture end time should be in future.');
                          return;
                        }
                        if (e.target.value < lectureStartTime) {
                          toast.warning(
                            'The lecture end time should be greater than lecture start time.'
                          );
                          return;
                        }
                        setLectureEndTime(`${e.target.value}:00`);
                      }}
                      className="form-control mb-2"
                    />
                  </div>
                </div>
              </div>
              <div className="row"></div>
              {lectureSaveLoading ? (
                <div className="row justify-content-center">
                  <CircularProgress />
                </div>
              ) : (
                <div className="row justify-content-center mt-2">
                  <div className="col-6">
                    <button type="submit" className="btn btn-success w-100">
                      Save
                    </button>
                  </div>
                </div>
              )}
            </>
          ) : (
            <div
              className="row justify-content-center align-items-center"
              style={{ height: '50vh' }}
            >
              <div className="col-auto">No Module Selected</div>
            </div>
          )}
        </form>
        {showCreatedLecture && createdLecture && (
          <CreatedLectureModal
            lecture={createdLecture}
            handleClose={() => {
              handleReset();
              setShowCreatedLecture(false);
              setCreatedLecture(null);
            }}
            module={selectedModule}
          />
        )}
      </div>
    </div>
  );
};

export default SingleLectureCreate;
