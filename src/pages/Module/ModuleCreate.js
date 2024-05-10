import React, { useState } from "react";
import "./ModulePage.css";
import Designer from "../../assets/Images/Designer.jpeg";
import InputField from "../../components/textfields/InputBox/InputField";
import { IoMdCloseCircleOutline } from "react-icons/io";
import CreateUserService from "../../api/services/CreateUserService";
import InputList from "../../components/textfields/InputList/InputList";

const ModuleCreate = ({ handleCloseModuleCreateWindow }) => {
  const [moduleName, setModuleName] = useState("");
  const [moduleCode, setModuleCode] = useState("");
  const [semester, setSemester] = useState("");
  const [moduleEnrolmentKey, setModuleEnrolmentKey] = useState("");
  const [departmentId, setDepartmentId] = useState("");
  const [lectureId, setLectureId] = useState("");

  const departmentList = ["DEIE", "DCOM", "DMME", "DCEE", "DMENA"];
  const semesterList = ["1", "2", "3", "4", "5", "6", "7", "8"];

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = CreateUserService.saveUser();

      console.error("Login success...");
      handleCloseModuleCreateWindow();
    } catch (error) {
      console.error("Login failed", error);
    }
  };

  return (
    <div className="module-signup-main-container">
      <div
        className="closeCreateEventWindow"
        onClick={handleCloseModuleCreateWindow}
      >
        <IoMdCloseCircleOutline />
      </div>
      <p className="module-head1">Create module</p>
      <div className="module-login-container">
        <div className="module-image-container">
          <img src={Designer} className="module-logo" alt="Logo" />
        </div>
        <div className="form-container">
          <form onSubmit={handleSubmit}>
            {/* First Name Input */}
            <InputField
              placeholder="Enter The Module Name"
              value={moduleName}
              onChange={(e) => setModuleName(e.target.value)}
              inputType="text"
            />

            {/* Last Name Input */}
            <InputField
              placeholder="Enter the module code"
              value={moduleCode}
              onChange={(e) => setModuleCode(e.target.value)}
              inputType="text"
            />

            <div className="choice-input mb-3">
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

            {/* Password Input */}
            <InputField
              placeholder="Enter Module Enrolment Key"
              value={moduleEnrolmentKey}
              onChange={(e) => setModuleEnrolmentKey(e.target.value)}
              inputType="password"
            />

            <button type="submit" className="btn btn-success w-100">
              Create module
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ModuleCreate;
