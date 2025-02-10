import React, { useState } from 'react';
import './ModulePage.css';
import Designer from '../../assets/Images/Designer.jpeg';
import InputField from '../../components/textfields/InputBox/InputField';
import { IoMdCloseCircleOutline } from 'react-icons/io';
import CreateUserService from '../../api/services/CreateUserService';
import InputList from '../../components/textfields/InputList/InputList';
import ModuleService from '../../api/services/ModuleService';
import { selectUser } from '../../redux/features/userSlice';
import { useSelector } from 'react-redux';
import { ToastContainer, toast } from 'react-toastify';
import { CircularProgress } from '@mui/material';

const ModuleUpdate = ({
  handleCloseModuleUpdateWindow,
  handleReloadModuleList,
  selectedModule,
}) => {
  const [moduleId, setModuleId] = useState(selectedModule.moduleId);
  const [moduleName, setModuleName] = useState(selectedModule.moduleName);
  const [moduleCode, setModuleCode] = useState(selectedModule.moduleCode);
  const [semester, setSemester] = useState(selectedModule.semester);
  const [moduleEnrolmentKey, setModuleEnrolmentKey] = useState(selectedModule.moduleEnrolmentKey);
  const departmentList = ['DEIE', 'DCOM', 'DMME', 'DCEE', 'DMENA', 'DIS'];

  const [departmentId, setDepartmentId] = useState(departmentList[selectedModule.departmentId - 1]);

  const { userId } = useSelector(selectUser) || {};

  const semesterList = ['1', '2', '3', '4', '5', '6', '7', '8'];

  const [processing, setProcessing] = useState(false);

  const handleUpdateModule = async (e) => {
    e.preventDefault();
    try {
      setProcessing(true);
      const response = await ModuleService.updateModule(
        moduleId,
        moduleCode,
        moduleName,
        moduleEnrolmentKey,
        semester,
        departmentList.indexOf(departmentId) + 1,
        userId
      );
      if (response.status === 200) {
        toast.success('Module Updated Successfully ', response.data.moduleName);
        console.log(response);
        handleReloadModuleList();
      } else if (response.status === 400) {
        toast.error(response.data);
      } else {
        console.log(response.status);
        toast.error('Failed To Update Module.');
      }
    } catch (error) {
      console.error('Fail To Update modules.', error);
      toast.error('Error In Updating Module.');
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
    <div className="module-update-main-container">
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
  );
};

export default ModuleUpdate;
