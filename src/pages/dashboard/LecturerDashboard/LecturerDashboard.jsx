import { ToggleButton, ToggleButtonGroup } from '@mui/material';
import React, { useContext, useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import EventService from '../../../api/services/EventService';
import LectureService from '../../../api/services/LectureService';
import LocationService from '../../../api/services/LocationService';
import AppContentCard from '../../../components/app-content-card/app-content-card';
import EventTable from '../../../components/tables/event-table';
import LecturesTable from '../../../components/tables/lectures-table';
import WarningPopup from '../../../components/warningPopup/WarningPopup';
import { AuthContext } from '../../../config/AuthProvider';
import AdminUpdateEvent from '../../Event/AdminUpdateEvent';
import LecturesEdit from '../../Lectures/LecturesEdit';
import './LectureDashboard.css';

const LecturerDashboard = () => {
  const [showUpdateLecturePopup, setShowUpdateLecturePopup] = useState(false);
  const [showDeleteLecturePopup, setShowDeleteLecturePopup] = useState(false);
  const [showDeleteEventPopup, setShowDeleteEventPopup] = useState(false);
  const [eventLectureList, setEventLectureList] = useState([]);
  const [selectedLecture, setSelectedLecture] = useState(null);
  const [selectedEventLecture, setSelectedEventLecture] = useState(null);
  const [searchLecture, setSearchLecture] = useState('');
  const [selectTable, setSelectTable] = useState('Lectures');
  const [venuesList, setVenuesList] = useState([]);
  const [showEditLectureWindow, setShowEditLectureWindow] = useState(false);
  const [editLecture, setEditLecture] = useState(null);
  const [processingDeleteLecture, setProcessingDeleteLecture] = useState(false);
  const [lectureList, setLectureList] = useState([]);
  const [processingDeleteEvent, setProcessingDeleteEvent] = useState(false);

  const { user } = useContext(AuthContext);
  const { userId } = user || {};

  const handleReloadEventLectureList = async () => {
    EventService.getEventByUserID(userId)
      .then((list) => {
        setEventLectureList(list);
      })
      .catch((error) => {
        console.error('Error in getting lecture list ', error);
      })
      .finally(() => {});
  };

  const handleReloadLectureList = async () => {
    const response = await LectureService.getAllLecturesByUserId(userId);
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

  const handleDeleteLecture = async () => {
    try {
      setProcessingDeleteLecture(true);
      const response = await LectureService.deleteLecture(selectedLecture.lectureId);
      if (response.status === 200) {
        handleReloadLectureList();
        setSelectedLecture(null);
        toast.success(`Successfully ${selectedLecture.lectureName} Lecture Deleted.`);
        setShowDeleteLecturePopup(false);
      } else if (response.status === 400) {
        toast.error(response.data);
      } else {
        toast.error(`Error In Deleting Lecture ${selectedLecture.lectureName}.`);
      }
    } finally {
      setProcessingDeleteLecture(false);
    }
  };

  const handleGetLocationNameList = async () => {
    const response = await LocationService.getAllLocationNames();
    setVenuesList(response);
  };

  useEffect(() => {
    handleReloadEventLectureList();
    handleGetLocationNameList();
    handleReloadLectureList();
  }, []);

  const handleShowDeleteEventWindow = () => {
    if (selectedEventLecture === null) {
      toast.error('Please Select Event To Delete.');
      return;
    }
    setShowDeleteEventPopup(true);
  };

  const handleDeleteEventLecture = async () => {
    if (selectedEventLecture) {
      try {
        setProcessingDeleteEvent(true);
        const response = await EventService.deleteEvent(selectedEventLecture.eventId);
        if (response.status === 200) {
          handleReloadEventLectureList();
          setSelectedEventLecture(null);
          toast.success(`Successfully ${selectedEventLecture.eventName} Event Deleted.`);
          setShowDeleteEventPopup(false);
        } else if (response.status === 400) {
          toast.error(response.data);
        } else {
          toast.error(`Error In Deleting Lecture ${selectedEventLecture.eventName}.`);
        }
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
    <div className="row h-100">
      <div className="col">
        <div>
          <p className="ms-5 mt-2 fw-bold fs-4">{'Lecturer Dashboard'}</p>
        </div>
        <div className="row mx-1">
          <div className="col">
            <div className="row">
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
            </div>
          </div>
          <div className="col-auto">
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
              onChange={(e) => setSearchLecture(e.target.value)}
            />
          </div>
        </div>
        {selectTable === 'Lectures' ? (
          <AppContentCard hasBottomContents={true}>
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
            <AdminUpdateEvent
              handleCloseEventUpdateWindow={() => setShowUpdateLecturePopup(false)}
              selectedEvent={selectedEventLecture}
              reloadEventList={handleReloadEventLectureList}
              locationNameList={venuesList}
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
              locationNameList={venuesList}
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
