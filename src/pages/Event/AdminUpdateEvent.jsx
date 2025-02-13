import '../Event/EventCreation/EventCreation.css';
import React, { useState, useRef, useContext } from 'react';
import { IoMdCloseCircleOutline } from 'react-icons/io';
import { toast } from 'react-toastify';
import QRCode from 'qrcode.react';
import EventService from '../../api/services/EventService';
import { CircularProgress } from '@mui/material';
import { AuthContext } from '../../config/AuthProvider';

const AdminUpdateEvent = ({
  handleCloseEventUpdateWindow,
  selectedEvent,
  reloadEventList,
  locationNameList,
}) => {
  const [eventId, setEventId] = useState(selectedEvent.eventId);
  const [eventName, setEventName] = useState(selectedEvent.eventName);
  const [moduleName, setModuleName] = useState(selectedEvent.moduleName);
  const [eventDate, setEventDate] = useState(selectedEvent.eventDate);
  const [eventTime, setEventTime] = useState(selectedEvent.eventTime);
  const [eventEndTime, setEventEndTime] = useState(selectedEvent.eventEndTime);
  const [eventVenue, setEventVenue] = useState(selectedEvent.eventVenue);
  const [eventRole, setEventRole] = useState(selectedEvent.eventRole);

  const [title, setTitle] = useState('Event');

  const qrCodeRef = useRef(null);

  const notifySuccess = () => toast.success('Successfully Event Updated!');

  const { user } = useContext(AuthContext);
  const { userId } = user || {};
  const [processingUpdateEvent, setProcessingUpdateEvent] = useState(false);
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setProcessingUpdateEvent(true);
      const response = await EventService.updateEvent(
        eventId,
        eventName,
        eventDate,
        eventTime,
        eventEndTime,
        eventVenue,
        eventRole,
        moduleName,
        userId
      );
      if (response.status === 200) {
        notifySuccess();
        reloadEventList();
        //handleCloseEventUpdateWindow();
      } else if (response.status === 400) {
        toast.error(response.data);
      } else {
        toast.error('Error In Event Update. ');
        console.log(response.data);
      }
    } catch (error) {
      console.error('Event failed', error);
      toast.error('Error In Event Update. ');
    } finally {
      setProcessingUpdateEvent(false);
    }
  };

  const downloadQRCode = () => {
    const qrCodeURL = document
      .getElementById('qrCodeEl')
      .toDataURL('image/png')
      .replace('image/png', 'image/octet-stream');
    let aEl = document.createElement('a');
    aEl.href = qrCodeURL;
    aEl.download = 'QR_Code' + '_' + eventName + '.png';
    document.body.appendChild(aEl);
    aEl.click();
    document.body.removeChild(aEl);
  };

  const eventDetails = {
    eventId: eventId,
  };
  const qrCodeDetails = JSON.stringify(eventDetails);

  return (
    <div className="event-main-container1">
      {
        <div className="event-create-title-close-button">
          <h3 className="event-create-title">Update Event</h3>
          <div className="event-create-close-button" onClick={handleCloseEventUpdateWindow}>
            <IoMdCloseCircleOutline id="close-icon" />
          </div>
        </div>
      }
      <div className="eventCreation-field">
        <div ref={qrCodeRef}>
          <div className="row-center">
            <div typeof="img">
              <QRCode
                id="qrCodeEl"
                name="QRCode"
                size={200}
                value={qrCodeDetails}
                className="QRCode-img"
                style={{ border: '5px solid white' }}
              />
            </div>
          </div>
          <div>
            <p className="text-center">Scan this QR code to join {title}</p>
          </div>

          <div className="row-center">
            <div className="QRbutton">
              <button onClick={downloadQRCode} className="btn btn-success mr-3">
                Save
              </button>
            </div>
          </div>
        </div>
        <div className="eventCreation-input-field">
          <form onSubmit={handleSubmit}>
            <div className="input-with-icon">
              <label className="date-label" htmlFor="eventDate">
                Event Name
              </label>
              <input
                required
                type="text"
                id="eventName"
                name="eventName"
                placeholder={'Event Name'}
                className="form-control mb-2"
                value={eventName}
                onChange={(e) => setEventName(e.target.value)}
              />
            </div>
            <div className="date-div">
              <div className="eventCreation-form">
                <div>
                  <label className="date-label" htmlFor="eventDate">
                    Event Starting Date
                  </label>
                  <input
                    required
                    type="date"
                    value={eventDate}
                    onChange={(e) => setEventDate(e.target.value)}
                    className="form-control mb-2"
                  />
                </div>
              </div>
            </div>
            <div className="eventCreation-form">
              <div>
                <label className="date-label" htmlFor="eventDate">
                  Venue
                </label>
                <select
                  required
                  value={eventVenue}
                  onChange={(e) => setEventVenue(e.target.value)}
                  className="form-control mb-2"
                >
                  <option value="">Select Venue</option>
                  {locationNameList.map((option, index) => (
                    <option key={index} value={option.locationName}>
                      {option.locationName}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <div className="eventCreation-form">
              <div>
                <label className="form-label" htmlFor="eventDate">
                  Event Starting Time
                </label>
                <input
                  required
                  type="time"
                  value={eventTime}
                  onChange={(e) => setEventTime(e.target.value)}
                  placeholder="Event Time"
                  className="form-control mb-2"
                />
              </div>
              <div className="eventCreation-form">
                <div>
                  <label className="form-label" htmlFor="enevtEndTime">
                    Event Ending Time
                  </label>
                  <input
                    required
                    type="time"
                    value={eventEndTime}
                    onChange={(e) => setEventEndTime(e.target.value)}
                    placeholder="Event End Time"
                    className="form-control mb-2"
                  />
                </div>
              </div>
            </div>
            <div className="eventCreation-form"></div>
            {processingUpdateEvent ? (
              <div className="d-flex justify-content-center align-items-center">
                <CircularProgress />
              </div>
            ) : (
              <button type="submit" className="btn btn-warning w-100">
                Update
              </button>
            )}
          </form>
        </div>
      </div>
    </div>
  );
};

export default AdminUpdateEvent;
