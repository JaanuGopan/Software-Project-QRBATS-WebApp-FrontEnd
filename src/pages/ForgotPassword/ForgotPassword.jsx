import { CircularProgress } from '@mui/material';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import UserService from '../../api/services/UserService';
import AppInput from '../../components/app-input/app-input';

const ForgotPassword = ({ handleShowOtpVerification }) => {
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
      }
    } finally {
      setProcessing(false);
    }
  };

  return (
    <div className="row w-100 justify-content-center">
      <form onSubmit={handleSubmit}>
        <div className="col">
          <div className="row mb-3">
            <AppInput
              required={true}
              label="Email"
              type="text"
              id="email"
              name="email"
              placeholder="email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="row">
            {processing ? (
              <CircularProgress />
            ) : (
              <button id="LoginID" type="submit" className="btn btn-primary w-100">
                Send OTP
              </button>
            )}
          </div>
        </div>
      </form>
    </div>
  );
};

export default ForgotPassword;
