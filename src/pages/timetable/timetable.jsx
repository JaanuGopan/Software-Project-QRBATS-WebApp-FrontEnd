import React, { useEffect, useState } from 'react';
import { BiSolidSave } from 'react-icons/bi';
import { MdCreateNewFolder } from 'react-icons/md';
import ModuleService from '../../api/services/ModuleService.js';
import NormalButton from '../../components/buttons/NormalButton';
import TimeSlot from '../../components/timeslot/TimeSlot';
import './timetable.css';

const Timetable = () => {
  const [lectureList, setLectureList] = useState([{ id: 1 }]);

  const handleCreateClick = () => {
    setLectureList([...lectureList, { id: lectureList.length + 1 }]);
  };

  const handleDeleteTimeSlot = (index) => {
    setLectureList(lectureList.filter((_, i) => i !== index));
  };

  useEffect(() => {
    ModuleService.getModulesByUserId().then((res) => {
      setModuleList(res);
      setSelectedModuleId(res[0].id);
      setSelectedModule(res[0]);
    });
  }, []);

  return (
    <div className="row h-100">
      <div className="col">
        <div className="row my-3 justify-content-between align-items-center">
          <div className="col-auto fs-4 fw-bold ms-4">TimeTable</div>
          <div className="col-auto">
            <div className="row align-items-center">
              <div className="col-auto me-2">
                <NormalButton
                  handleClick={handleCreateClick}
                  title={'Add'}
                  icon={<MdCreateNewFolder className="buttonIcon" />}
                />
              </div>
              <div className="col-auto">
                <NormalButton
                  handleClick={() => {}}
                  title={'Save'}
                  icon={<BiSolidSave className="buttonIcon" />}
                  type={'save'}
                />
              </div>
            </div>
          </div>
        </div>

        <div className="row scrollable-container justify-content-start">
          <div className="col">
            {lectureList.map((lecture, index) => (
              <div key={index} className="row">
                <div className="col">
                  <TimeSlot lecture={lecture} onDelete={() => handleDeleteTimeSlot(index)} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Timetable;
