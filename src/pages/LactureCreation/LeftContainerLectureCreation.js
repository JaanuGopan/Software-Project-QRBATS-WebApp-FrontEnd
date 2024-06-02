import React, { useEffect, useState } from "react";
import Select from "react-select";
import ModuleService from "../../api/services/ModuleService";
import { useSelector } from "react-redux";
import { selectUser } from "../../redux/features/userSlice";
import { Button, ToggleButton, ToggleButtonGroup } from "@mui/material";
import ButtonComponent from "../../components/buttons/ButtonComponent";

const LeftContainerLectureCreation = ({
  getModuleCode,
  getDayList,
  showRightSideWindow,
}) => {
  const user = useSelector(selectUser);
  const { userId, departmentId } = user || {};

  const handleGetModulesList = async () => {
    const response = await ModuleService.getAllModulesByDepartmentId(
      departmentId
    );
    if (response) {
      const moduleList = response.map((module) => ({
        value: module.moduleId,
        label: module.moduleCode,
      }));
      setModuleList(moduleList);
      console.log(moduleList);
    }
  };

  const [moduleCode, setModuleCode] = useState(null);
  const [moduleList, setModuleList] = useState([]);
  const [day, setDay] = useState([]);
  const [isToggleButtonDisabled, setIsToggleButtonDisabled] = useState(true);

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
          setModuleCode(e);
          getModuleCode(e.label);
          setIsToggleButtonDisabled(false);
        }}
        options={moduleList}
        value={moduleCode}
      />

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
