import React from "react";
import { IoMdCloseCircleOutline } from "react-icons/io";

const LectureQRCodeWindow = ({ lectureDetails, handleCloseQrCodeWindow }) => {
  return (
    <div className="lecture-qrCode-window">
      <div className="lecture-qrCode-title-close-button">
        <h3 className="lecture-qrCode-title">Create Module</h3>
        <div
          className="lecture-qrCode-close-button"
          onClick={handleCloseQrCodeWindow}
        >
          <IoMdCloseCircleOutline id="close-icon" />
        </div>
      </div>
    </div>
  );
};

export default LectureQRCodeWindow;
