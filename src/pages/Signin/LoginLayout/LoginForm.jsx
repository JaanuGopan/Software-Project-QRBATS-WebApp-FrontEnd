import { CircularProgress } from '@mui/material';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AppInput from '../../../components/app-input/app-input';
import { AuthContext } from '../../../config/AuthProvider';

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

  // Username: at least 3 chars, only letters/numbers/._-
  const validateUserName = (name) => {
    if (!name) return 'User Name is required';
    if (name.length < 6) return 'User Name must be at least 3 characters';
    return '';
  };

  // Password: at least 6 chars
  const validatePassword = (pwd) => {
    if (!pwd) return 'Password is required';
    // password must include at least one uppercase letter, one lowercase letter, one number, and be more than 8 characters
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{8,})/;
    if (!passwordRegex.test(pwd)) {
      return 'Password must contain at least one uppercase letter, one lowercase letter, one number, and be more than 8 characters';
    }

    return '';
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate fields
    const userNameMsg = validateUserName(userName);
    const passwordMsg = validatePassword(password);

    setUserNameError(!!userNameMsg);
    setUserNameErrorMessage(userNameMsg);
    setPasswordError(!!passwordMsg);
    setPasswordErrorMessage(passwordMsg);

    if (userNameMsg || passwordMsg) return;

    try {
      setProcessing(true);
      await login(userName, password, navigate);
    } finally {
      setProcessing(false);
    }
  };

  const handleUserNameChange = (e) => {
    const name = e.target.value;
    setUserName(name);
    const errorMsg = validateUserName(name);
    setUserNameError(!!errorMsg);
    setUserNameErrorMessage(errorMsg);
  };

  const handlePasswordChange = (e) => {
    const pwd = e.target.value;
    setPassword(pwd);
    const errorMsg = validatePassword(pwd);
    setPasswordError(!!errorMsg);
    setPasswordErrorMessage(errorMsg);
  };

  return (
    <div className="row w-100 justify-content-center px-1">
      <div className="col">
        <form onSubmit={handleSubmit}>
          <div className="row">
            <div className="col">
              <AppInput
                label="User Name"
                placeholder="User Name"
                onChange={(e) => handleUserNameChange(e)}
                value={userName}
                error={userNameError}
                errorMessage={userNameErrorMessage}
                required={true}
              />
            </div>
          </div>
          <div className="row">
            <div className="col">
              <AppInput
                label="Password"
                placeholder="Password"
                onChange={(e) => handlePasswordChange(e)}
                value={password}
                type="password"
                error={passwordError}
                errorMessage={passwordErrorMessage}
                required={true}
              />
            </div>
          </div>
          <div className="row mb-2">
            <div className="col">
              <a className="forgot-password" onClick={handleShowForgotPassword}>
                Forgot Password?
              </a>
            </div>
          </div>
          {processing ? (
            <div className="row w-100 mb-2">
              <div className="col d-flex justify-content-center">
                <CircularProgress />
              </div>
            </div>
          ) : (
            <div className="row mb-2">
              <div className="col w-100">
                <button
                  id="LoginID"
                  type="submit"
                  className={
                    'btn w-100 btn-primary ' + (passwordError || userNameError ? 'disabled' : '')
                  }
                >
                  Login
                </button>
              </div>
            </div>
          )}
        </form>
      </div>
    </div>
  );
};

export default LoginForm;
