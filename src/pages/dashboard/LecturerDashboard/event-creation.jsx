import { CircularProgress } from '@mui/material';
import QRCode from 'qrcode.react';
import React, { useRef, useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import { IoMdCloseCircleOutline } from 'react-icons/io';
import { useSelector } from 'react-redux';
import EventService from '../../../api/services/EventService';
import eventCreationImage from '../../../assets/Images/designer_pic/Designer_pic4.jpeg';
import '../../Event/EventCreation/EventCreation.css';

const EventCreation = ({
  handleCloseCreateLectureWindow,
  reloadLectureList,
  hideCloseButton,
  showImage = true,
}) => {
  const locationList = useSelector((state) => state.locationList);
  const [eventId, setEventId] = useState('');
  const [eventName, setEventName] = useState('');
  const [eventDate, setEventDate] = useState('');
  const [eventTime, setEventTime] = useState('');
  const [eventEndTime, setEventEndTime] = useState('');
  const [locationId, setLocationId] = useState();
  const [showQRCode, setShowQRCode] = useState(false);
  const [processingCreateEvent, setProcessingCreateEvent] = useState(false);
  const [eventLocationId, setEventLocationId] = useState();

  const qrCodeRef = useRef(null);

  const notifySuccess = () => toast.success('Successfully Lecture Created!');

  const clearEventDetails = () => {
    setEventName('');
    setEventDate('');
    setEventTime('');
    setEventEndTime('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setProcessingCreateEvent(true);
      const response = await EventService.saveEvent(
        eventName,
        eventDate,
        eventTime,
        eventEndTime,
        locationId
      );
      if (response) {
        setEventId(response.id);
        notifySuccess();
        reloadLectureList();
        setShowQRCode(true);
        clearEventDetails();
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
  // encode eventDetails to base64
  const encodedQRCode = btoa(JSON.stringify(eventDetails));

  const qrCodeDetails = encodedQRCode;
  const [qrCodeWindow, setQrCodeWindow] = useState(false);
  const today = new Date().toISOString().split('T')[0];

  const handleCloseQrCodeWindow = () => {
    setShowQRCode(false);
    clearEventDetails();
    handleCloseCreateLectureWindow();
  };

  return (
    <div className="event-main-container1">
      <Toaster />
      {!hideCloseButton && (
        <div className="event-create-title-close-button">
          <h3 className="event-create-title">Create Event</h3>
          <div className="event-create-close-button" onClick={handleCloseCreateLectureWindow}>
            <IoMdCloseCircleOutline id="close-icon" />
          </div>
        </div>
      )}
      {hideCloseButton && <h3 className="event-create-title-without-close">Create Event</h3>}
      <div className="eventCreation-field">
        {showImage && <img src={eventCreationImage} className="Create-logo" alt="Logo" />}
        <div className="eventCreation-input-field">
          <form onSubmit={handleSubmit}>
            <div className="input-with-icon">
              <label className="date-label" htmlFor="eventName">
                {`Event Name`}
              </label>
              <input
                required
                type="text"
                id="eventName"
                name="eventName"
                placeholder={`Event Name`}
                className="form-control mb-2"
                value={eventName}
                onChange={(e) => setEventName(e.target.value)}
              />
            </div>
            <div className="date-div">
              <div className="eventCreation-form">
                <div>
                  <label className="date-label" htmlFor="eventDate">
                    {`Event Starting Date`}
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
                  value={locationId}
                  onChange={(e) => setLocationId(e.target.value)}
                  className="form-control mb-2"
                >
                  <option value="">Select Venue</option>
                  {locationList.map((option, index) => (
                    <option key={index} value={option.locationId}>
                      {option.locationName}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="eventCreation-form">
              <div>
                <label className="form-label" htmlFor="eventDate">
                  {`Event Starting Time`}
                </label>
                <input
                  required
                  type="time"
                  value={eventTime}
                  onChange={(e) => setEventTime(e.target.value)}
                  placeholder={`Event Time`}
                  className="form-control mb-2"
                />
              </div>
              <div className="eventCreation-form">
                <div>
                  <label className="form-label" htmlFor="eventEndTime">
                    {`Event End Time`}
                  </label>
                  <input
                    required
                    type="time"
                    value={eventEndTime}
                    onChange={(e) => setEventEndTime(e.target.value)}
                    placeholder={`Event End Time`}
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
                Create Event
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
                <p className="text-center">Scan this QR code to join the event</p>
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
