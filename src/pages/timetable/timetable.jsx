import React, { useEffect, useState } from 'react';
import { MdCreateNewFolder } from 'react-icons/md';
import NormalButton from '../../components/buttons/NormalButton';
import TimeSlot from '../../components/timeslot/TimeSlot';
import './timetable.css';
import ModuleService from '../../api/services/ModuleService.js';
import Select from 'react-select';
import { BiSolidSave } from 'react-icons/bi';

const Timetable = () => {
  const [lectureList, setLectureList] = useState([{ id: 1 }]);
  const [selectedModuleId, setSelectedModuleId] = useState();
  const [selectedModule, setSelectedModule] = useState();
  const [moduleList, setModuleList] = useState([]);

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
                  title={'Create'}
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
              <div className="col">
                <input
                  type="text"
                  placeholder="Search..."
                  style={{
                    width: '150px',
                    padding: '3px 40px',
                    border: '0.5px solid black',
                    borderRadius: '5px',
                    textAlign: 'center',
                  }}
                  onChange={(e) => {}}
                />
              </div>
            </div>
          </div>
        </div>
        <div className={'row mb-3'}>
          <div className={'col'}>
            <label>Module Name</label>
            <Select
              id="selectModule"
              placeholder={'Select Module Code'}
              onChange={(e) => {
                setSelectedModuleId(e.value);
                const module = moduleList.find((module) => module.id === e.value);
                setSelectedModule(module);
              }}
              options={moduleList.map((module) => ({ value: module.id, label: module.moduleName }))}
              value={{
                value: selectedModuleId,
                label: moduleList.find((module) => module.id === selectedModuleId)?.moduleName,
              }}
            />
          </div>
          <div className={'col'}>
            <label>Module Code</label>
            <Select
              id="selectModule"
              placeholder={'Select Module Code'}
              onChange={(e) => {
                setSelectedModuleId(e.value);
                const module = moduleList.find((module) => module.id === e.value);
                setSelectedModule(module);
              }}
              options={moduleList.map((module) => ({ value: module.id, label: module.moduleCode }))}
              value={{
                value: selectedModuleId,
                label: moduleList.find((module) => module.id === selectedModuleId)?.moduleCode,
              }}
            />
          </div>
        </div>
        <div className="row scrollable-container">
          {lectureList.map((lecture, index) => (
            <div key={index} className="col-12">
              <TimeSlot
                lecture={lecture}
                onDelete={() => handleDeleteTimeSlot(index)}
                module={selectedModule}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Timetable;
