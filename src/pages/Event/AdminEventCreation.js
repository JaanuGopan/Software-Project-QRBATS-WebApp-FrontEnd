import "./EventCreation/EventCreation.css";
import eventCreationImage from "../../assets/Images/signin/Signin.jpeg";
import React, { useState, useRef } from "react";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import { IoMdCloseCircleOutline } from "react-icons/io";
import toast, { Toaster } from "react-hot-toast";
import { useSelector } from "react-redux";
import { selectUser } from "../../redux/features/userSlice";
import QRCode from "qrcode.react";
import { useEffect } from "react";
import EventService from "../../api/services/EventService";

const AdminEventCreation = ({
  handleCloseCreateEventWindow,
  reloadEventList,
  locationList,
  showCloseButton,
}) => {
  const [eventId, setEventId] = useState("");
  const [eventName, setEventName] = useState("");
  const [moduleName, setModuleName] = useState(null);
  const [eventDate, setEventDate] = useState("");
  const [eventTime, setEventTime] = useState("");
  const [eventEndTime, setEventEndTime] = useState("");
  const [eventVenue, setEventVenue] = useState("");
  const [showQRCode, setShowQRCode] = useState(false);
  const [eventRole, setEventRole] = useState("EVENT");
  const [eventAssignedUserId, setEventAssignedUserId] = useState(null);

  const [showModuleNameInput, setShowModuleNameInput] = useState(true);
  const [title, setTitle] = useState("Event");

  const qrCodeRef = useRef(null);

  const notifySuccess = () => toast.success("Successfully Event Created!");

  const clearEventDetails = () => {
    setEventName("");
    setEventDate("");
    setEventTime("");
    setEventEndTime("");
    setEventVenue("");
    setEventAssignedUserId(null);
    setEventRole("EVENT");
  };

  const user = useSelector(selectUser);
  // Destructure user object for cleaner code
  const { userId } = user || {};

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await EventService.saveEvent(
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
        setEventId(response.data.eventId);
        notifySuccess();
        reloadEventList();
        setShowQRCode(true);
      } else if (response.status === 400) {
        toast.error(response.data);
      } else {
        toast.error("Error In Event Creation. ");
      }
      clearEventDetails();
    } catch (error) {
      console.error("Event failed", error);
      toast.error("Error In Event Creation. ");
    }
  };

  const downloadQRCode = () => {
    const qrCodeURL = document
      .getElementById("qrCodeEl")
      .toDataURL("image/png")
      .replace("image/png", "image/octet-stream");
    let aEl = document.createElement("a");
    aEl.href = qrCodeURL;
    aEl.download = "QR_Code.png";
    document.body.appendChild(aEl);
    aEl.click();
    document.body.removeChild(aEl);
  };
  const eventDetails = {
    eventId: eventId,
  };
  const qrCodeDetails = JSON.stringify(eventDetails);

  const handleShareQRCode = () => {
    html2canvas(qrCodeRef.current).then((canvas) => {
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF();
      pdf.addImage(imgData, "PNG", 0, 0);
      pdf.save("qr_code.pdf");
    });
  };

  const [qrCodeWindow, setQrCodeWindow] = useState(false);
  const today = new Date().toISOString().split("T")[0];

  return (
    <div className="event-main-container1">
      <Toaster />
      {showCloseButton && (
        <div className="event-create-title-close-button">
          <h3 className="event-create-title">Create Event</h3>
          <div
            className="event-create-close-button"
            onClick={handleCloseCreateEventWindow}
          >
            <IoMdCloseCircleOutline id="close-icon" />
          </div>
        </div>
      )}
      <div className="eventCreation-field">
        <img src={eventCreationImage} className="Create-logo" alt="Logo" />
        <div className="eventCreation-input-field">
          <form onSubmit={handleSubmit}>
            <div className="input-with-icon">
              <label className="date-label">Event Name</label>
              <input
                required
                type="text"
                id="eventName"
                name="eventName"
                placeholder={"Event Name"}
                className="form-control mb-2"
                value={eventName}
                onChange={(e) => setEventName(e.target.value)}
              />
            </div>
            <div className="date-div">
              <div className="eventCreation-form">
                <div>
                  <label className="date-label" htmlFor="eventDate">
                    Event Date
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
                  {locationList.map((option, index) => (
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
            <button
              onClick={() => setQrCodeWindow(true)}
              type="submit"
              className="btn btn-success mt-2 w-100"
            >
              Create Event
            </button>
          </form>
        </div>
        {qrCodeWindow && showQRCode && (
          <div className="Admin-Create-Event-Dashboard">
            <div ref={qrCodeRef} className="event-main-container1">
              <div className="event-create-title-close-button">
                <h3 className="event-create-title">
                  Successfully Event Created
                </h3>
                <div
                  className="event-create-close-button"
                  onClick={() => setQrCodeWindow(false)}
                >
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
                  <button
                    onClick={downloadQRCode}
                    className="btn btn-success mr-3"
                  >
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

export default AdminEventCreation;
