import QRCode from 'qrcode.react';
import React from 'react';
import { IoMdCloseCircleOutline } from 'react-icons/io';
import { useSelector } from 'react-redux';
import './CreatedLectureViewModal.css';

const CreatedLectureModal = ({ lecture, module, handleClose }) => {
  const locationList = useSelector((state) => state.locationList);

  const qrCodeDetails = {
    moduleCode: module?.moduleCode,
    moduleId: module?.id,
    lectureId: lecture?.id,
  };
  const encodedQrCodeDetails = btoa(JSON.stringify(qrCodeDetails));

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

  const downloadQRCodeWithPadding = () => {
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
    aEl.download = 'QR_Code' + '_' + lecture.name + '.png';
    document.body.appendChild(aEl);
    aEl.click();
    document.body.removeChild(aEl);
  };

  return (
    <div className="container-fluid align-items-center justify-content-center created-lecture-view-modal-container">
      <div className="col-auto py-3 px-4 created-lecture-view-modal">
        <div className="row">
          <div className="col-auto me-0 close-btn">
            <IoMdCloseCircleOutline className="close-icon" onClick={handleClose} />
          </div>
        </div>
        <div className="row align-items-center justify-content-center fs-5 fw-bold py-2">
          Created Lecture
        </div>
        <div className="row">
          <div className="col-6">
            <div className="row justify-content-center mb-2">
              {module?.moduleCode} {' - ' + lecture.lectureDate} Lecture
            </div>
            <div className="row justify-content-center">
              <QRCode
                id="qrCodeEl"
                name="QRCode"
                size={200}
                value={encodedQrCodeDetails}
                className="px-0 p-1"
                style={{ height: '200px', width: '200px' }}
              />
            </div>
            <div className="row justify-content-center mb-2">
              <label className="text-center">Scan this QR code to join {lecture.name}</label>
            </div>
            <div className="row justify-content-center">
              <div className="col-auto">
                <button className="btn btn-success" onClick={downloadQRCodeWithPadding}>
                  Download QR Code
                </button>
              </div>
            </div>
          </div>
          <div className="col-6">
            <div className="row fw-bold justify-content-center">Lecture Details</div>
            <div className="row">
              <div className="col p-2 lecture-qrCode-lectures-details">
                <div className="row w-100 mb-1">
                  <div className="col">
                    <label className="fw-bold text-nowrap">Lecture Name:</label>
                  </div>
                  <div className="col">
                    <label>{lecture.name}</label>
                  </div>
                </div>
                <div className="row w-100 mb-1">
                  <div className="col">
                    <label className="fw-bold text-nowrap">Lecture Day:</label>
                  </div>
                  <div className="col">
                    <label>{lecture.lectureDate}</label>
                  </div>
                </div>
                <div className="row w-100 mb-1">
                  <div className="col">
                    <label className="fw-bold text-nowrap">Lecture Venue:</label>
                  </div>
                  <div className="col">
                    <label>
                      {
                        locationList.find((location) => location.locationId === lecture.locationId)
                          ?.locationName
                      }
                    </label>
                  </div>
                </div>
                <div className="row w-100 mb-1">
                  <div className="col">
                    <label className="fw-bold text-nowrap">Lecture Time:</label>
                  </div>
                  <div className="col">
                    <label>{lecture.startTime}</label>
                  </div>
                </div>
                <div className="row w-100 mb-1">
                  <div className="col">
                    <label className="fw-bold text-nowrap">Lecture End Time:</label>
                  </div>
                  <div className="col">
                    <label>{lecture.endTime}</label>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreatedLectureModal;
