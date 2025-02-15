import React, { useContext, useEffect, useState } from 'react';
import { MdCreateNewFolder } from 'react-icons/md';
import { toast } from 'react-toastify';
import ModuleService from '../../api/services/ModuleService';
import AppContentCard from '../../components/app-content-card/app-content-card';
import NormalButton from '../../components/buttons/NormalButton';
import WarningPopup from '../../components/warningPopup/WarningPopup';
import { AuthContext } from '../../config/AuthProvider';
import ModuleTable from './module-table';
import ModuleCreate from './ModuleCreate';
import './ModulePage.css';
import ModuleUpdate from './ModuleUpdate';

const ModulePage = () => {
  const { user } = useContext(AuthContext);
  const { userId } = user || {};

  const [showModuleTable, setShowModuleTable] = useState(true);
  const [showUpdateModuleWindow, setShowUpdateModuleWindow] = useState(false);
  const [showModuleCreateWindow, setShowModuleCreateWindow] = useState(false);
  const [showDeleteModuleWindow, setShowDeleteModuleWindow] = useState(false);

  const [selectedModule, setSelectedModule] = useState(null);
  const [moduleList, setModuleList] = useState([]);
  const [searchModule, setSearchModule] = useState('');

  useEffect(() => {
    handleReloadModuleList();
  }, []);

  const handleModuleClick = (module) => {
    setSelectedModule(module);
  };

  const handleReloadModuleList = async () => {
    ModuleService.getModulesByUserId(userId).then((modules) => {
      setModuleList(modules);
    });
  };

  const handleOpenUpdateModuleWindow = () => {
    setShowModuleTable(false);
    setShowUpdateModuleWindow(true);
  };

  const [processingDelete, setProcessingDelete] = useState(false);

  const handleDeleteModule = async () => {
    try {
      setProcessingDelete(true);
      const response = await ModuleService.deleteModuleById(selectedModule.moduleId);
      if (response.status === 200) {
        handleReloadModuleList();
        toast.success('Module Deleted Successfully!');
        setSelectedModule(null);
      } else if (response.status === 400) {
        toast.error(response.data);
        toast.error('Module Deletion Failed!');
      } else {
        toast.error('Error In Module Deletion!');
      }
      setShowDeleteModuleWindow(false);
    } finally {
      setProcessingDelete(false);
    }
  };

  const handleOpenDeletePopUpWindow = () => {
    setShowDeleteModuleWindow(true);
  };

  const handleModuleCreate = async (moduleData) => {
    try {
      const response = await ModuleService.createModule(
        moduleData.moduleCode,
        moduleData.moduleName,
        moduleData.moduleEnrolmentKey,
        moduleData.semester,
        moduleData.departmentId,
        moduleData.userId
      );
      if (response.status === 200) {
        toast.success('Module Created Successfully ', response.data.moduleName);
        handleReloadModuleList();
        setShowModuleCreateWindow(false);
      } else if (response.status === 400) {
        toast.error(response.data);
      } else {
        toast.error('Something went wrong. Please try again later.');
      }
    } catch (error) {
      console.error('Fail to create modules.', error);
      toast.error('Something went wrong. Please try again later.');
    }
  };

  return (
    <div className="row">
      <div className="col">
        <div className="row my-3 justify-content-between align-items-center">
          <div className="col-auto fs-4 fw-bold ms-4">Modules</div>
          <div className="col-auto">
            <div className="row align-items-center">
              <div className="col">
                <NormalButton
                  handleClick={() => {
                    setShowModuleCreateWindow(true);
                  }}
                  title={'Create'}
                  icon={<MdCreateNewFolder className="buttonIcon" />}
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
                  onChange={(e) => setSearchModule(e.target.value)}
                />
              </div>
            </div>
          </div>
        </div>
        <AppContentCard>
          <ModuleTable
            modulesList={moduleList}
            onModuleClick={handleModuleClick}
            searchModule={searchModule}
            handleDeleteModule={handleOpenDeletePopUpWindow}
            handleOpenUpdateModuleWindow={() => {
              setShowUpdateModuleWindow(true);
            }}
          />
        </AppContentCard>
        {showUpdateModuleWindow && (
          <div className="row align-items-center justify-content-center module-create-or-update-modal-container">
            <div className="col">
              <ModuleUpdate
                handleCloseModuleUpdateWindow={() => {
                  setShowUpdateModuleWindow(false);
                }}
                handleReloadModuleList={handleReloadModuleList}
                selectedModule={selectedModule}
              />
            </div>
          </div>
        )}
        {showModuleCreateWindow && (
          <div className="container-fluid align-items-center justify-content-center module-create-or-update-modal-container">
            <div className="row h-100">
              <div className="col">
                <ModuleCreate
                  handleCloseModuleCreateWindow={() => {
                    setShowModuleCreateWindow(false);
                  }}
                  handleReloadModuleList={handleReloadModuleList}
                  handleModuleCreate={(moduleData) => handleModuleCreate(moduleData)}
                />
              </div>
            </div>
          </div>
        )}
        {showDeleteModuleWindow && selectedModule && (
          <div className="module-delete-window-container">
            <WarningPopup
              handleOk={handleDeleteModule}
              handleCancel={() => {}}
              handleCloseWarningWindow={() => {
                setShowDeleteModuleWindow(false);
                handleReloadModuleList();
              }}
              titleText={'Are You Sure You Want To Delete This Module?'}
              buttonText={'Delete'}
              processing={processingDelete}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default ModulePage;
