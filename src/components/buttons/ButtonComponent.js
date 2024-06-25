import React from "react";

const ButtonComponent = ({ buttonText, onClick }) => {
  return (
    <div className="button-component">
      <button className="btn-success" onClick={onClick}>
        {buttonText}
      </button>
    </div>
  );
};

export default ButtonComponent;
