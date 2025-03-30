import { Button, CircularProgress } from '@mui/material';
import React from 'react';
import './WarningPopup.css';

const WarningPopup = ({
  handleCloseWarningWindow,
  handleOk,
  handleCancel,
  buttonText,
  titleText,
  processing = false,
}) => {
  return (
    <div className="row warning-popup-main-container">
      <div className="col">
        <div className="row mb-2">
          <h6>{titleText}</h6>
        </div>
        <div className="row g-3 align-items-center justify-content-center">
          <div className="col-auto">
            {processing ? (
              <CircularProgress />
            ) : (
              <Button onClick={handleOk} variant="contained" color="error">
                {buttonText}
              </Button>
            )}
          </div>
          <div className="col-auto">
            <Button
              onClick={handleCloseWarningWindow}
              variant="contained"
              style={{ backgroundColor: '#6c757d', color: '#fff' }}
            >
              Cancel
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WarningPopup;
