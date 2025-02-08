import React from 'react';
import '../../../pages/Event/EventCreation/EventCreation.css';

const InputField = ({ placeholder, value, onChange, inputType, error, helperText }) => {
  return (
    <div className="input-with-icon">
      <input
        required
        type={inputType}
        className={`form-control mb-2 ${error ? 'is-invalid' : ''}`}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
      />
      {error && <div className="invalid-feedback">{helperText}</div>}
    </div>
  );
};

export default InputField;
