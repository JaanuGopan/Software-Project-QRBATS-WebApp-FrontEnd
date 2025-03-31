import { CircularProgress } from '@mui/material';
import React, { useState } from 'react';
import { IoMdCloseCircleOutline } from 'react-icons/io';
import { toast } from 'react-toastify';
import ModuleService from '../../api/services/ModuleService';
import InputField from '../../components/textfields/InputBox/InputField';
import InputList from '../../components/textfields/InputList/InputList';
import Department from '../../utils/Department';
import Utils from '../../utils/Utils';
import './ModulePage.css';

const ModuleUpdate = ({
  handleCloseModuleUpdateWindow,
  handleReloadModuleList,
  selectedModule,
}) => {
  const [moduleId, setModuleId] = useState(selectedModule.id);
  const [moduleName, setModuleName] = useState(selectedModule.moduleName);
  const [moduleCode, setModuleCode] = useState(selectedModule.moduleCode);
  const [semester, setSemester] = useState(selectedModule.semester);
  const [moduleEnrolmentKey, setModuleEnrolmentKey] = useState(selectedModule.moduleEnrolmentKey);
  const departmentList = Department.departmentList;
  const [departmentId, setDepartmentId] = useState(departmentList[selectedModule.departmentId - 1]);
  const [studentBatch, setStudentBatch] = useState(selectedModule.studentBatch);
  const [statingDate, setStartingDate] = useState(selectedModule.statingDate);
  const [endingDate, setEndingDate] = useState(selectedModule.endingDate);
  const [processing, setProcessing] = useState(false);

  const semesterList = ['1', '2', '3', '4', '5', '6', '7', '8'];
  const studentBatchList = Utils.studentBatchList;

  const handleUpdateModule = async (e) => {
    e.preventDefault();
    try {
      setProcessing(true);
      const response = await ModuleService.saveModule(
        moduleId,
        moduleCode,
        moduleName,
        moduleEnrolmentKey,
        semester,
        departmentList.indexOf(departmentId) + 1,
        studentBatch,
        statingDate,
        endingDate
      );
      if (response.status === 201) {
        toast.success('Module Updated Successfully ', response.data.moduleName);
        handleReloadModuleList();
      }
    } finally {
      setProcessing(false);
    }
  };

  return (
    <div className="row h-100 align-items-center justify-content-center px-3">
      <div className="col-12 col-sm-8 col-md-7 col-xl-6 col-xxl-5 py-3 module-create-main-container">
        <div className="module-create-title-close-button">
          <h3 className="module-create-title">Update Module</h3>
          <div className="module-create-close-button" onClick={handleCloseModuleUpdateWindow}>
            <IoMdCloseCircleOutline id="close-icon" />
          </div>
        </div>
        <div className="module-login-container">
          <div className="form-container">
            <form onSubmit={handleUpdateModule}>
              <div className="module-creation-input">
                <label>Module Name</label>
                <div className="module-creation-input-field">
                  <InputField
                    placeholder="Enter The Module Name"
                    value={moduleName}
                    onChange={(e) => setModuleName(e.target.value)}
                    inputType="text"
                  />
                </div>
              </div>
              <div className="module-creation-input">
                <label>Module Code</label>
                <div className="module-creation-input-field">
                  <InputField
                    placeholder="Enter the module code"
                    value={moduleCode}
                    onChange={(e) => setModuleCode(e.target.value)}
                    inputType="text"
                  />
                </div>
              </div>
              <div className="module-creation-input">
                <label>Semester</label>
                <div className="module-creation-input-field">
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
                </div>
              </div>
              <div className="module-creation-input">
                <label>Department</label>
                <div className="module-creation-input-field">
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
                </div>
              </div>
              <div className="module-creation-input">
                <label>Student Batch</label>
                <div className="module-creation-input-field">
                  <div className="choice-input mb-3">
                    <InputList
                      placeholder="Select Student Batch"
                      value={studentBatch}
                      onChange={(e) => setStudentBatch(e.target.value)}
                      list={studentBatchList}
                      inputType="text"
                      initialValue="Select student batch"
                      className="student-select-input"
                    />
                  </div>
                </div>
              </div>
              <div className="module-creation-input">
                <label>Start Date</label>
                <div className="module-creation-input-field">
                  <InputField
                    placeholder="Enter Module Start Date"
                    value={statingDate}
                    onChange={(e) => setStartingDate(e.target.value)}
                    inputType="date"
                  />
                </div>
              </div>
              <div className="module-creation-input">
                <label>End Date</label>
                <div className="module-creation-input-field">
                  <InputField
                    placeholder="Enter Module End Date"
                    value={endingDate}
                    onChange={(e) => setEndingDate(e.target.value)}
                    inputType="date"
                  />
                </div>
              </div>
              <div className="module-creation-input">
                <label>Enrolment Key</label>
                <div className="module-creation-input-field">
                  <InputField
                    placeholder="Enter Module Enrolment Key"
                    value={moduleEnrolmentKey}
                    onChange={(e) => setModuleEnrolmentKey(e.target.value)}
                    inputType="text"
                  />
                </div>
              </div>
              <div className="create-module-create-button">
                {processing ? (
                  <CircularProgress />
                ) : (
                  <button type="submit" className="btn btn-warning">
                    Save module
                  </button>
                )}
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModuleUpdate;
