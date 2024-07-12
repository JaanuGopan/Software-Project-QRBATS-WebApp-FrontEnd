import React, { useState } from "react";
import "./WarningPopup.css";
import { CircularProgress } from "@mui/material";

const WarningPopup = ({
  handleCloseWarningWindow,
  handleOk,
  handleCancel,
  buttonText,
  titleText,
  processing = false,
}) => {
  return (
    <div className="warning-popup-main-container">
      <div className="warning-popup-field">
        <div className="warning-popup-text">
          <h6>{titleText}</h6>
        </div>
        <div className="warning-popup-buttons">
          {processing ? (
            <CircularProgress />
          ) : (
            <button onClick={handleOk} className="btn btn-danger">
              {buttonText}
            </button>
          )}
          <button
            onClick={handleCloseWarningWindow}
            className="btn btn-secondary"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default WarningPopup;
