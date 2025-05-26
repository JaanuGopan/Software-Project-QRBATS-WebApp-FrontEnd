import React from 'react';
import './app-input.css';

interface AppInputProps {
  label?: string;
  placeholder: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  value: string;
  type?: string;
  error?: boolean;
  errorMessage?: string;
  required?: boolean;
}

const AppInput = ({
  label,
  placeholder,
  onChange,
  value,
  type = 'text',
  error,
  errorMessage,
  required,
}: AppInputProps) => {
  return (
    <div className="mb-3">
      <label className="form-label">{label}</label>
      <input
        type={type}
        className={`form-control ${error ? 'is-invalid' : ''}`}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        required={required}
      />
      {error && <div className="invalid-feedback">{errorMessage}</div>}
    </div>
  );
};

export default AppInput;
