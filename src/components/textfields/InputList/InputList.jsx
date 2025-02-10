import React from 'react';
import '../../../pages/Event/EventCreation/EventCreation.css';

const InputList = ({ placeholder, value, onChange, inputType, list, initialValue }) => {
  return (
    <div className="input-with-icon">
      <select
        required
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="form-control mb-2"
      >
        {initialValue ? null : <option value="">{initialValue}</option>}
        {[initialValue, ...list.filter((option) => option !== initialValue)].map(
          (option, index) => (
            <option key={index} value={option} selected={option === initialValue}>
              {option}
            </option>
          )
        )}
      </select>
    </div>
  );
};

export default InputList;
