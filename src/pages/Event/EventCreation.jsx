import './EventCreation/EventCreation.css';
import eventCreationImage from '../../assets/Images/signin/Signin.jpeg';
import React, { useState, useRef, useContext } from 'react';
import { IoMdCloseCircleOutline } from 'react-icons/io';
import toast, { Toaster } from 'react-hot-toast';
import QRCode from 'qrcode.react';
import InputList from '../../components/textfields/InputList/InputList';
import InputField from '../../components/textfields/InputBox/InputField';
import EventService from '../../api/services/EventService';
import { CircularProgress } from '@mui/material';
import { AuthContext } from '../../config/AuthProvider';

const EventCreationComponent = () => {
  const { user } = useContext(AuthContext);
  const { userId } = user || {};

  const [eventId, setEventId] = useState('');
  const [eventName, setEventName] = useState('');
  const [moduleName, setModuleName] = useState(null);
  const [eventDate, setEventDate] = useState('');
  const [eventValidDate, setEventValidDate] = useState('');
  const [eventTime, setEventTime] = useState('');
  const [eventEndTime, setEventEndTime] = useState('');
  const [eventVenue, setEventVenue] = useState('');
  const [showQRCode, setShowQRCode] = useState(false);
  const [eventRole, setEventRole] = useState('EVENT');
  const [eventAssignedUserId, setEventAssignedUserId] = useState(null);

  const [showModuleNameInput, setShowModuleNameInput] = useState(true);
  const [title, setTitle] = useState('Event');

  const venueList = ['NCC', 'LT1', 'LT2', 'Auditorium', 'DEIE', 'DMME', 'DCEE', 'Other'];

  const notifySuccess = () => toast.success('Successfully Event Created!');

  const handleInputValidation = () => {
    if (!eventName || !eventDate || !eventValidDate || !eventTime || !eventEndTime || !eventVenue) {
      return false;
    }
    return true;
  };

  const clearEventDetails = () => {
    setEventName('');
    setEventDate('');
    setEventValidDate('');
    setEventTime('');
    setEventEndTime('');
    setEventVenue('');
    setEventAssignedUserId(null);
    setEventRole('EVENT');
  };

  const [processing, setProcessing] = useState(false);

  const handleCreateEvent = async (e) => {
    try {
      setProcessing(true);
      const response = await EventService.saveEvent(
        eventName,
        eventDate,
        eventValidDate,
        eventTime,
        eventEndTime,
        eventVenue,
        eventRole,
        moduleName,
        userId
      );
      setEventId(response.eventId);
      const responseEventName = response.eventName;
      if (response) {
        setShowQRCode(true);
      }
      notifySuccess();
    } catch (error) {
      console.error('Event failed', error);
    } finally {
      setProcessing(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (handleInputValidation()) {
      await handleCreateEvent(e);
    } else {
      console.log('Please fill all the fields');
    }
  };

  const qrCodeRef = useRef(null);
  const downloadQRCode = () => {
    const qrCodeURL = document
      .getElementById('qrCodeEl')
      .toDataURL('image/png')
      .replace('image/png', 'image/octet-stream');
    let aEl = document.createElement('a');
    aEl.href = qrCodeURL;
    aEl.download = 'QR_Code.png';
    document.body.appendChild(aEl);
    aEl.click();
    document.body.removeChild(aEl);
  };

  const [qrCodeWindow, setQrCodeWindow] = useState(false);

  const eventDetails = {
    eventId: eventId,
    eventName: eventName,
    moduleName: moduleName,
    eventDate: eventDate,
    eventValidDate: eventValidDate,
    eventTime: eventTime,
    eventEndTime: eventEndTime,
    eventVenue: eventVenue,
    eventAssignedUserId: userId,
  };
  const qrCodeDetails = JSON.stringify(eventDetails);

  return (
    <div className="event-main-container2">
      <Toaster />
      <h2>Create Event</h2>
      <div className="eventCreation-field">
        <img src={eventCreationImage} className="Create-logo" alt="Logo" />
        <div className="eventCreation-input-field">
          <form onSubmit={handleSubmit}>
            <div className="input-with-icon">
              <InputField
                value={eventName}
                placeholder={'Event Name'}
                onChange={(e) => setEventName(e.target.value)}
                inputType={'text'}
              />
            </div>
            <div className="date-div">
              <div className="eventCreation-form">
                <label className="date-label" htmlFor="eventDate">
                  Event Starting Date
                </label>
                <InputField
                  value={eventDate}
                  onChange={(e) => setEventDate(e.target.value)}
                  inputType={'date'}
                />
              </div>
              <div className="eventCreation-form">
                <label className="date-label" htmlFor="eventDate">
                  Event Ending Date
                </label>
                <InputField
                  value={eventValidDate}
                  onChange={(e) => setEventValidDate(e.target.value)}
                  placeholder={'Event Valid Date'}
                  inputType={'date'}
                />
              </div>
            </div>
            <div className="eventCreation-form">
              <label className="date-label" htmlFor="eventDate">
                Venue
              </label>
              <InputList
                list={venueList}
                onChange={(e) => setEventVenue(e.target.value)}
                placeholder={'Venue'}
                value={eventVenue}
                initialValue={'Select Venue'}
              />
            </div>
            <div className="eventCreation-form">
              <label className="form-label" htmlFor="eventDate">
                Event Starting Time
              </label>
              <InputField
                inputType={'time'}
                value={eventTime}
                onChange={(e) => setEventTime(e.target.value)}
                placeholder={'Event Time'}
              />

              <div className="eventCreation-form">
                <label className="form-label" htmlFor="enevtEndTime">
                  Event Ending Time
                </label>
                <InputField
                  inputType={'time'}
                  value={eventEndTime}
                  onChange={(e) => setEventEndTime(e.target.value)}
                  placeholder={'Event End Time'}
                />
              </div>
            </div>

            <div className="eventCreation-form"></div>
            <div className="d-flex justify-content-between mr-3 mt-3">
              {processing ? (
                <CircularProgress />
              ) : (
                <button
                  onClick={() => setQrCodeWindow(true)}
                  type="submit"
                  className="btn btn-primary w-90"
                >
                  Create Event
                </button>
              )}
              <button onClick={clearEventDetails} className="btn btn-danger w-30">
                Clear
              </button>
            </div>
          </form>
        </div>
        {qrCodeWindow && showQRCode && (
          <div className="Admin-Create-Event-Dashboard">
            <div className="event-main-container1">
              <div
                className="closeCreateEventWindow"
                onClick={() => {
                  setQrCodeWindow(false);
                  clearEventDetails();
                }}
              >
                <IoMdCloseCircleOutline />
              </div>
              <h2>Successfully Event Created</h2>
              <div className="row-center">
                <QRCode
                  size={200}
                  id="qrCodeEl"
                  name="QRCode"
                  value={qrCodeDetails}
                  ref={qrCodeRef}
                  className="mb-2"
                />
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
          </div>
        )}
      </div>
    </div>
  );
};

export default EventCreationComponent;
