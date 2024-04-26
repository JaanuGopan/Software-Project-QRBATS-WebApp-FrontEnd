import React from "react";
import "../../../pages/Event/EventCreation/EventCreation.css";

const InputField = ({ placeholder, value, onChange, inputType }) => {
  return (
    <div className="input-with-icon">
      <input
        required
        type={inputType}
        className="form-control mb-2"
        placeholder={placeholder}
        value={value}
        onChange={onChange}
      />
    </div>
  );
};

export default InputField;
