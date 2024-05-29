import React, { useState } from "react";
import "./ModulePage.css";
import Designer from "../../assets/Images/Designer.jpeg";
import InputField from "../../components/textfields/InputBox/InputField";
import { IoMdCloseCircleOutline } from "react-icons/io";
import CreateUserService from "../../api/services/CreateUserService";
import InputList from "../../components/textfields/InputList/InputList";
import ModuleService from "../../api/services/ModuleService";
import { selectUser } from "../../redux/features/userSlice";
import { useSelector } from "react-redux";

const ModuleUpdate = ({
  handleCloseModuleUpdateWindow,
  handleReloadModuleList,
  selectedModule,
}) => {
  const [moduleName, setModuleName] = useState(selectedModule.moduleName);
  const [moduleCode, setModuleCode] = useState(selectedModule.moduleCode);
  const [semester, setSemester] = useState(selectedModule.semester);
  const [moduleEnrolmentKey, setModuleEnrolmentKey] = useState(
    selectedModule.moduleEnrolmentKey
  );
  const departmentList = ["DEIE", "DCOM", "DMME", "DCEE", "DMENA"];

  const [departmentId, setDepartmentId] = useState(
    departmentList[selectedModule.departmentId - 1]
  );

  const { userId } = useSelector(selectUser) || {};

  const semesterList = ["1", "2", "3", "4", "5", "6", "7", "8"];

  const handleCreateModule = async (e) => {
    e.preventDefault();
    try {
      const response = await ModuleService.createModule(
        moduleCode,
        moduleName,
        moduleEnrolmentKey,
        semester,
        departmentList.indexOf(departmentId) + 1,
        userId
      );
      console.log(response);
      handleClearData();
      handleReloadModuleList();
    } catch (error) {
      console.error("Fail to create modules.", error);
    }
  };

  const handleClearData = () => {
    setModuleCode("");
    setModuleName("");
    setDepartmentId("");
    setModuleEnrolmentKey("");
    setSemester("");
  };

  return (
    <div className="module-signup-main-container">
      <div
        className="closeCreateModuleWindow"
        onClick={handleCloseModuleUpdateWindow}
      >
        <IoMdCloseCircleOutline size={25} />
      </div>
      <p className="module-head1">Update module</p>
      <div className="module-login-container">
        {/* <div className="module-image-container">
          <img src={Designer} className="module-logo" alt="Logo" />
        </div> */}
        <div className="form-container">
          <form onSubmit={handleCreateModule}>
            <label>Module Name</label>
            <InputField
              placeholder="Enter The Module Name"
              value={moduleName}
              onChange={(e) => setModuleName(e.target.value)}
              inputType="text"
            />
            <label>Module Code</label>
            <InputField
              placeholder="Enter the module code"
              value={moduleCode}
              onChange={(e) => setModuleCode(e.target.value)}
              inputType="text"
            />

            <div className="choice-input mb-3">
              <label>Semester</label>
              <InputList
                placeholder="Select semester"
                value={semester}
                onChange={(e) => setSemester(e.target.value)}
                list={semesterList}
                inputType="text"
                initialValue="Select semester"
                className="student-select-input"
              />
            </div>

            <div className="choice-input mb-3">
              <label>Department</label>
              <InputList
                placeholder="Select department"
                value={departmentId}
                onChange={(e) => setDepartmentId(e.target.value)}
                list={departmentList}
                inputType="text"
                initialValue="Select department"
                className="student-select-input"
              />
            </div>
            <label>Enrolment Key</label>
            <InputField
              placeholder="Enter Module Enrolment Key"
              value={moduleEnrolmentKey}
              onChange={(e) => setModuleEnrolmentKey(e.target.value)}
              inputType="password"
            />

            <button type="submit" className="btn btn-success w-100">
              Update module
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ModuleUpdate;
