import React, { useState, useRef } from "react";
import { useLocation } from "react-router-dom";
import QRCode from "react-qr-code";
import axios from "axios";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
// src/components/pages/UserProfile.js
function UserProfile() {
  const location = useLocation();
  const { userEmail } = location.state;

  const [eventName, setEventName] = useState("");
  const [eventDate, setEventDate] = useState("");
  const [eventTime, setEventTime] = useState("");
  const [eventVenue, setEventVenue] = useState("");
  const [showQRCode, setShowQRCode] = useState(false);

  const qrCodeRef = useRef(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "http://localhost:8080/api/v1/auth/create",
        {
          eventName: eventName,
          eventDate: eventDate,
          eventTime: eventTime,
          eventVenue: eventVenue,
          eventRole: "LECTURE",
          eventAssignedStaffId: 1,
        }
      );
      const responseEventName = response.data.eventName;
      console.log("Event is : " + responseEventName);
    } catch (error) {
      console.error("Event failed", error);
    } finally {
      setShowQRCode(true);
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

  // Concatenate all event details into a single string
  const eventDetails = `${eventName}, ${eventDate}, ${eventTime}, ${eventVenue}`;

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card">
            <div className="card-body">
              <h5 className="card-title text-center mb-4">User Profile</h5>
              <p className="text-center">Welcome, {userEmail}!</p>
              <form onSubmit={handleSubmit}>
                <div className="row justify-content-center mt-4 p-4 bg-light rounded">
                  <input
                    type="text"
                    value={eventName}
                    onChange={(e) => setEventName(e.target.value)}
                    placeholder="Event Name"
                    className="form-control mb-3"
                  />
                  <input
                    type="date"
                    value={eventDate}
                    onChange={(e) => setEventDate(e.target.value)}
                    placeholder="Event Date"
                    className="form-control mb-3"
                  />
                  <input
                    type="time"
                    value={eventTime}
                    onChange={(e) => setEventTime(e.target.value)}
                    placeholder="Event Time"
                    className="form-control mb-3"
                  />
                  <select
                    value={eventVenue}
                    onChange={(e) => setEventVenue(e.target.value)}
                    className="form-control mb-3"
                  >
                    <option value="">Select Venue</option>
                    <option value="LT1">LT1</option>
                    <option value="LT2">LT2</option>
                    <option value="Auditorium">Auditorium</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
                <button type="submit" className="btn btn-primary w-100 mt-4">
                  Create QRCode
                </button>
              </form>
            </div>
            {showQRCode && (
              <div
                ref={qrCodeRef}
                className="card-footer text-center mt-4 mb-4 p-4 bg-light rounded"
              >
                <QRCode name="QRCode" value={eventDetails} />
                <p>Scan this QR code to access your profile</p>
                <div className="mt-4">
                  <button
                    onClick={handleShareQRCode}
                    className="btn btn-primary mr-2"
                  >
                    Share QR Code
                  </button>
                  <button
                    onClick={handleDownloadQRCode}
                    className="btn btn-success"
                  >
                    Download QR Image
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default UserProfile;
