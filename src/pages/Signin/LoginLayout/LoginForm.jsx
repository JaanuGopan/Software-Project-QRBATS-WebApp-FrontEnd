import React, { useState, useEffect, useContext } from 'react';
import '../../../pages/Signin/Signin.css';
import { FaUser, FaLock } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import { toast } from 'react-toastify';
import { CircularProgress } from '@mui/material';
import { AuthContext } from '../../../config/AuthProvider';

const LoginForm = ({ handleShowForgotPassword }) => {
  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);

  const [processing, setProcessing] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setProcessing(true);
      const response = await login(userName, password);
      navigate('/mainNavigation');
    } catch (error) {
      toast.error('Error In LogIn Service.');
      console.error('Login failed', error);
    } finally {
      setProcessing(false);
    }
  };

  return (
    <div className="form-container">
      <form onSubmit={handleSubmit}>
        <div className="signin-form-group">
          <div className="signin-input-with-icon">
            <FaUser className="input-icon" />
            <input
              required
              type="text"
              id="userName"
              name="userName"
              placeholder="user name"
              className="signin-input-field"
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
            />
          </div>
          <div className="signin-input-with-icon">
            <FaLock className="input-icon" />
            <input
              required
              type="password"
              id="password"
              name="password"
              placeholder="Password"
              className="signin-input-field"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <a className="forgot-password" onClick={handleShowForgotPassword}>
            Forgot Password?
          </a>
          {processing ? (
            <CircularProgress />
          ) : (
            <button id="LoginID" type="submit" className="btn btn-primary w-100">
              Login
            </button>
          )}
        </div>
      </form>
    </div>
  );
};

export default LoginForm;
