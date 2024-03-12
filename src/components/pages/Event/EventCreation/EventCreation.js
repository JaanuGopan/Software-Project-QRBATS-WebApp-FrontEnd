import "./EventCreation.css";
import eventCreationImage from "../../../../assets/Images/signin/Signin.jpeg";
import { FaUser, FaCalendarAlt, FaMapMarkerAlt, FaTimes } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

import React, { useState, useRef } from "react";
import { useLocation } from "react-router-dom";
import QRCode from "react-qr-code";
import axios from "axios";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";

function EventCreation() {
  const navigate = useNavigate();

  const [eventName, setEventName] = useState("");
  const [moduleName, setModuleName] = useState("");
  const [eventDate, setEventDate] = useState("");
  const [eventValidDate, setEventValidDate] = useState("");
  const [eventTime, setEventTime] = useState("");
  const [eventVenue, setEventVenue] = useState("");
  const [showQRCode, setShowQRCode] = useState(false);
  const [showModuleNameInput, setShowModuleNameInput] = useState(true);
  const [title, setTitle] = useState("Event");

  const qrCodeRef = useRef(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (
      eventDate === "" ||
      eventName === "" ||
      eventTime === "" ||
      eventVenue === ""
    ) {
      alert("Please fill all the fields");
      return;
    } else {
      try {
        const response = await axios.post(
          "http://localhost:8080/api/v1/auth/create",
          {
            eventName: eventName,
            eventDate: eventDate,
            eventValidDate: eventValidDate,
            eventTime: eventTime,
            eventVenue: eventVenue,
            eventRole: "LECTURE",
            eventAssignedStaffId: 1,
            eventModuleName: moduleName,
            eventAssignedUserId: 1,
          }
        );
        const responseEventName = response.data.eventName;
        console.log("Event is : " + responseEventName);
      } catch (error) {
        console.error("Event failed", error);
      } finally {
        setShowQRCode(true);
      }
    }
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
  const eventDetails = `${eventName}, ${moduleName}, ${eventDate}, ${eventTime}, ${eventVenue}`;

  return (
    <div className="event-main-div">
      <div className="event-main-container1">
        <h2>Create {title}</h2>
        <div className="eventCreation-field">
          <div className="image-container">
            <img src={eventCreationImage} className="logo" alt="Logo" />
          </div>
          <div className="eventCreation-input-field">
            <div className="button-group">
              <button
                className="eventCreation-switchbutton"
                onClick={() => setShowModuleNameInput(false)}
              >
                Event
              </button>
              <button
                className="eventCreation-switchbutton"
                onClick={() =>
                  setShowModuleNameInput(true) && setTitle("Lecture")
                }
              >
                Lecture
              </button>
            </div>
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <div className="input-with-icon">
                  <input
                    type="text"
                    id="eventName"
                    name="eventName"
                    placeholder={title + " Name"}
                    className="form-control mb-2"
                    value={eventName}
                    onChange={(e) => setEventName(e.target.value)}
                  />
                </div>
              </div>
              {showModuleNameInput && (
                <div className="form-group">
                  <div className="input-with-icon">
                    <input
                      type="text"
                      id="moduleName"
                      name="moduleName"
                      placeholder="Module Name"
                      className="form-control mb-2"
                      value={moduleName}
                      onChange={(e) => setModuleName(e.target.value)}
                    />
                  </div>
                </div>
              )}
              <div className="date-div">
                <div className="form-group">
                  <div>
                    <label className="date-label" htmlFor="eventDate">
                      {title} Starting Date
                    </label>
                    <input
                      type="date"
                      value={eventDate}
                      onChange={(e) => setEventDate(e.target.value)}
                      className="form-control mb-2"
                    />
                  </div>
                </div>
                <div className="form-group">
                  <div>
                    <label className="date-label" htmlFor="eventDate">
                      {title} Ending Date
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
              <div className="form-group">
                <div>
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
              <div className="form-group">
                <div>
                  <label className="form-label" htmlFor="eventDate">
                    {title} Starting Time
                  </label>
                  <input
                    type="time"
                    value={eventTime}
                    onChange={(e) => setEventTime(e.target.value)}
                    placeholder="Event Time"
                    className="form-control mb-2"
                  />
                </div>
              </div>

              <div className="form-group"></div>
              <button type="submit" className="btn btn-primary w-100">
                Create {title}
              </button>
            </form>
          </div>
        </div>
        {showQRCode && (
          <div ref={qrCodeRef} className="qr-code">
            <QRCode name="QRCode" value={eventDetails} className="mb-2" />
            <p>Scan this QR code to mark attendance.</p>
            <div className="mt-4">
              <button
                onClick={handleShareQRCode}
                className="btn btn-primary mr-2"
              >
                Share QR Code
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default EventCreation;
