import { CircularProgress } from '@mui/material';
import QRCode from 'qrcode.react';
import React, { useRef, useState } from 'react';
import { IoMdCloseCircleOutline } from 'react-icons/io';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import LectureService from '../../api/services/LectureService';
import './LectureEdit.css';

const LecturesEdit = ({ handleCloseUpdateLectureWindow, selectedLecture, reloadLecturesList }) => {
  const locationList = useSelector((state) => state.locationList);

  const [title, setTitle] = useState(
    selectedLecture.lectureType === 'LECTURE' ? 'Lecture' : 'Event'
  );
  const [lectureId, setLectureId] = useState(selectedLecture.id);
  const [lectureName, setLectureName] = useState(selectedLecture.name);
  const [lectureModuleCode, setLectureModuleCode] = useState(selectedLecture.moduleCode);
  const [moduleId, setModuleId] = useState(selectedLecture.moduleId);
  const [lectureDate, setLectureDate] = useState(selectedLecture.lectureDate);
  const [lectureStartTime, setLectureStartTime] = useState(selectedLecture.lectureStartTime);
  const [lectureEndTime, setLectureEndTime] = useState(selectedLecture.lectureEndTime);
  const [locationId, setLocationId] = useState(
    locationList.find((loc) => loc.locationName === selectedLecture.locationName).locationId
  );

  const qrCodeRef = useRef(null);

  const [processingUpdateLecture, setProcessingUpdateLecture] = useState(false);

  const handleSaveLecture = async (e) => {
    e.preventDefault();

    try {
      setProcessingUpdateLecture(true);
      const response = await LectureService.updateLecture(
        lectureId,
        lectureName,
        locationId,
        lectureDate,
        lectureStartTime,
        lectureEndTime
      );
      if (response) {
        toast.success('Successfully Lecture Updated!');
        reloadLecturesList();
      }
    } finally {
      setProcessingUpdateLecture(false);
    }
  };

  const addWhitePadding = (canvas) => {
    const context = canvas.getContext('2d');
    const imageData = context.getImageData(0, 0, canvas.width, canvas.height);
    const newCanvas = document.createElement('canvas');
    newCanvas.width = canvas.width + 40; // 20px padding on each side
    newCanvas.height = canvas.height + 40; // 20px padding on each side
    const newContext = newCanvas.getContext('2d');
    if (!newContext) {
      return canvas;
    }
    newContext.fillStyle = 'white';
    newContext.fillRect(0, 0, newCanvas.width, newCanvas.height);
    newContext.putImageData(imageData, 20, 20);
    return newCanvas;
  };

  const downloadQRCode = () => {
    const qrCodeEl = document.getElementById('qrCodeEl');
    if (!qrCodeEl) {
      return;
    }
    const paddedCanvas = addWhitePadding(qrCodeEl);
    const qrCodeURL = paddedCanvas
      .toDataURL('image/png')
      .replace('image/png', 'image/octet-stream');
    let aEl = document.createElement('a');
    aEl.href = qrCodeURL;
    aEl.download = 'QR_Code' + '_' + selectedLecture.name + '.png';
    document.body.appendChild(aEl);
    aEl.click();
    document.body.removeChild(aEl);
  };

  const lectureDetails =
    selectedLecture.lectureType === 'LECTURE'
      ? {
          moduleCode: lectureModuleCode,
          moduleId: moduleId,
          lectureId: selectedLecture.id,
        }
      : selectedLecture.lectureType === 'EVENT'
        ? {
            eventId: selectedLecture.id,
          }
        : {};
  const encodedData = btoa(JSON.stringify(lectureDetails));
  const qrCodeDetails = encodedData;

  return (
    <div className="row">
      <div className="col lecture-edit-container">
        <div className="lecture-edit-close-btn" onClick={handleCloseUpdateLectureWindow}>
          <IoMdCloseCircleOutline id="close-icon" />
        </div>
        <div className="row justify-content-center">
          <h3 className="text-center">Update {title}</h3>
        </div>
        <div className="row eventCreation-field">
          <div className="col" ref={qrCodeRef}>
            <div className="row align-items-center justify-content-center">
              <div className="col-auto">
                <QRCode
                  id="qrCodeEl"
                  name="QRCode"
                  size={200}
                  value={qrCodeDetails}
                  className="QRCode-img"
                  style={{ border: '5px solid white' }}
                />
              </div>
            </div>
            <div className="row">
              <p className="text-center">Scan this QR code to join {title}</p>
            </div>
            <div className="row align-items-center justify-content-center">
              <div className="col-auto">
                <button onClick={downloadQRCode} className="btn btn-success mr-3">
                  Save
                </button>
              </div>
            </div>
          </div>
          <div className="col">
            <form onSubmit={handleSaveLecture}>
              <div className="row my-1">
                <div className="col">
                  <div className="row">
                    <label>Name</label>
                  </div>
                  <div className="row">
                    <div className="col">
                      <input
                        required
                        type="text"
                        id="lectureName"
                        name="lectureName"
                        placeholder={'Lecture Name'}
                        className="form-control mb-2"
                        value={lectureName}
                        onChange={(e) => setLectureName(e.target.value)}
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div className="row my-1">
                <div className="col">
                  <div className="row">
                    <label>Date</label>
                  </div>
                  <div className="row">
                    <div className="col">
                      <input
                        required
                        type="date"
                        id="lectureDate"
                        name="lectureDate"
                        placeholder={'Lecture Date'}
                        className="form-control mb-2"
                        value={lectureDate}
                        onChange={(e) => setLectureDate(e.target.value)}
                        min={new Date().toISOString().split('T')[0]}
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div className="row my-1">
                <div className="col">
                  <div className="row">
                    <label>Venue</label>
                  </div>
                  <select
                    required
                    value={locationId}
                    onChange={(e) => setLocationId(e.target.value)}
                    className="form-control mb-2"
                  >
                    {locationList.map((option, index) => (
                      <option key={index} value={option.locationId}>
                        {option.locationName}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              <div className="row my-1">
                <div className="col">
                  <label>Start Time</label>
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
              </div>
              <div className="row my-1">
                <div className="col">
                  <label>End Time</label>
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
    </div>
  );
};

export default LecturesEdit;
