import { ToggleButton, ToggleButtonGroup } from '@mui/material';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import EventService from '../../../api/services/EventService';
import LectureService from '../../../api/services/LectureService';
import AppContentCard from '../../../components/app-content-card/app-content-card';
import AppSearch from '../../../components/app-search/app-search';
import EventTable from '../../../components/tables/event-table';
import LecturesTable from '../../../components/tables/lectures-table';
import WarningPopup from '../../../components/warningPopup/WarningPopup';
import LecturesEdit from '../../Lectures/LecturesEdit';
import './LectureDashboard.css';

const LecturerDashboard = () => {
  const [showUpdateLecturePopup, setShowUpdateLecturePopup] = useState(false);
  const [showDeleteLecturePopup, setShowDeleteLecturePopup] = useState(false);
  const [showDeleteLectureListPopup, setShowDeleteLectureListPopup] = useState(false);
  const [showDeleteEventPopup, setShowDeleteEventPopup] = useState(false);
  const [eventLectureList, setEventLectureList] = useState([]);
  const [selectedLecture, setSelectedLecture] = useState(null);
  const [selectedLectureList, setSelectedLectureList] = useState(null);
  const [selectedEventLecture, setSelectedEventLecture] = useState(null);
  const [searchLecture, setSearchLecture] = useState('');
  const [selectTable, setSelectTable] = useState('Lectures');
  const [showEditLectureWindow, setShowEditLectureWindow] = useState(false);
  const [editLecture, setEditLecture] = useState(null);
  const [processingDeleteLecture, setProcessingDeleteLecture] = useState(false);
  const [lectureList, setLectureList] = useState([]);
  const [processingDeleteEvent, setProcessingDeleteEvent] = useState(false);

  const handleReloadEventLectureList = async () => {
    EventService.getEventByUserID()
      .then((list) => {
        setEventLectureList(list);
      })
      .catch((error) => {
        console.error('Error in getting lecture list ', error);
      })
      .finally(() => {});
  };

  const handleReloadLectureList = async () => {
    const response = await LectureService.getAllLecturesByUserId();
    if (response) {
      setLectureList(response);
    }
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

  const handleShowLectureListDeleteWindow = (lectureList) => {
    setSelectedLectureList(lectureList);
    setShowDeleteLectureListPopup(true);
  };

  const handleDeleteLecture = async () => {
    try {
      setProcessingDeleteLecture(true);
      const response = await LectureService.deleteLecture(selectedLecture.id);
      handleReloadLectureList();
      setSelectedLecture(null);
      toast.success(`Successfully ${selectedLecture.lectureDate} Lecture Deleted.`);
      setShowDeleteLecturePopup(false);
    } finally {
      setProcessingDeleteLecture(false);
    }
  };

  const handleDeleteLectureList = async () => {
    try {
      setProcessingDeleteLecture(true);
      for (const lecture of selectedLectureList) {
        await LectureService.deleteLecture(lecture.id);
      }
      handleReloadLectureList();
      setSelectedLectureList(null);
      toast.success(`Successfully Lectures Deleted.`);
      setShowDeleteLectureListPopup(false);
    } finally {
      setShowDeleteLectureListPopup(false);
    }
  };

  useEffect(() => {
    handleReloadEventLectureList();
    handleReloadLectureList();
  }, []);

  const handleShowDeleteEventWindow = (event) => {
    setSelectedEventLecture(event);
    setShowDeleteEventPopup(true);
  };

  const handleDeleteEventLecture = async () => {
    if (selectedEventLecture) {
      try {
        setProcessingDeleteEvent(true);
        const response = await EventService.deleteEvent(selectedEventLecture.id);
        handleReloadEventLectureList();
        setSelectedEventLecture(null);
        toast.success(`Successfully ${selectedEventLecture.name} Event Deleted.`);
        setShowDeleteEventPopup(false);
      } finally {
        setProcessingDeleteEvent(false);
      }
    }
  };

  const handleEventLectureClick = (lecture) => {
    setSelectedEventLecture(lecture);
  };

  const handleChange = (e) => {
    setSelectTable(e);
  };

  return (
    <div className="row lecturer-dashboard-container">
      <div className="col">
        <div className="row align-items-center mx-1">
          <div className="col">
            <div className="row">
              <div className="col-auto">
                <p className="ms-5 mt-2 fw-bold fs-4">{'Lecturer Dashboard'}</p>
              </div>
            </div>
          </div>
          <div className="col-auto d-flex align-items-center pe-0">Select Table :</div>
          <div className="col-auto">
            <ToggleButtonGroup
              color="primary"
              value={selectTable}
              exclusive
              onChange={(e) => handleChange(e.target.value)}
              aria-label="Platform"
            >
              <ToggleButton value="Lectures">Lectures</ToggleButton>
              <ToggleButton value="Events">Events</ToggleButton>
            </ToggleButtonGroup>
          </div>
          <div className="col-auto">
            <AppSearch setSearch={setSearchLecture} />
          </div>
        </div>
        {selectTable === 'Lectures' ? (
          <AppContentCard>
            <LecturesTable
              lecturesList={lectureList}
              search={searchLecture}
              onLectureClick={(e) => {
                setSelectedLecture(e);
              }}
              handleLectureUpdate={(lecture) => {
                handleEditLecture(lecture);
              }}
              handleLectureDelete={handleShowDeleteWindow}
              handleDeleteSelectedLectures={handleShowLectureListDeleteWindow}
            />
          </AppContentCard>
        ) : (
          <AppContentCard hasBottomContents={true}>
            <EventTable
              search={searchLecture}
              handleUpdateEvent={() => setShowUpdateLecturePopup(true)}
              onEventClick={handleEventLectureClick}
              eventList={eventLectureList}
              handleEventDelete={handleShowDeleteEventWindow}
            />
          </AppContentCard>
        )}
        {showUpdateLecturePopup && (
          <div className="Admin-Create-Event-Dashboard">
            <LecturesEdit
              handleCloseUpdateLectureWindow={() => setShowUpdateLecturePopup(false)}
              selectedLecture={selectedEventLecture}
              reloadLecturesList={handleReloadEventLectureList}
            />
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
              handleReload={handleReloadLectureList}
              reloadLecturesList={handleReloadLectureList}
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
        {showDeleteEventPopup && (
          <div className="delete-lecture-container">
            <WarningPopup
              handleCloseWarningWindow={() => setShowDeleteEventPopup(false)}
              handleOk={handleDeleteEventLecture}
              titleText={'Are You Sure You Want To Delete This Event?'}
              buttonText={'Delete'}
              processing={processingDeleteEvent}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default LecturerDashboard;
