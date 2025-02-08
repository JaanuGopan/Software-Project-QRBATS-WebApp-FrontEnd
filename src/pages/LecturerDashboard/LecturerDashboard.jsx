import React, { useState, useEffect } from 'react';
import '../AdminDashboard/AdminDashboard.css';
import './LectureDashboard.css';
import NormalButton from '../../components/layout/AdminDashboardComponent/NormalButton';
import { MdCreateNewFolder } from 'react-icons/md';
import { RiDeleteBin5Fill } from 'react-icons/ri';
import EventLectureCreation from './EventLectureCreation';
import EventService from '../../api/services/EventService';
import { useSelector } from 'react-redux';
import { selectUser } from '../../redux/features/userSlice';
import AdminUpdateEvent from '../Event/AdminUpdateEvent';
import LocationService from '../../api/services/LocationService';
import LectureService from '../../api/services/LectureService';
import LecturesTable from '../Lectures/LecturesTable';
import LecturesEdit from '../Lectures/LecturesEdit';
import LectureCreationPage from '../LactureCreation/LectureCreationPage';
import { ToastContainer, toast } from 'react-toastify';
import WarningPopup from '../../components/warningPopup/WarningPopup';
import { Table, ToggleButton, ToggleButtonGroup } from '@mui/material';
import EventLectureTable from './EventLectureTable';
const LecturerDashboard = () => {
  const [showCreateLecturePopup, setShowCreateLecturePopup] = useState(false);
  const [showUpdateLecturePopup, setShowUpdateLecturePopup] = useState(false);
  const [showDeleteLecturePopup, setShowDeleteLecturePopup] = useState(false);
  const [showDeleteEventPopup, setShowDeleteEventPopup] = useState(false);
  const [eventLectureList, setEventLectureList] = useState([]);
  const [selectedLecture, setSelectedLecture] = useState(null);
  const [selectedEventLecture, setSelectedEventLecture] = useState(null);
  const [searchLecture, setSearchLecture] = useState('');
  const [selectTable, setSelectTable] = useState('Lectures');
  const [title, setTitle] = useState('Lecture');
  const [venuesList, setVenuesList] = useState([]);
  const user = useSelector(selectUser);
  const { userId } = user || {};

  const [lectureList, setLectureList] = useState([]);

  const handleReloadEventLectureList = async () => {
    EventService.getEventByUserID(userId)
      .then((list) => {
        setEventLectureList(list);
        console.log(eventLectureList);
      })
      .catch((error) => {
        console.log('Error in getting lecture list ', error);
      })
      .finally(() => {});
  };
  //=====================================================================================
  const [showEditLectureWindow, setShowEditLectureWindow] = useState(false);
  const [editLecture, setEditLecture] = useState(null);

  const handleReloadLectureList = async () => {
    const response = await LectureService.getAllLecturesByUserId(userId);
    if (response) {
      setLectureList(response);
      console.log('lecture list : ', response);
    }
  };

  const handleEditLecture = (lecture) => {
    if (lecture) {
      setEditLecture(lecture);
      setShowEditLectureWindow(true);
    }
  };

  const handleShowDeleteWindow = () => {
    if (selectedLecture === null) {
      toast.error('Please Select Lecture To Delete.');
      return;
    }
    setShowDeleteLecturePopup(true);
  };

  const [processingDeleteLecture, setProcessingDeleteLecture] = useState(false);

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

  //=====================================================================================

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

  const [processingDeleteEvent, setProcessingDeleteEvent] = useState(false);
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
    <div className="admin-Dash">
      <ToastContainer />
      <p className="mainHead">{'Lecturer Dashboard'}</p>

      <div className="lecturer-dashboard-toggle-buttons-search">
        <div className="SearchEvent">
          <div className="lecturer-dashboard-toggle">
            <label className="lecturer-dashboard-toggle-label">Select Table : </label>
            <div className="size-box"></div>
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
        <div className="lecture-dashboard-container">
          <div className="lecture-dashboard-table">
            <LecturesTable
              lecturesList={lectureList}
              search={searchLecture}
              onLectureClick={(e) => {
                setSelectedLecture(e);
              }}
              handleLectureUpdate={(lecture) => {
                handleEditLecture(lecture);
              }}
            />
          </div>

          <div className="List-Buttons">
            <NormalButton
              handleClick={() => setShowCreateLecturePopup(true)}
              title={'Create Lecture'}
              titlewithiconicon={<MdCreateNewFolder className="buttonIcon" />}
            />
            <NormalButton
              title={'Delete'}
              handleClick={handleShowDeleteWindow}
              titlewithiconicon={<RiDeleteBin5Fill className="buttonIcon" />}
            />
          </div>
        </div>
      ) : (
        <div className="lecture-dashboard-container">
          <div className="lecture-dashboard-table">
            <EventLectureTable
              search={searchLecture}
              handleUpdateLecture={() => setShowUpdateLecturePopup(true)}
              onLectureClick={handleEventLectureClick}
              lectureList={eventLectureList} // Pass the eventList prop here
            />
          </div>
          <div className="List-Buttons">
            <NormalButton
              handleClick={() => setShowCreateLecturePopup(true)}
              title={'Create Event'}
              titlewithiconicon={<MdCreateNewFolder className="buttonIcon" />}
            />
            <NormalButton
              title={'Delete'}
              handleClick={handleShowDeleteEventWindow}
              titlewithiconicon={<RiDeleteBin5Fill className="buttonIcon" />}
            />
          </div>
        </div>
      )}
      {showCreateLecturePopup && (
        <div className="Create-Lecture-Window">
          {selectTable === 'Events' && (
            <EventLectureCreation
              handleCloseCreateLectureWindow={() => setShowCreateLecturePopup(false)}
              reloadLectureList={handleReloadEventLectureList}
              hideCloseButton={false}
              locationNameList={venuesList}
            />
          )}
          {selectTable === 'Lectures' && (
            <LectureCreationPage
              handleCloseCreateLectureWindow={() => setShowCreateLecturePopup(false)}
              handleReloadLectureList={handleReloadLectureList}
              hideCloseButton={false}
            />
          )}
        </div>
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
  );
};

export default LecturerDashboard;
