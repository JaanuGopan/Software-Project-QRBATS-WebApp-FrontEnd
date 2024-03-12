import React from "react";
import "./inputfield.css";

const InputField = ({ placeholder, value, onChange, inputType }) => {
  return (
    <div className="input-with-icon">
      <input
        type={inputType}
        className="input-field"
        placeholder={placeholder}
        value={value}
        onChange={onChange}
      />
    </div>
  );
};

export default InputField;
