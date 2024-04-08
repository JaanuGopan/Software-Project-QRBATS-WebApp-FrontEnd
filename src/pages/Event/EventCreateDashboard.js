import "./EventCreation/EventCreation.css";
import eventCreationImage from "../../assets/Images/signin/Signin.jpeg";
import React, { useState, useRef } from "react";
import axios from "axios";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import { IoMdCloseCircleOutline } from "react-icons/io";
import toast, { Toaster } from "react-hot-toast";
import { useSelector } from "react-redux";
import { selectUser } from "../../redux/features/userSlice";
import QRCode from "qrcode.react";

const EventCreateDashboard = () => {
  // Get the user from Redux state
  const user = useSelector(selectUser);
  const { userId } = user || {};

  const [eventId, setEventId] = useState("");
  const [eventName, setEventName] = useState("");
  const [moduleName, setModuleName] = useState(null);
  const [eventDate, setEventDate] = useState("");
  const [eventValidDate, setEventValidDate] = useState("");
  const [eventTime, setEventTime] = useState("");
  const [eventEndTime, setEventEndTime] = useState("");
  const [eventVenue, setEventVenue] = useState("");
  const [showQRCode, setShowQRCode] = useState(false);
  const [eventRole, setEventRole] = useState("EVENT");
  const [eventAssignedUserId, setEventAssignedUserId] = useState(null);

  const [showModuleNameInput, setShowModuleNameInput] = useState(true);
  const [title, setTitle] = useState("Event");

  const venueList = [
    "NCC",
    "LT1",
    "LT2",
    "Auditorium",
    "DEIE",
    "DMME",
    "DCEE",
    "Other",
  ];

  const notifySuccess = () => toast.success("Successfully Event Created!");

  const handleInputValidation = () => {
    if (
      !eventName ||
      !eventDate ||
      !eventValidDate ||
      !eventTime ||
      !eventEndTime ||
      !eventVenue
    ) {
      return false;
    }
    return true;
  };

  const clearEventDetails = () => {
    setEventName("");
    setEventDate("");
    setEventValidDate("");
    setEventTime("");
    setEventEndTime("");
    setEventVenue("");
    setEventAssignedUserId(null);
    setEventRole("EVENT");
  };

  const handleCreateEvent = async (e) => {
    try {
      const response = await axios.post(
        "http://localhost:8080/api/v1/event/create",
        {
          eventName: eventName,
          eventDate: eventDate,
          eventValidDate: eventValidDate,
          eventTime: eventTime,
          eventEndTime: eventEndTime,
          eventVenue: eventVenue,
          eventRole: eventRole,
          eventModuleName: moduleName,
          eventAssignedUserId: userId,
        }
      );
      setEventId(response.data.eventId);
      const responseEventName = response.data.eventName;
      notifySuccess();
    } catch (error) {
      console.error("Event failed", error);
    } finally {
      setShowQRCode(true);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (handleInputValidation()) {
      await handleCreateEvent(e);
    } else {
      console.log("Please fill all the fields");
    }
  };

  const qrCodeRef = useRef(null);
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
              <div className="eventCreation-form">
                <div>
                  <label className="date-label" htmlFor="eventDate">
                    Event Ending Date
                  </label>
                  <input
                    required
                    type="date"
                    value={eventValidDate}
                    onChange={(e) => setEventValidDate(e.target.value)}
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
                    <option key={index} value={option}>
                      {option}
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
            <div className="d-flex justify-content-between mr-3 mt-3">
              <button
                onClick={() => setQrCodeWindow(true)}
                type="submit"
                className="btn btn-primary w-90"
              >
                Create Event
              </button>
              <button
                onClick={clearEventDetails}
                className="btn btn-danger w-30"
              >
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

export default EventCreateDashboard;
