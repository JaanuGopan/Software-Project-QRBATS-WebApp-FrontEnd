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
  error,
  helperText,
}) => {
  return (
    <div className="row mb-3">
      <div className="col-auto">
        <input
          required
          type="password"
          className={`form-control ${error ? "is-invalid" : ""}`}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
        />
        {error && <div className="invalid-feedback">{helperText}</div>}
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
