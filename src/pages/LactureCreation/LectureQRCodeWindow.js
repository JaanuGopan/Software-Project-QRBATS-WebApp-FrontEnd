import React, { useState } from "react";
import { IoMdCloseCircleOutline } from "react-icons/io";
import QRCode from "qrcode.react";

const LectureQRCodeWindow = ({
  createdLectureDetails,
  moduleCode,
  handleCloseQrCodeWindow,
  module,
}) => {
  const [qrCodeWindow, setQrCodeWindow] = useState(false);
  const downloadQRCode = () => {
    const qrCodeURL = document
      .getElementById("qrCodeEl")
      .toDataURL("image/png")
      .replace("image/png", "image/octet-stream");
    let aEl = document.createElement("a");
    aEl.href = qrCodeURL;
    aEl.download = `${moduleCode}_QR_Code.png`;
    document.body.appendChild(aEl);
    aEl.click();
    document.body.removeChild(aEl);
  };

  const lectureDetails = {
    moduleCode: moduleCode,
  };
  const qrCodeDetails = JSON.stringify(lectureDetails);

  const dayNames = {
    Mon: "Monday",
    Tue: "Tuesday",
    Wed: "Wednesday",
    Thu: "Thursday",
    Fri: "Friday",
    Sat: "Saturday",
    Sun: "Sunday",
  };

  return (
    <div className="lecture-qrCode-window">
      <div className="lecture-qrCode-title-close-button">
        <h3 className="lecture-qrCode-title">Module QrCode</h3>
        <div
          className="lecture-qrCode-close-button"
          onClick={handleCloseQrCodeWindow}
        >
          <IoMdCloseCircleOutline id="close-icon" />
        </div>
      </div>
      <div className="lecture-qrCode-lecture-details-container">
        <div className="lecture-qrCode-container">
          <p>
            {module.moduleName}
            {" ("}
            {module.moduleCode}
            {")"}
          </p>
          <div className="lecture-qrCode">
            <QRCode
              name="QRCode"
              size={200}
              id="qrCodeEl"
              value={qrCodeDetails}
              className="mb-2"
            />
          </div>
          <div className="lecture-qrCode-button-container">
            <button
              className="btn btn-success lecture-qrCode-button"
              onClick={downloadQRCode}
            >
              Save
            </button>
          </div>
        </div>
        <div className="lecture-qrCode-lectures-details">
          <h5>Created Lectures Details</h5>
          {createdLectureDetails.map((lecture, index) => (
            <div className="lecture-qrCode-lectures-details-main-container">
              <div className="lecture-qrCode-lectures-details-content">
                <label className="lecture-qrCode-lectures-details-heder-label">
                  Lecture Name :
                </label>
                <label key={index}>{lecture.lectureName}</label>
              </div>
              <div className="lecture-qrCode-lectures-details-content">
                <label className="lecture-qrCode-lectures-details-heder-label">
                  Lecture Day :
                </label>
                <label key={index}>{dayNames[lecture.lectureDay]}</label>
              </div>
              <div className="lecture-qrCode-lectures-details-content">
                <label className="lecture-qrCode-lectures-details-heder-label">
                  Lecture Time :
                </label>
                <label key={index}>{lecture.lectureStartTime}</label>
              </div>
              <div className="lecture-qrCode-lectures-details-content">
                <label className="lecture-qrCode-lectures-details-heder-label">
                  Lecture End Time :
                </label>
                <label key={index}>{lecture.lectureEndTime}</label>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default LectureQRCodeWindow;
