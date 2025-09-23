import { useEffect, useState } from 'react';
import { MdArrowBack, MdCreateNewFolder } from 'react-icons/md';
import { toast } from 'react-toastify';
import LectureService from '../../api/services/LectureService';
import ModuleService from '../../api/services/ModuleService';
import AppContentCard from '../../components/app-content-card/app-content-card';
import AppSearch from '../../components/app-search/app-search';
import NormalButton from '../../components/buttons/NormalButton';
import LecturesTable from '../../components/tables/lectures-table';
import WarningPopup from '../../components/warningPopup/WarningPopup';
import LecturesEdit from '../Lectures/LecturesEdit';
import ModuleTable from './module-table';
import ModuleCreate from './ModuleCreate';
import './ModulePage.css';
import ModuleUpdate from './ModuleUpdate';

const ModulePage = () => {
  const [title, setTitle] = useState('Modules');
  const [showModuleTable, setShowModuleTable] = useState(true);
  const [showUpdateModuleWindow, setShowUpdateModuleWindow] = useState(false);
  const [showModuleCreateWindow, setShowModuleCreateWindow] = useState(false);
  const [showDeleteModuleWindow, setShowDeleteModuleWindow] = useState(false);
  const [showLectureListForModule, setShowLectureListForModule] = useState(false);
  const [moduleLectureList, setModuleLectureList] = useState([]);
  const [selectedLecture, setSelectedLecture] = useState(null);
  const [showEditLectureWindow, setShowEditLectureWindow] = useState(false);
  const [editLecture, setEditLecture] = useState(null);
  const [processingDeleteLecture, setProcessingDeleteLecture] = useState(false);
  const [showDeleteLecturePopup, setShowDeleteLecturePopup] = useState(false);

  const [selectedModule, setSelectedModule] = useState(null);
  const [moduleList, setModuleList] = useState([]);
  const [search, setSearch] = useState('');
  const [selectedLectureList, setSelectedLectureList] = useState(null);
  const [showDeleteLectureListPopup, setShowDeleteLectureListPopup] = useState(false);

  useEffect(() => {
    handleReloadModuleList();
  }, []);

  const handleModuleClick = (module) => {
    setSelectedModule(module);
  };

  const handleReloadModuleList = async () => {
    ModuleService.getModulesByUserId().then((modules) => {
      setModuleList(modules);
    });
  };

  const handleOpenUpdateModuleWindow = () => {
    setShowModuleTable(false);
    setShowUpdateModuleWindow(true);
  };

  const [processingDelete, setProcessingDelete] = useState(false);

  const handleDeleteModule = async (moduleId) => {
    try {
      setProcessingDelete(true);
      const response = await ModuleService.deleteModuleById(moduleId);
      if (response.status === 204) {
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
      const response = await ModuleService.saveModule(
        null,
        moduleData.moduleCode,
        moduleData.moduleName,
        moduleData.moduleEnrolmentKey,
        moduleData.semester,
        moduleData.departmentId,
        moduleData.studentBatch,
        moduleData.statingDate,
        moduleData.endingDate
      );
      if (response.status === 201) {
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

  const handleOpenModuleLectureList = async (module) => {
    const response = await LectureService.getAllLecturesByModuleIdAndUserId(module.id);
    setModuleLectureList(response);
    setShowLectureListForModule(true);
    setTitle('Lectures for ' + module.moduleName);
    setSearch('');
  };

  const handleEditLecture = (lecture) => {
    if (lecture) {
      setEditLecture(lecture);
      setShowEditLectureWindow(true);
    }
  };

  const handleShowDeleteWindow = (lecture) => {
    setSelectedLecture(lecture);
    setShowDeleteLecturePopup(true);
  };

  const handleDeleteLecture = async () => {
    try {
      setProcessingDeleteLecture(true);
      const response = await LectureService.deleteLecture(selectedLecture.lectureId);
      if (response.status === 200) {
        handleOpenModuleLectureList(selectedModule);
        setSelectedLecture(null);
        toast.success(`Successfully ${selectedLecture.lectureName} Lecture Deleted.`);
        setShowDeleteLecturePopup(false);
      }
    } finally {
      setProcessingDeleteLecture(false);
    }
  };

  const handleShowLectureListDeleteWindow = (lectureList) => {
    setSelectedLectureList(lectureList);
    setShowDeleteLectureListPopup(true);
  };

  const handleDeleteLectureList = async () => {
    try {
      setProcessingDeleteLecture(true);
      for (const lecture of selectedLectureList) {
        await LectureService.deleteLecture(lecture.id);
      }
      handleOpenModuleLectureList(selectedModule);
      setSelectedLectureList(null);
      toast.success(`Successfully Lectures Deleted.`);
      setShowDeleteLectureListPopup(false);
    } finally {
      setShowDeleteLectureListPopup(false);
    }
  };

  return (
    <div className="row">
      <div className="col">
        <div className="row my-3 justify-content-between align-items-center">
          <div
            className="col-auto fs-4 fw-bold ms-4 text-truncate"
            style={{ maxWidth: '400px' }}
            title={title}
          >
            {title}
          </div>
          <div className="col-auto">
            <div className="row align-items-center">
              {!showLectureListForModule ? (
                <div className="col-auto">
                  <NormalButton
                    handleClick={() => {
                      setShowModuleCreateWindow(true);
                    }}
                    title={'Create'}
                    icon={<MdCreateNewFolder className="buttonIcon" />}
                  />
                </div>
              ) : (
                <div className="col-auto me-1">
                  <NormalButton
                    handleClick={() => {
                      setShowLectureListForModule(false);
                      setSelectedLecture(null);
                      setSearch('');
                      setTitle('Modules');
                    }}
                    title={'Back'}
                    icon={<MdArrowBack className="buttonIcon" />}
                  />
                </div>
              )}

              <div className="col">
                <AppSearch setSearch={setSearch} />
              </div>
            </div>
          </div>
        </div>
        <AppContentCard>
          {!showLectureListForModule ? (
            <ModuleTable
              modulesList={moduleList}
              onModuleClick={handleModuleClick}
              searchModule={search}
              handleDeleteModule={(moduleId) => handleOpenDeletePopUpWindow()}
              handleOpenUpdateModuleWindow={() => {
                setShowUpdateModuleWindow(true);
              }}
              handleOpenModuleLectureList={(module) => handleOpenModuleLectureList(module)}
            />
          ) : (
            <LecturesTable
              lecturesList={moduleLectureList}
              search={search}
              onLectureClick={(lecture) => {
                setSelectedLecture(lecture);
              }}
              handleLectureUpdate={(lecture) => {
                handleEditLecture(lecture);
              }}
              handleLectureDelete={handleShowDeleteWindow}
              handleDeleteSelectedLectures={handleShowLectureListDeleteWindow}
            />
          )}
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
        {showEditLectureWindow && (
          <div className="Admin-Create-Event-Dashboard">
            <LecturesEdit
              selectedLecture={editLecture}
              handleCloseUpdateLectureWindow={() => {
                setShowEditLectureWindow(false);
                setEditLecture(null);
              }}
              reloadLecturesList={() => handleOpenModuleLectureList(selectedModule)}
            />
          </div>
        )}
        {showDeleteModuleWindow && selectedModule && (
          <div className="module-delete-window-container">
            <WarningPopup
              handleOk={() => handleDeleteModule(selectedModule.id)}
              handleCancel={() => {}}
              handleCloseWarningWindow={() => {
                setShowDeleteModuleWindow(false);
                handleReloadModuleList();
              }}
              titleText={
                'Deleting this module will delete all the lectures for this module. Are You Sure You Want To Delete This Module?'
              }
              buttonText={'Delete'}
              processing={processingDelete}
            />
          </div>
        )}
        {showDeleteLecturePopup && (
          <div className="delete-lecture-container">
            <WarningPopup
              handleCloseWarningWindow={() => setShowDeleteLecturePopup(false)}
              handleOk={handleDeleteLecture}
              titleText={'Are You Sure You Want To Delete This Lecture?'}
              buttonText={'Delete'}
              processing={processingDeleteLecture}
            />
          </div>
        )}
        {showDeleteLectureListPopup && (
          <div className="delete-lecture-container">
            <WarningPopup
              handleCloseWarningWindow={() => setShowDeleteLectureListPopup(false)}
              handleOk={handleDeleteLectureList}
              titleText={'Are You Sure You Want To Delete Selected Lectures?'}
              buttonText={'Delete'}
              processing={processingDeleteLecture}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default ModulePage;
