import React, { useContext, useState } from 'react';
import './ModulePage.css';
import InputField from '../../components/textfields/InputBox/InputField';
import { IoMdCloseCircleOutline } from 'react-icons/io';
import InputList from '../../components/textfields/InputList/InputList';
import { CircularProgress } from '@mui/material';
import { AuthContext } from '../../config/AuthProvider';
import Department from '../../utils/Department';

const ModuleCreate = ({
  handleCloseModuleCreateWindow,
  handleReloadModuleList,
  handleModuleCreate,
}) => {
  const [moduleName, setModuleName] = useState('');
  const [moduleCode, setModuleCode] = useState('');
  const [semester, setSemester] = useState('');
  const [moduleEnrolmentKey, setModuleEnrolmentKey] = useState('');
  const [departmentId, setDepartmentId] = useState('');

  const { user } = useContext(AuthContext);
  const { userId } = user || {};

  const departmentList = Department.departmentList;
  const semesterList = ['1', '2', '3', '4', '5', '6', '7', '8'];

  const [processing, setProcessing] = useState(false);

  const handleCreateModule = async (e) => {
    e.preventDefault();
    const moduleData = {
      moduleCode: moduleCode,
      moduleName: moduleName,
      semester: semester,
      moduleEnrolmentKey: moduleEnrolmentKey,
      departmentId: departmentList.indexOf(departmentId) + 1,
      userId,
    };
    try {
      setProcessing(true);
      await handleModuleCreate(moduleData);
    } finally {
      setProcessing(false);
    }
  };

  const handleClearData = () => {
    setModuleCode('');
    setModuleName('');
    setDepartmentId('');
    setModuleEnrolmentKey('');
    setSemester('');
  };

  return (
    <div className='row h-100 align-items-center justify-content-center px-3'>
      <div className="col-12 col-sm-8 col-md-7 col-xl-6 col-xxl-5 py-3 module-create-main-container">
        <div className="module-create-title-close-button">
          <h3 className="module-create-title">Create Module</h3>
          <div className="module-create-close-button" onClick={handleCloseModuleCreateWindow}>
            <IoMdCloseCircleOutline id="close-icon" />
          </div>
        </div>
        <div className="module-login-container">
          <div className="form-container">
            <form onSubmit={handleCreateModule}>
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
                  <button type="submit" className="btn btn-success">
                    Create module
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

export default ModuleCreate;
