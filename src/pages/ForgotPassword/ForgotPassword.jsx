import React, { useState, useEffect } from 'react';
import { FaUser, FaLock, FaMailBulk } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import UserService from '../../api/services/UserService';
import { FaVoicemail } from 'react-icons/fa6';
import { Email } from '@mui/icons-material';
import { CircularProgress } from '@mui/material';

const ForgotPassword = ({ handleCloseForgotPassword, handleShowOtpVerification }) => {
  const [email, setEmail] = useState('');
  const navigate = useNavigate();

  const [processing, setProcessing] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setProcessing(true);
      const response = await UserService.sendOtp(email);
      if (response.status === 200) {
        toast.success('OTP send successfully. Check your email ' + email);
        handleShowOtpVerification(email);
      } else if (response.status === 400) {
        toast.error(response.data);
      } else {
        toast.error('Error In Otp service.');
      }
    } catch (error) {
      toast.error('Error In Otp service.');
    } finally {
      setProcessing(false);
    }
  };

  return (
    <div className="form-container">
      <form onSubmit={handleSubmit}>
        <div className="signin-form-group">
          <div className="signin-input-with-icon">
            <Email className="input-icon" />
            <input
              required
              type="text"
              id="email"
              name="email"
              placeholder="email address"
              className="signin-input-field"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          {processing ? (
            <CircularProgress />
          ) : (
            <button id="LoginID" type="submit" className="btn btn-primary w-100">
              Send OTP
            </button>
          )}
        </div>
      </form>
    </div>
  );
};

export default ForgotPassword;
