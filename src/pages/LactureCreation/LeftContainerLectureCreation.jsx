import React, { useContext, useEffect, useState } from 'react';
import Select from 'react-select';
import ModuleService from '../../api/services/ModuleService';
import { Button, ToggleButton, ToggleButtonGroup } from '@mui/material';
import { toast } from 'react-toastify';
import { AuthContext } from '../../config/AuthProvider';

const LeftContainerLectureCreation = ({
  getModuleCode,
  getDayList,
  showRightSideWindow,
  hideRightSideWindow,
  handleUpdateAvailableLectures,
  onModuleChange,
  onDayChange,
  handleGetAvailableLecturesForModule,
}) => {
  const { user } = useContext(AuthContext);
  const { userId, departmentId } = user || {};

  const handleGetModulesList = async () => {
    const response = await ModuleService.getModulesByUserId(userId);
    if (response) {
      const moduleList = response.map((module) => ({
        value: module.moduleId,
        label: module.moduleCode,
        name: module.moduleName,
      }));
      const moduleNameList = response.map((module) => ({
        value: module.moduleId,
        label: module.moduleName,
        moduleCode: module.moduleCode,
      }));
      setModuleCodeList(moduleList);
      setModuleNameList(moduleNameList);
      setModuleList(response);
    }
  };

  const [selectedModuleCode, setSelectedModuleCode] = useState(null);
  const [moduleList, setModuleList] = useState([]);
  const [moduleCodeList, setModuleCodeList] = useState([]);
  const [moduleNameList, setModuleNameList] = useState([]);
  const [day, setDay] = useState([]);
  const [isToggleButtonDisabled, setIsToggleButtonDisabled] = useState(true);
  const [selectedModuleName, setSelectedModuleName] = useState('');
  const [selectedModule, setSelectedModule] = useState([]);

  const handleDayChange = (e) => {
    const newDay = e;
    setDay((prevDay) => {
      const updatedDay = prevDay.includes(newDay)
        ? prevDay.filter((d) => d !== newDay)
        : [...prevDay, newDay];
      getDayList(updatedDay); // Pass the updated day list to the parent
      return updatedDay;
    });
  };

  const handleShowRightSideWindow = () => {
    if (selectedModuleCode === null) {
      toast.error('Please Select Module.');
    } else if (day.length === 0) {
      toast.error('Please Select Days.');
      return;
    } else {
      handleUpdateAvailableLectures('', day[0]);
      showRightSideWindow();
    }
  };

  /* const handelModuleChange = async (e) => {
    const response = await LectureService.getAllLecturesByModuleCode(e);
    if (response) {
      setDay(() => {
        const list = [];
        for (const i in response) {
          if (list.includes(response[i].lectureDay)) {
            continue;
          }
          list.push(response[i].lectureDay);
        }
        getDayList(list);
        return list;
      });
    }
  }; */

  useEffect(() => {
    handleGetModulesList();
  }, []);

  const handleModuleChange = (module) => {
    setSelectedModule(module);
    onModuleChange(module);
    setSelectedModuleName({
      value: module.moduleId,
      label: module.moduleName,
      moduleCode: module.moduleCode,
    });
    setSelectedModuleCode({
      value: module.moduleId,
      label: module.moduleCode,
      name: module.moduleName,
    });
    setIsToggleButtonDisabled(false);
    getModuleCode(module.moduleCode);
    handleGetAvailableLecturesForModule(module.moduleCode);
    setDay([]);
    getDayList([]);
    hideRightSideWindow();
  };

  return (
    <div className="left-container-lecture-creation">
      <label>Module Name</label>
      <Select
        id="selectModule"
        placeholder={'Select Module Code'}
        onChange={(e) => {
          const selectedModule = moduleList.find((module) => module.moduleId === e.value);
          handleModuleChange(selectedModule);
        }}
        options={moduleNameList}
        value={selectedModuleName}
      />
      <label>Module Code</label>
      <Select
        id="selectModule"
        placeholder={'Select Module Code'}
        onChange={(e) => {
          const selectedModule = moduleList.find((module) => module.moduleId === e.value);
          handleModuleChange(selectedModule);
        }}
        options={moduleCodeList}
        value={selectedModuleCode}
      />

      <label>Select Date</label>
      <ToggleButtonGroup
        color="primary"
        value={day}
        onChange={(e) => {
          handleDayChange(e.target.value);
        }}
        aria-label="Platform"
        id="toggle-button"
        disabled={isToggleButtonDisabled}
      >
        <ToggleButton value="Mon">Mon</ToggleButton>
        <ToggleButton value="Tue">Tue</ToggleButton>
        <ToggleButton value="Wed">Wed</ToggleButton>
        <ToggleButton value="Thu">Thu</ToggleButton>
        <ToggleButton value="Fri">Fri</ToggleButton>
        <ToggleButton value="Sat">Sat</ToggleButton>
        <ToggleButton value="Sun">Sun</ToggleButton>
      </ToggleButtonGroup>

      <div className="left-container-lecture-creation-submit-button">
        <Button variant="contained" color="primary" fullWidth onClick={handleShowRightSideWindow}>
          Create Time Slot
        </Button>
      </div>
    </div>
  );
};

export default LeftContainerLectureCreation;
