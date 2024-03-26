import "../Event/EventCreation/EventCreation.css";
import eventCreationImage from "../../../assets/Images/signin/Signin.jpeg";
import React, { useState, useRef } from "react";
import QRCode from "react-qr-code";
import axios from "axios";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import { IoMdCloseCircleOutline } from "react-icons/io";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";
import { selectUser } from "../../../redux/features/userSlice";

const AdminEventCreation = ({ handlecloseCreateEventWindow }) => {
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

  const qrCodeRef = useRef(null);

  const notifySuccess = () => toast.success("Successfully Event Created!");

  const handleEreseValu = () => {
    setEventName("");
    setModuleName(null);
    setEventDate("");
    setEventValidDate("");
    setEventTime("");
    setEventVenue("");
    setEventEndTime("");
    setEventAssignedUserId(null);
    setEventRole("EVENT");
  };

  const user = useSelector(selectUser);
  // Destructure user object for cleaner code
  const { userId } = user || {};

  const handleSubmit = async (e) => {
    e.preventDefault();
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
      const responseEventName = response.data.eventName;
      console.log("Event is : " + responseEventName);
      notifySuccess();
    } catch (error) {
      console.error("Event failed", error);
    } finally {
      setShowQRCode(true);
    }
  };

  const handleDownloadQRCode = () => {
    const canvas = qrCodeRef.current.querySelector("canvas");
    const url = canvas
      .toDataURL("image/png")
      .replace("image/png", "image/octet-stream");
    const link = document.createElement("a");
    link.download = "qr_code.png";
    link.href = url;
    link.click();
  };

  const handleShareQRCode = () => {
    html2canvas(qrCodeRef.current).then((canvas) => {
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF();
      pdf.addImage(imgData, "PNG", 0, 0);
      pdf.save("qr_code.pdf");
    });
  };

  // Concatenate all event details into a single string
  const eventDetails = `${eventName}, ${moduleName}, ${eventDate}, ${eventValidDate}, ${eventTime}, ${eventVenue}, ${eventAssignedUserId}`;
  const [qrCodeWindow, setQrCodeWindow] = useState(false);

  return (
    <div className="event-main-container1">
      <div
        className="closeCreateEventWindow"
        onClick={handlecloseCreateEventWindow}
      >
        <IoMdCloseCircleOutline />
      </div>
      <h2>Create Event</h2>
      <div className="eventCreation-field">
        <img src={eventCreationImage} className="Create-logo" alt="Logo" />
        <div className="eventCreation-input-field">
          <form onSubmit={handleSubmit}>
            <div className="input-with-icon">
              <input
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
                  value={eventVenue}
                  onChange={(e) => setEventVenue(e.target.value)}
                  className="form-control mb-2"
                >
                  <option value="">Select Venue</option>
                  <option value="LT1">LT1</option>
                  <option value="LT2">LT2</option>
                  <option value="Auditorium">Auditorium</option>
                  <option value="NCC">NCC</option>
                  <option value="Other">Other</option>
                </select>
              </div>
            </div>
            <div className="eventCreation-form">
              <div>
                <label className="form-label" htmlFor="eventDate">
                  Event Starting Time
                </label>
                <input
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
              className="btn btn-primary w-100"
            >
              Create Event
            </button>
          </form>
        </div>
        {qrCodeWindow && (
          <div className="Admin-Create-Event-Dashboard">
            {showQRCode && (
              <div ref={qrCodeRef} className="event-main-container1">
                <div
                  className="closeCreateEventWindow"
                  onClick={handlecloseCreateEventWindow}
                >
                  <IoMdCloseCircleOutline />
                </div>
                <h2>Successfully Event Created</h2>
                <div className="row-center">
                  <QRCode name="QRCode" value={eventDetails} className="mb-2" />
                </div>
                <div>
                  <p className="text-center">
                    Scan this QR code to join {title}
                  </p>
                </div>
                <div className="row-center">
                  <div className="QRbutton">
                    <button
                      onClick={handleShareQRCode}
                      className="btn btn-success mr-3"
                    >
                      Save
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminEventCreation;
