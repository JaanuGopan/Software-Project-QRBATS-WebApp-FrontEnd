import React, { useState, useEffect, useRef } from "react";
import EventService from "../../api/services/EventService";
import InputField from "../../components/textfields/InputBox/InputField";
import InputList from "../../components/textfields/InputList/InputList";
import QRCode from "qrcode.react";
import UserDetails from "../../utils/UserDetails";
import { IoMdCloseCircleOutline } from "react-icons/io";
import toast, { Toaster } from "react-hot-toast";
import "../Event/EventCreation/EventCreation.css";
import eventCreationImage from "../../assets/Images/signin/Signin.jpeg";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";

import { useSelector } from "react-redux";
import { selectUser } from "../../redux/features/userSlice";

import DualButtonComponent from "../../components/buttons/DualButtonComponent";

const LectureCreation = ({
  handleCloseCreateLectureWindow,
  reloadLectureList,
}) => {
  //const [userId, setUserId] = useState(null);

  const user = useSelector(selectUser);
  const { userId } = user || {};

  useEffect(() => {
    //setUserId(UserDetails.getUserId());
  });

  const [eventId, setEventId] = useState("");
  const [eventName, setEventName] = useState("");
  const [moduleName, setModuleName] = useState(null);
  const [eventDate, setEventDate] = useState("");
  const [eventValidDate, setEventValidDate] = useState("");
  const [eventTime, setEventTime] = useState("");
  const [eventEndTime, setEventEndTime] = useState("");
  const [eventVenue, setEventVenue] = useState("");
  const [showQRCode, setShowQRCode] = useState(false);
  const [eventRole, setEventRole] = useState("LECTURE");
  const [eventAssignedUserId, setEventAssignedUserId] = useState(userId);

  const [showModuleNameInput, setShowModuleNameInput] = useState(true);
  const [title, setTitle] = useState("Lecture");

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
  const qrCodeRef = useRef(null);

  const notifySuccess = () => toast.success("Successfully Lecture Created!");

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
    setEventRole("LECTURE");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
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
      setEventId(response.data.eventId);
      const responseEventName = response.data.eventName;
      notifySuccess();
      reloadLectureList();
    } catch (error) {
      console.error("Lecture creation failed", error);
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
    aEl.download = "QR_Code.png";
    document.body.appendChild(aEl);
    aEl.click();
    document.body.removeChild(aEl);
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
    eventAssignedUserId: userId,
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

  const [selectedButton, setSelectedButton] = useState(1);

  const handleSelectedButton = (button) => {
    setSelectedButton(button);
    if (button === 2) {
      setEventRole("EVENT");
      setModuleName(null);
      setTitle("Event");
    } else {
      setEventRole("LECTURE");
      setTitle("Lecture");
    }
  };

  return (
    <div className="event-main-container1">
      <Toaster />
      <div
        className="closeCreateEventWindow"
        onClick={handleCloseCreateLectureWindow}
      >
        <IoMdCloseCircleOutline />
      </div>
      <h2>Create {` ${title}`}</h2>
      <div className="eventCreation-field">
        <img src={eventCreationImage} className="Create-logo" alt="Logo" />
        <div className="eventCreation-input-field">
          <DualButtonComponent
            onSelect={handleSelectedButton}
            buttonText1={"Lecture"}
            buttonText2={"Event"}
          />
          <form onSubmit={handleSubmit}>
            <div className="input-with-icon">
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
            {selectedButton == 1 && (
              <div className="input-with-icon">
                <input
                  required
                  type="text"
                  id="moduleName"
                  name="moduleName"
                  placeholder={"Module Name"}
                  className="form-control mb-2"
                  value={moduleName}
                  onChange={(e) => setEventName(e.target.value)}
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
                    value={eventDate}
                    onChange={(e) => setEventDate(e.target.value)}
                    className="form-control mb-2"
                  />
                </div>
              </div>
              <div className="eventCreation-form">
                <div>
                  <label className="date-label" htmlFor="eventDate">
                    {`${title} Ending Date`}
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
            <button
              onClick={() => setQrCodeWindow(true)}
              type="submit"
              className="btn btn-success w-100"
            >
              Create {` ${title}`}
            </button>
          </form>
        </div>
        {qrCodeWindow && showQRCode && (
          <div className="Admin-Create-Event-Dashboard">
            <div ref={qrCodeRef} className="event-main-container1">
              <div
                className="closeCreateEventWindow"
                onClick={handleCloseCreateLectureWindow}
              >
                <IoMdCloseCircleOutline />
              </div>
              <h2>Successfully Event Created</h2>
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

export default LectureCreation;