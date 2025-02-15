import React, { useContext, useEffect, useState } from 'react';
import { FaPlus } from 'react-icons/fa';
import { toast } from 'react-toastify';
import EventService from '../../../api/services/EventService';
import LocationService from '../../../api/services/LocationService';
import AppContentCard from '../../../components/app-content-card/app-content-card';
import NormalButton from '../../../components/buttons/NormalButton';
import EventTable from '../../../components/tables/event-table';
import WarningPopup from '../../../components/warningPopup/WarningPopup';
import { AuthContext } from '../../../config/AuthProvider';
import AdminEventCreation from '../../Event/AdminEventCreation';
import AdminUpdateEvent from '../../Event/AdminUpdateEvent';
import './AdminDashboard.css';

const AdminDashboard = () => {
  const [eventUpdatePopUpWindow, setEventUpdatePopUpWindow] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [eventList, setEventList] = useState([]);
  const [search, setSearch] = useState('');
  const [venuesList, setVenuesList] = useState([]);
  const [showDeleteEventPopup, setShowDeleteEventPopup] = useState(false);
  const [processingDeleteEvent, setProcessingDeleteEvent] = useState(false);
  const [showEventCreationModal, setShowEventCreationModal] = useState(false);

  const { user } = useContext(AuthContext);
  const { userId } = user || {};

  const handleGetLocationNameList = async () => {
    const response = await LocationService.getAllLocationNames();
    setVenuesList(response);
  };

  useEffect(() => {
    handleReloadEventList();
    handleGetLocationNameList();
  }, []);

  const handleEventClick = (event) => {
    setSelectedEvent(event);
  };

  const showDeleteEventWarning = () => {
    setShowDeleteEventPopup(true);
  };

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
      console.error('error ' + error);
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
    <div className="row">
      <div className="col py-2">
        <div className="row my-1 align-items-center justify-content-between">
          <div className="col-auto ms-4 fs-3 fw-bold ">Upcoming Events</div>
          <div className="col-auto">
            <div className="row align-items-center">
              <div className="col-auto">
                <NormalButton
                  title={'Create Event'}
                  handleClick={() => setShowEventCreationModal(true)}
                  icon={<FaPlus className="buttonIcon" />}
                />
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
                  onChange={(e) => setSearch(e.target.value)}
                />
              </div>
            </div>
          </div>
        </div>
        <AppContentCard>
          <EventTable
            search={search}
            handleUpdateEvent={() => setEventUpdatePopUpWindow(true)}
            onEventClick={handleEventClick}
            eventList={eventList}
            handleEventDelete={showDeleteEventWarning}
          />
        </AppContentCard>
        {showEventCreationModal && (
          <div className="Admin-Create-Event-Dashboard">
            <AdminEventCreation
              handleCloseCreateEventWindow={() => setShowEventCreationModal(false)}
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
    </div>
  );
};

export default AdminDashboard;
