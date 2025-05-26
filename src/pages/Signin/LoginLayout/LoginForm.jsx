import { CircularProgress } from '@mui/material';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import AppInput from '../../../components/app-input/app-input';
import { AuthContext } from '../../../config/AuthProvider';
import '../../../pages/Signin/Signin.css';

const LoginForm = ({ handleShowForgotPassword }) => {
  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const [userNameError, setUserNameError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [userNameErrorMessage, setUserNameErrorMessage] = useState('');
  const [passwordErrorMessage, setPasswordErrorMessage] = useState('');
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
    <div className="row w-100 justify-content-center">
      <div className="col">
        <form onSubmit={handleSubmit}>
          <div className="row"></div>
          <AppInput
            label="User Name"
            placeholder="User Name"
            onChange={(e) => setUserName(e.target.value)}
            value={userName}
            error={userNameError}
            errorMessage={userNameErrorMessage}
            required={true}
          />
          <div className="row">
            <AppInput
              label="Password"
              placeholder="Password"
              onChange={(e) => setPassword(e.target.value)}
              value={password}
              type="password"
              error={passwordError}
              errorMessage={passwordErrorMessage}
              required={true}
            />
          </div>
          <div className="row">
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
    </div>
  );
};

export default LoginForm;
