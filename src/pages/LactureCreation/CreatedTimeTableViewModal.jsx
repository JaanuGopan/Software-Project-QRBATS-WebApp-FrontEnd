import QRCode from 'qrcode.react';
import React from 'react';
import { IoMdCloseCircleOutline } from 'react-icons/io';
import './CreatedTimeTableViewModal.css';

const SelectedDate = ({ date }) => {
  return (
    <div className="col-auto m-1 p-1 selected-date">
      <div className="row align-items-center">
        <div className="col-auto">{date}</div>
      </div>
    </div>
  );
};

const CreatedTimeTableViewModal = ({ lectureList, handleClose, show, module }) => {
  const qrCodeDetails = {
    moduleCode: module?.moduleCode,
    moduleId: module?.id,
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
    aEl.download = 'QR_Code' + '_' + module.moduleCode + '.png';
    document.body.appendChild(aEl);
    aEl.click();
    document.body.removeChild(aEl);
  };

  return (
    show && (
      <div className="row created-timetable-view-modal-container">
        <div className="col-auto p-3 created-timetable-view-modal">
          <div className="created-timetable-view-modal-close-btn" onClick={handleClose}>
            <IoMdCloseCircleOutline className="created-timetable-view-modal-close-icon" />
          </div>
          <div className="row justify-content-center">
            <h3 className="text-center">Created Lectures</h3>
          </div>

          <div className="row p-2 align-items-center justify-content-center">
            {lectureList.map((lecture, index) => {
              return (
                <div className="col-auto" key={index}>
                  <div className="row align-items-center">
                    <div className="col-auto pe-0">
                      {SelectedDate({ date: lecture.lectureDate })}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
          <div className="row justify-content-center">
            <QRCode
              id="qrCodeEl"
              name="QRCode"
              size={200}
              value={encodedQrCodeDetails}
              className="px-0 p-1"
            />
          </div>
          <div className="row justify-content-center mb-2">
            <label className="text-center">Scan this QR code to join the lectures</label>
          </div>
          <div className="row justify-content-center">
            <div className="col-auto">
              <button className="btn btn-success" onClick={downloadQRCodeWithPadding}>
                Download QR Code
              </button>
            </div>
          </div>
        </div>
      </div>
    )
  );
};

export default CreatedTimeTableViewModal;
