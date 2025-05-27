import { useState } from 'react';
import { BiLeftArrowAlt } from 'react-icons/bi';
import { IoMdCloseCircleOutline } from 'react-icons/io';
import { useNavigate } from 'react-router-dom';
import ForgotPassword from '../ForgotPassword/ForgotPassword';
import OtpVerification from '../ForgotPassword/OtpVerification';
import ResetPassword from '../ForgotPassword/RestPassword';
import LoginForm from './LoginLayout/LoginForm';
import './Signin.css';

function Signin({ handleCloseSignin }) {
  const navigate = useNavigate();
  const [showLogin, setShowLogin] = useState(true);
  const [showForgetPassword, setShowForgotPassword] = useState(false);
  const [showOtpVerification, setShowOtpVerification] = useState(false);
  const [showResetPassword, setShowRestPassword] = useState(false);

  const [title, setTitle] = useState('Login');
  const [email, setEmail] = useState('');

  const handleShowSendOtp = () => {
    setShowLogin(false);
    setShowOtpVerification(false);
    setShowForgotPassword(true);
    setShowRestPassword(false);
    setTitle('Forgot Password');
  };

  const handleCloseSendOtp = () => {
    setShowLogin(true);
    setShowOtpVerification(false);
    setShowForgotPassword(false);
    setShowRestPassword(false);
    setTitle('Login');
  };

  const handleShowOtpVerification = (email) => {
    setEmail(email);
    setShowLogin(false);
    setShowOtpVerification(true);
    setShowForgotPassword(false);
    setShowRestPassword(false);
    setTitle('Otp Verification');
  };
  const handleCloseOtpVerification = () => {
    setShowLogin(false);
    setShowOtpVerification(false);
    setShowForgotPassword(true);
    setShowRestPassword(false);
    setTitle('Forgot Password');
  };
  const handleShowResetPassword = () => {
    setShowLogin(false);
    setShowOtpVerification(false);
    setShowForgotPassword(false);
    setShowRestPassword(true);
    setTitle('Reset Password');
  };
  const handleCloseResetPassword = () => {
    setShowLogin(false);
    setShowOtpVerification(false);
    setShowForgotPassword(true);
    setShowRestPassword(false);
    setTitle('Forgot Password');
  };

  const handleBackButtonAction = () => {
    if (showLogin) {
      handleCloseSignin();
    } else if (showForgetPassword) {
      handleCloseSendOtp();
    } else if (showOtpVerification) {
      handleCloseOtpVerification();
    } else if (showResetPassword) {
      handleCloseResetPassword();
    }
  };

  return (
    <div className="ComponentBackground">
      <div className="ComponentContent">
        <div className="row">
          <div className="col-auto me-0 close-btn">
            <IoMdCloseCircleOutline className="close-icon" onClick={handleCloseSignin} />
          </div>
        </div>
        <button onClick={handleBackButtonAction} className="back-button">
          <BiLeftArrowAlt className="back-icon" size={'20px'} />
        </button>
        <p className="head1">{title}</p>
        <div className="row justify-content-center">
          <div className="col-12 col-md-8 col-lg-6">
            {showLogin && <LoginForm handleShowForgotPassword={handleShowSendOtp} />}
            {showForgetPassword && (
              <ForgotPassword
                handleCloseForgotPassword={handleCloseSendOtp}
                handleShowOtpVerification={(email) => handleShowOtpVerification(email)}
              />
            )}
            {showOtpVerification && !showForgetPassword && email !== '' && (
              <OtpVerification
                handleCloseOtpVerification={handleCloseOtpVerification}
                handleShowPasswordChange={handleShowResetPassword}
                email={email}
              />
            )}
            {showResetPassword && (
              <ResetPassword
                handleCloseResetPassword={handleCloseResetPassword}
                handleShowLogin={handleCloseSendOtp}
                email={email}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Signin;
