import React, { useState, useEffect, useContext } from 'react';
import './AdminDashboard.css';
import Table from '../../components/layout/AdminDashboardComponent/Table';
import NormalButton from '../../components/layout/AdminDashboardComponent/NormalButton';
import { MdCreateNewFolder } from 'react-icons/md';
import { RiDeleteBin5Fill } from 'react-icons/ri';
import AdminUpdateEvent from '../Event/AdminUpdateEvent';
import AdminEventCreation from '../Event/AdminEventCreation';
import LocationService from '../../api/services/LocationService';
import EventService from '../../api/services/EventService';
import { toast, ToastContainer } from 'react-toastify';
import WarningPopup from '../../components/warningPopup/WarningPopup';
import { AuthContext } from '../../config/AuthProvider';

const AdminDashboard = () => {
  const [eventCreatePopUpWindow, setEventCreatePopUpWindow] = useState(false);
  const [eventUpdatePopUpWindow, setEventUpdatePopUpWindow] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [eventList, setEventList] = useState([]);
  const [search, setSearch] = useState('');
  const [venuesList, setVenuesList] = useState([]);

  const { user } = useContext(AuthContext);
  const { userId } = user || {};

  const handleGetLocationNameList = async () => {
    const response = await LocationService.getAllLocationNames();
    setVenuesList(response);
  };

  useEffect(() => {
    // Fetch the list of events from the API using the new class
    handleReloadEventList();
    handleGetLocationNameList();
  }, []);

  // Function to handle event click
  const handleEventClick = (event) => {
    setSelectedEvent(event);
    // Do whatever you want with the selected event data
    console.log('Selected Event:', event);
  };

  const [showDeleteEventPopup, setShowDeleteEventPopup] = useState(false);

  const showDeleteEventWarning = () => {
    if (selectedEvent === null) {
      toast.error('Please Select Event To Delete.');
      return;
    }
    setShowDeleteEventPopup(true);
  };

  const [processingDeleteEvent, setProcessingDeleteEvent] = useState(false);

  const handleDelete = async () => {
    try {
      setProcessingDeleteEvent(true);
      const response = await EventService.deleteEvent(selectedEvent.eventId);
      if (response.status === 200) {
        handleReloadEventList();
        setSelectedEvent(null);
        toast.success(`Successfully ${selectedEvent.eventName} Event Deleted.`);
      } else if (response.status === 400) {
        toast.error(response.data);
      } else {
        toast.error(`Error In Deleting Event ${selectedEvent.eventName}.`);
      }
    } catch (error) {
      console.log('error ' + error);
    } finally {
      setProcessingDeleteEvent(false);
      setShowDeleteEventPopup(false);
    }
  };

  const handleReloadEventList = async () => {
    EventService.getEventByUserID(userId)
      .then((events) => {
        setEventList(events);
      })
      .catch((error) => {
        console.error('Error fetching events:', error);
      });
  };

  return (
    <div className="admin-Dash">
      <ToastContainer />
      <p className="mainHead">Admin Dashboard</p>
      <div className="mainInform"></div>
      <div className="SearchEvent">
        <p className="mainHead">Upcoming Events</p>
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
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>
      <div className="AdminEventList">
        <Table
          search={search}
          handleUpdateEvent={() => setEventUpdatePopUpWindow(true)}
          onEventClick={handleEventClick}
          eventList={eventList} // Pass the eventList prop here
        />

        <div className="List-Buttons">
          <NormalButton
            handleClick={() => setEventCreatePopUpWindow(true)}
            title={'Create'}
            titlewithiconicon={<MdCreateNewFolder className="buttonIcon" />}
            id={'Admincreate'}
          />
          <NormalButton
            title={'Delete'}
            handleClick={showDeleteEventWarning}
            titlewithiconicon={<RiDeleteBin5Fill className="buttonIcon" />}
          />
        </div>
      </div>
      {eventCreatePopUpWindow && (
        <div className="Admin-Create-Event-Dashboard">
          <AdminEventCreation
            handleCloseCreateEventWindow={() => setEventCreatePopUpWindow(false)}
            reloadEventList={handleReloadEventList}
            locationList={venuesList}
            showCloseButton={true}
          />
        </div>
      )}
      {eventUpdatePopUpWindow && (
        <div className="Admin-Create-Event-Dashboard">
          <AdminUpdateEvent
            handleCloseEventUpdateWindow={() => setEventUpdatePopUpWindow(false)}
            selectedEvent={selectedEvent}
            reloadEventList={handleReloadEventList}
            locationNameList={venuesList}
          />
        </div>
      )}

      {showDeleteEventPopup && (
        <div className="delete-event-container">
          <WarningPopup
            handleCloseWarningWindow={() => setShowDeleteEventPopup(false)}
            handleOk={handleDelete}
            titleText={'Are You Sure You Want To Delete This Event?'}
            buttonText={'Delete'}
            processing={processingDeleteEvent}
          />
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;
