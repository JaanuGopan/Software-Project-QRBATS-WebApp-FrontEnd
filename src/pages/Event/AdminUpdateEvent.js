import "../Event/EventCreation/EventCreation.css";
import React, { useState, useRef } from "react";
import axios from "axios";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import { IoMdCloseCircleOutline } from "react-icons/io";
import toast, { Toaster } from "react-hot-toast";
import { useSelector } from "react-redux";
import { selectUser } from "../../redux/features/userSlice";
import QRCode from "qrcode.react";

const AdminUpdateEvent = ({
  handlecloseCreateEventWindow,
  selectedEvent,
  reloadEventList,
  locationNameList,
}) => {
  const [eventId, setEventId] = useState(selectedEvent.eventId);
  const [eventName, setEventName] = useState(selectedEvent.eventName);
  const [moduleName, setModuleName] = useState(selectedEvent.moduleName);
  const [eventDate, setEventDate] = useState(selectedEvent.eventDate);
  const [eventValidDate, setEventValidDate] = useState(
    selectedEvent.eventValidDate
  );
  const [eventTime, setEventTime] = useState(selectedEvent.eventTime);
  const [eventEndTime, setEventEndTime] = useState(selectedEvent.eventEndTime);
  const [eventVenue, setEventVenue] = useState(selectedEvent.eventVenue);
  const [showQRCode, setShowQRCode] = useState(false);
  const [eventRole, setEventRole] = useState(selectedEvent.eventRole);
  const [eventAssignedUserId, setEventAssignedUserId] = useState(
    selectedEvent.eventAssignedUserId
  );

  const [showModuleNameInput, setShowModuleNameInput] = useState(true);
  const [title, setTitle] = useState("Event");

  const qrCodeRef = useRef(null);

  const notifySuccess = () => toast.success("Successfully Event Updated!");

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
          eventId: eventId,
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
      reloadEventList();
    } catch (error) {
      console.error("Event failed", error);
    } finally {
      setShowQRCode(true);
    }
  };

  const downloadQRCode = () => {
    const qrCodeURL = document
      .getElementById("qrCodeEl")
      .toDataURL("image/png")
      .replace("image/png", "image/octet-stream");
    let aEl = document.createElement("a");
    aEl.href = qrCodeURL;
    aEl.download = "QR_Code" + "_" + eventName + ".png";
    document.body.appendChild(aEl);
    aEl.click();
    document.body.removeChild(aEl);
  };

  const handleShareQRCode = () => {
    html2canvas(qrCodeRef.current).then((canvas) => {
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF();
      pdf.addImage(imgData, "PNG", 0, 0);
      pdf.save("qr_code.pdf");
    });
  };

  const eventDetails = {
    eventId: eventId,
    eventName: eventName,
    moduleName: moduleName,
    eventDate: eventDate,
    eventValidDate: eventValidDate,
    eventTime: eventTime,
    eventEndTime: eventEndTime,
    eventVenue: eventVenue,
    eventAssignedUserId: eventAssignedUserId,
  };
  const qrCodeDetails = JSON.stringify(eventDetails);

  return (
    <div className="event-main-container1">
      {
        <div className="event-create-title-close-button">
          <h3 className="event-create-title">Update Event</h3>
          <div
            className="event-create-close-button"
            onClick={handlecloseCreateEventWindow}
          >
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
                style={{ border: "5px solid white" }}
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
          <Toaster />
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
            <button type="submit" className="btn btn-warning w-100">
              Update
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AdminUpdateEvent;
