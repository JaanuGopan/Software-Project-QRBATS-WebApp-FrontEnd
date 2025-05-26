import { CircularProgress } from '@mui/material';
import { useState } from 'react';
import { toast } from 'react-toastify';
import UserService from '../../api/services/UserService';
import AppInput from '../../components/app-input/app-input';

const OtpVerification = ({ handleCloseOtpVerification, handleShowPasswordChange, email }) => {
  const [otp, setOtp] = useState('');

  const [processing, setProcessing] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setProcessing(true);
      const response = await UserService.verifyOtp(email, otp);
      if (response.status === 200) {
        toast.success('Otp successfully verified.');
        handleShowPasswordChange();
      } else if (response.status === 400) {
        toast.error(response.data);
      } else {
        toast.error('Error In Otp Verification.');
      }
    } catch (error) {
      toast.error('Error In Otp Verification.');
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
              label="Otp"
              type="text"
              id="otp"
              name="otp"
              placeholder="otp"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
            />
          </div>

          <div className="row">
            {processing ? (
              <CircularProgress />
            ) : (
              <button id="LoginID" type="submit" className="btn btn-primary w-100">
                Verify Otp
              </button>
            )}
          </div>
        </div>
      </form>
    </div>
  );
};

export default OtpVerification;
