import { useState } from 'react';
import { toast } from 'react-toastify';
import UserService from '../../api/services/UserService';
import AppInput from '../../components/app-input/app-input';

const ResetPassword = ({ handleCloseResetPassword, handleShowLogin, email }) => {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [userName, setUserName] = useState('');

  const handleCheckInputs = () => {
    if (!userName || !password || !confirmPassword) {
      toast.error('All fields are required');
      return false;
    }
    if (password !== confirmPassword) {
      toast.error('Passwords do not match');
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (handleCheckInputs()) {
      try {
        const response = await UserService.resetPassword(email, password, userName);
        if (response.status === 200) {
          toast.success('Password reset successfully.');
          handleShowLogin();
        } else {
          toast.error(response.data || 'Error in password reset.');
        }
      } catch (error) {
        toast.error('Error in password reset.');
      }
    }
  };

  return (
    <div className="row w-100 justify-content-center">
      <form onSubmit={handleSubmit}>
        <div className="col">
          <div className="row mb-3">
            <AppInput
              required={true}
              label="Username"
              type="text"
              id="userName"
              name="userName"
              placeholder="Username"
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
            />
          </div>
          <div className="row mb-3">
            <AppInput
              required={true}
              label="Email"
              type="password"
              id="password"
              name="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="row mb-3">
            <AppInput
              required={true}
              label="Confirm Password"
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              placeholder="Confirm Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </div>

          <div className="row">
            <button id="LoginID" type="submit" className="btn btn-primary w-100">
              Verify OTP
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default ResetPassword;
