import React, { useEffect, useState } from "react";
import Select from "react-select";
import ModuleService from "../../api/services/ModuleService";
import { useSelector } from "react-redux";
import { selectUser } from "../../redux/features/userSlice";
import { Button, ToggleButton, ToggleButtonGroup } from "@mui/material";
import ButtonComponent from "../../components/buttons/ButtonComponent";
import InputField from "../../components/textfields/InputBox/InputField";
import LectureService from "../../api/services/LectureService";
const LeftContainerLectureCreation = ({
  getModuleCode,
  getDayList,
  showRightSideWindow,
}) => {
  const user = useSelector(selectUser);
  const { userId, departmentId } = user || {};

  const handleGetModulesList = async () => {
    const response = await ModuleService.getModulesByUserId(userId);
    if (response) {
      const moduleList = response.map((module) => ({
        value: module.moduleId,
        label: module.moduleCode,
        name: module.moduleName,
      }));
      setModuleList(moduleList);
    }
  };

  const [moduleCode, setModuleCode] = useState(null);
  const [moduleList, setModuleList] = useState([]);
  const [day, setDay] = useState([]);
  const [isToggleButtonDisabled, setIsToggleButtonDisabled] = useState(true);
  const [moduleName, setModuleName] = useState("");

  const handleChange = (e) => {
    const newDay = e;
    setDay((prevDay) => {
      const updatedDay = prevDay.includes(newDay)
        ? prevDay.filter((d) => d !== newDay)
        : [...prevDay, newDay];
      getDayList(updatedDay); // Pass the updated day list to the parent
      return updatedDay;
    });
  };

  const handelModuleChange = async (e) => {
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
  };

  useEffect(() => {
    handleGetModulesList();
  }, []);

  return (
    <div className="left-container-lecture-creation">
      <label>Module Code</label>
      <Select
        id="selectModule"
        placeholder={"Select Module Code"}
        onChange={(e) => {
          handelModuleChange(e.label);
          setModuleCode(e);
          getModuleCode(e.label);
          setIsToggleButtonDisabled(false);
          setModuleName(e.name);
        }}
        options={moduleList}
        value={moduleCode}
      />
      <label>Module Name</label>
      <InputField type="text" value={moduleName} />

      <label>Select Date</label>
      <ToggleButtonGroup
        color="primary"
        value={day}
        onChange={(e) => {
          handleChange(e.target.value);
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
        <Button
          variant="contained"
          color="primary"
          fullWidth
          onClick={showRightSideWindow}
        >
          Create Time Slot
        </Button>
      </div>
    </div>
  );
};

export default LeftContainerLectureCreation;
