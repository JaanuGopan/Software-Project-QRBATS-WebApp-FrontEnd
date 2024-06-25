import React, { useState } from "react";

const DualButtonComponent = ({ onSelect, buttonText1, buttonText2 }) => {
  const [selectedButton, setSelectedButton] = useState(1);

  const handleSelect = (button) => {
    setSelectedButton(button);
    onSelect(button);
  };

  return (
    <div className="row align-items-center">
      <div className="col align-self-center">
        <label>{`Select one`}</label>
      </div>
      <div className="col">
        <button
          className={`btn  ${
            selectedButton === 1 ? "btn-primary" : "btn-outline-primary"
          }`}
          onClick={() => handleSelect(1)}
        >
          {buttonText1}
        </button>
      </div>
      <div className="col">
        <button
          className={`btn ${
            selectedButton === 2 ? "btn-primary" : "btn-outline-primary"
          }`}
          onClick={() => handleSelect(2)}
        >
          {buttonText2}
        </button>
      </div>
    </div>
  );
};

export default DualButtonComponent;
