import { CircularProgress } from '@mui/material';
import QRCode from 'qrcode.react';
import React, { useContext, useEffect, useRef, useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import { IoMdCloseCircleOutline } from 'react-icons/io';
import Select from 'react-select';
import EventService from '../../../api/services/EventService';
import LocationService from '../../../api/services/LocationService';
import ModuleService from '../../../api/services/ModuleService';
import eventCreationImage from '../../../assets/Images/designer_pic/Designer_pic4.jpeg';
import { AuthContext } from '../../../config/AuthProvider';
import '../../Event/EventCreation/EventCreation.css';

const EventCreation = ({
  handleCloseCreateLectureWindow,
  reloadLectureList,
  hideCloseButton,
  locationNameList,
  showImage = true,
}) => {
  const { user } = useContext(AuthContext);
  const { userId, departmentId } = user || {};
  const [eventId, setEventId] = useState('');
  const [eventName, setEventName] = useState('');
  const [moduleName, setModuleName] = useState('');
  const [eventDate, setEventDate] = useState('');
  const [eventTime, setEventTime] = useState('');
  const [eventEndTime, setEventEndTime] = useState('');
  const [eventVenue, setEventVenue] = useState('');
  const [showQRCode, setShowQRCode] = useState(false);
  const [eventRole, setEventRole] = useState('EVENT');
  const [eventAssignedUserId, setEventAssignedUserId] = useState(userId);
  const [title, setTitle] = useState('Event');
  const [moduleNameList, setModuleNameList] = useState([]);

  const [venueList, setVenuesList] = useState([
    'NCC',
    'LT1',
    'LT2',
    'Auditorium',
    'DEIE',
    'DMME',
    'DCEE',
  ]);

  const handleGetModulesList = async () => {
    const response = await ModuleService.getAllModulesByDepartmentId(departmentId);
    if (response) {
      const moduleList = response.map((module) => ({
        value: module.moduleId,
        label: module.moduleCode,
      }));
      setModuleNameList(moduleList);
    }
  };

  const handleGetLocationNameList = async () => {
    try {
      const response = await LocationService.getAllLocationNames();
      setVenuesList(response);
    } catch (error) {
      console.error('Error fetching location names:', error);
    }
  };

  const qrCodeRef = useRef(null);

  const notifySuccess = () => toast.success('Successfully Lecture Created!');

  const clearEventDetails = () => {
    setEventName('');
    setEventDate('');
    setEventTime('');
    setEventEndTime('');
    setEventVenue('');
    setEventAssignedUserId(null);
    setEventRole('LECTURE');
    setModuleName(null);
  };

  const [processingCreateEvent, setProcessingCreateEvent] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setProcessingCreateEvent(true);
      const response = await EventService.saveEvent(
        eventName,
        eventDate,
        eventTime,
        eventEndTime,
        eventVenue,
        eventRole,
        eventRole === 'LECTURE' ? moduleName.label : '',
        userId
      );
      if (response.status === 200) {
        setEventId(response.eventId);
        notifySuccess();
        reloadLectureList();
        setShowQRCode(true);
        clearEventDetails();
      } else if (response.status === 400) {
        toast.error(response.data);
      } else {
        toast.error('Error In Event Creation. ');
      }
    } catch (error) {
      console.error('Lecture creation failed', error);
      toast.error('Error In Event Creation. ');
    } finally {
      setProcessingCreateEvent(false);
    }
  };

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

  const eventDetails = {
    eventId: eventId,
  };

  const qrCodeDetails = JSON.stringify(eventDetails);

  const [qrCodeWindow, setQrCodeWindow] = useState(false);

  const [selectedButton, setSelectedButton] = useState(2);

  const handleSelectedButton = (button) => {
    setSelectedButton(button);
    if (button === 2) {
      setEventRole('EVENT');
      setModuleName(null);
      setTitle('Event');
    } else {
      setEventRole('LECTURE');
      setTitle('Lecture');
    }
  };

  const today = new Date().toISOString().split('T')[0];

  const handleCloseQrCodeWindow = () => {
    setShowQRCode(false);
    clearEventDetails();
    handleCloseCreateLectureWindow();
  };

  useEffect(() => {
    handleGetModulesList();
    handleGetLocationNameList();
  }, []);

  return (
    <div className="event-main-container1">
      <Toaster />
      {!hideCloseButton && (
        <div className="event-create-title-close-button">
          <h3 className="event-create-title">Create {` ${title}`}</h3>
          <div className="event-create-close-button" onClick={handleCloseCreateLectureWindow}>
            <IoMdCloseCircleOutline id="close-icon" />
          </div>
        </div>
      )}
      {hideCloseButton && (
        <h3 className="event-create-title-without-close">Create {` ${title}`}</h3>
      )}
      <div className="eventCreation-field">
        {showImage && <img src={eventCreationImage} className="Create-logo" alt="Logo" />}
        <div className="eventCreation-input-field">
          {/* <DualButtonComponent
            onSelect={handleSelectedButton}
            buttonText1={"Lecture"}
            buttonText2={"Event"}
          /> */}
          <form onSubmit={handleSubmit}>
            <div className="input-with-icon">
              <label className="date-label" htmlFor="moduleCode">
                {`${title} Name`}
              </label>
              <input
                required
                type="text"
                id="eventName"
                name="eventName"
                placeholder={`${title} Name`}
                className="form-control mb-2"
                value={eventName}
                onChange={(e) => setEventName(e.target.value)}
              />
            </div>

            {selectedButton === 1 && (
              <div className="input-with-icon">
                <label className="date-label" htmlFor="moduleCode">
                  {`Module Code`}
                </label>
                <Select
                  required
                  id="moduleName"
                  name="moduleName"
                  options={moduleNameList}
                  onChange={(e) => setModuleName(e)}
                  value={moduleName}
                  placeholder={'Select Module Code'}
                />
              </div>
            )}
            <div className="date-div">
              <div className="eventCreation-form">
                <div>
                  <label className="date-label" htmlFor="eventDate">
                    {`${title} Starting Date`}
                  </label>
                  <input
                    required
                    type="date"
                    min={today}
                    value={eventDate}
                    onChange={(e) => {
                      setEventDate(e.target.value);
                    }}
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
                  {venueList.map((option, index) => (
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
                  {`${title} Starting Time`}
                </label>
                <input
                  required
                  type="time"
                  value={eventTime}
                  onChange={(e) => setEventTime(e.target.value)}
                  placeholder={`${title} Time`}
                  className="form-control mb-2"
                />
              </div>
              <div className="eventCreation-form">
                <div>
                  <label className="form-label" htmlFor="eventEndTime">
                    {`${title} End Time`}
                  </label>
                  <input
                    required
                    type="time"
                    value={eventEndTime}
                    onChange={(e) => setEventEndTime(e.target.value)}
                    placeholder={`${title} End Time`}
                    className="form-control mb-2"
                  />
                </div>
              </div>
            </div>

            <div className="eventCreation-form"></div>
            {processingCreateEvent ? (
              <div className="w-100 d-flex flex-row align-items-center justify-content-center">
                <CircularProgress />
              </div>
            ) : (
              <button
                onClick={() => setQrCodeWindow(true)}
                type="submit"
                className="btn btn-success w-100 mt-2"
              >
                Create {` ${title}`}
              </button>
            )}
          </form>
        </div>
        {qrCodeWindow && showQRCode && (
          <div className="Admin-Create-Event-Dashboard">
            <div ref={qrCodeRef} className="event-main-container1">
              <div className="event-create-title-close-button">
                <h3 className="event-create-title">Successfully Event Created</h3>
                <div className="event-create-close-button" onClick={handleCloseQrCodeWindow}>
                  <IoMdCloseCircleOutline id="close-icon" />
                </div>
              </div>

              <div className="row-center">
                <QRCode
                  name="QRCode"
                  size={200}
                  id="qrCodeEl"
                  value={qrCodeDetails}
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

export default EventCreation;
