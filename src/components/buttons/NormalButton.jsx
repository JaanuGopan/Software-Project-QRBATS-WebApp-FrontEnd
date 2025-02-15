import React from 'react';
import './normal-button.css';

const NormalButton = ({ title, icon, handleClick }) => {
  return (
    <div className="row my-1 align-items-center normal-button-container" onClick={handleClick}>
      <div className="col">
        <div className="row py-2">
          <div className="col-auto pe-0">{icon}</div>
          <div className="col-auto fs-6">{title}</div>
        </div>
      </div>
    </div>
  );
};

export default NormalButton;
