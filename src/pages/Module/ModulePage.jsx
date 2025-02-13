import React, { useState, useEffect, useContext } from 'react';
import NormalButton from '../../components/layout/AdminDashboardComponent/NormalButton';
import { MdCreateNewFolder } from 'react-icons/md';
import ModuleTable from './ModuleTable';
import ModuleService from '../../api/services/ModuleService';
import ModuleUpdate from './ModuleUpdate';
import { RiDeleteBin5Fill } from 'react-icons/ri';
import './ModulePage.css';
import ModuleCreate from './ModuleCreate';
import { ToastContainer, toast } from 'react-toastify';
import WarningPopup from '../../components/warningPopup/WarningPopup';
import { AuthContext } from '../../config/AuthProvider';

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
    console.log('Selected Module:', module);
  };

  const handleReloadModuleList = async () => {
    ModuleService.getModulesByUserId(userId).then((modules) => {
      setModuleList(modules);
      console.log(modules);
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
    if (!selectedModule) {
      toast.error('Please select a module to delete.');
      return;
    }
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
        console.log(response);
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
    <div>
      <ToastContainer />
      <div className="module-Dash">
        <div className="module-SearchEvent">
          <p className="module-mainHead">Modules</p>
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
        <div className="module-ModuleList">
          <ModuleTable
            modulesList={moduleList}
            onModuleClick={handleModuleClick}
            searchModule={searchModule}
            handleDeleteModule={() => {}}
            handleOpenCreateModuleWindow={() => {}}
            handleOpenUpdateModuleWindow={() => {
              setShowUpdateModuleWindow(true);
            }}
          />

          <div className="module-List-Buttons">
            <NormalButton
              handleClick={() => {
                setShowModuleCreateWindow(true);
              }}
              title={'Create'}
              titlewithiconicon={<MdCreateNewFolder className="buttonIcon" />}
            />
            <NormalButton
              title={'Delete'}
              handleClick={handleOpenDeletePopUpWindow}
              titlewithiconicon={<RiDeleteBin5Fill className="buttonIcon" />}
            />
          </div>
        </div>
        {showUpdateModuleWindow && (
          <div
            className="Module-Create-module-Dashboard"
            handleClick={() => {
              setShowModuleCreateWindow(false);
            }}
          >
            <ModuleUpdate
              handleCloseModuleUpdateWindow={() => {
                setShowUpdateModuleWindow(false);
              }}
              handleReloadModuleList={handleReloadModuleList}
              selectedModule={selectedModule}
            />
          </div>
        )}
        {showModuleCreateWindow && (
          <div
            className="Module-Create-module-Dashboard"
            handleClick={() => {
              setShowUpdateModuleWindow(false);
            }}
          >
            <ModuleCreate
              handleCloseModuleCreateWindow={() => {
                setShowModuleCreateWindow(false);
              }}
              handleReloadModuleList={handleReloadModuleList}
              handleModuleCreate={(moduleData) => handleModuleCreate(moduleData)}
            />
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
