import React from "react";
import "../../../pages/Event/EventCreation/EventCreation.css";
import { CircularProgress } from "@mui/material";

const InputPassword = ({
  placeholder,
  value,
  onChange,
  onButtonClick,
  buttonText,
  showButton = true,
  isLoading = false,
}) => {
  return (
    <div className="row mb-3 ">
      <div className="col-auto">
        <input
          required
          type="password"
          className="form-control"
          placeholder={placeholder}
          value={value}
          onChange={onChange}
        />
      </div>
      {showButton && (
        <div className="col-auto">
          <button onClick={onButtonClick} className="btn btn-warning">
            {buttonText}
          </button>
        </div>
      )}
      {isLoading && (
        <div className="col-auto">
          <CircularProgress size={30} />
        </div>
      )}
    </div>
  );
};

export default InputPassword;
