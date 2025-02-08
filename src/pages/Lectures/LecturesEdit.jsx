import "../Event/EventCreation/EventCreation.css";
import "./Lectures.css";
import React, { useState, useRef } from "react";
import axios from "axios";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import { IoMdCloseCircleOutline } from "react-icons/io";
import toast, { Toaster } from "react-hot-toast";
import { useSelector } from "react-redux";
import { selectUser } from "../../redux/features/userSlice";
import QRCode from "qrcode.react";
import LectureService from "../../api/services/LectureService";
import { CircularProgress } from "@mui/material";

const LecturesEdit = ({
  handleCloseUpdateLectureWindow,
  selectedLecture,
  reloadLecturesList,
  locationNameList,
}) => {
  const [lectureId, setLectureId] = useState(selectedLecture.lectureId);
  const [lectureName, setLectureName] = useState(selectedLecture.lectureName);
  const [lectureModuleCode, setLectureModuleCode] = useState(
    selectedLecture.lectureModuleCode
  );
  const [lectureDay, setLectureDay] = useState(selectedLecture.lectureDay);
  const [lectureStartTime, setLectureStartTime] = useState(
    selectedLecture.lectureStartTime
  );
  const [lectureEndTime, setLectureEndTime] = useState(
    selectedLecture.lectureEndTime
  );
  const [lectureVenue, setLectureVenue] = useState(
    selectedLecture.lectureVenue
  );
  const [showQRCode, setShowQRCode] = useState(false);
  const [lectureAssignedUserId, setLectureAssignedUserId] = useState(
    selectedLecture.lectureAssignedUserId
  );

  const lectureDayList = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

  const [title, setTitle] = useState("Lecture");

  const qrCodeRef = useRef(null);

  const notifySuccess = () => toast.success("Successfully Lecture Updated!");
  const notifyFailToUpdate = (errorMsg) => toast.error(`${errorMsg}`);

  const user = useSelector(selectUser);
  const { userId } = user || {};

  const [processingUpdateLecture, setProcessingUpdateLecture] = useState(false);

  const handleSaveLecture = async (e) => {
    e.preventDefault();

    try {
      setProcessingUpdateLecture(true);
      const response = await LectureService.updateLecture(
        lectureId,
        lectureName,
        lectureModuleCode,
        lectureVenue,
        lectureDay,
        lectureStartTime,
        lectureEndTime
      );
      if (response.status === 200) {
        console.log(response);
        reloadLecturesList();
        notifySuccess();
      } else {
        notifyFailToUpdate(response);
      }
    } finally {
      setProcessingUpdateLecture(false);
    }
  };

  const downloadQRCode = () => {
    const qrCodeURL = document
      .getElementById("qrCodeEl")
      .toDataURL("image/png")
      .replace("image/png", "image/octet-stream");
    let aEl = document.createElement("a");
    aEl.href = qrCodeURL;
    aEl.download = "QR_Code" + "_" + lectureName + ".png";
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

  const lectureDetails = {
    moduleCode: lectureModuleCode,
  };
  const qrCodeDetails = JSON.stringify(lectureDetails);

  return (
    <div className="event-main-container1">
      <Toaster />
      <div className="lecture-update-title-close-button">
        <h3 className="lecture-update-title">Update Lecture</h3>
        <div
          className="lecture-update-close-button"
          onClick={handleCloseUpdateLectureWindow}
        >
          <IoMdCloseCircleOutline id="close-icon" />
        </div>
      </div>
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
          <form onSubmit={handleSaveLecture}>
            <div className="input-with-icon">
              <label className="date-label" htmlFor="lectureName">
                Lecture Name
              </label>
              <input
                required
                type="text"
                id="lectureName"
                name="lectureName"
                placeholder={"Lecture Name"}
                className="form-control mb-2"
                value={lectureName}
                onChange={(e) => setLectureName(e.target.value)}
              />
            </div>
            <div className="date-div">
              <div className="eventCreation-form">
                <div>
                  <label className="date-label" htmlFor="eventDate">
                    Lecture Day
                  </label>
                  <select
                    required
                    value={lectureDay}
                    onChange={(e) => {
                      setLectureDay(e.target.value);
                      setLectureName(
                        `${lectureModuleCode}_${e.target.value}_${lectureStartTime}_Lecture`
                      );
                    }}
                    className="form-control mb-2"
                  >
                    <option value="">Select Day</option>
                    {lectureDayList.map((option, index) => (
                      <option key={index} value={option}>
                        {option}
                      </option>
                    ))}
                  </select>
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
                  value={lectureVenue}
                  onChange={(e) => setLectureVenue(e.target.value)}
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
                  Lecture Starting Time
                </label>
                <input
                  required
                  type="time"
                  value={lectureStartTime}
                  onChange={(e) => {
                    setLectureStartTime(`${e.target.value}:00`);
                    setLectureName(
                      `${lectureModuleCode}_${lectureDay}_${e.target.value}:00_Lecture`
                    );
                  }}
                  placeholder="Event Time"
                  className="form-control mb-2"
                />
              </div>
              <div className="eventCreation-form">
                <div>
                  <label className="form-label" htmlFor="eventEndTime">
                    Lecture Ending Time
                  </label>
                  <input
                    required
                    type="time"
                    value={lectureEndTime}
                    onChange={(e) => setLectureEndTime(`${e.target.value}:00`)}
                    placeholder="Event End Time"
                    className="form-control mb-2"
                  />
                </div>
              </div>
            </div>
            <div className="eventCreation-form"></div>
            {processingUpdateLecture ? (
              <CircularProgress />
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

export default LecturesEdit;
