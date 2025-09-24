import { Button } from '@mui/material';
import { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import logo from '../../../assets/Images/logo/logo_white.png';
import { AuthContext } from '../../../config/AuthProvider';
import Signin from '../../../pages/Signin/Signin';
import '../../../pages/UserInterface/UserInterface.css';

const Navigator = () => {
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);
  const loginButtonLabel = user ? 'Dashboard' : 'Login';

  const [showSigninPopup, setShowSigninPopup] = useState(false);

  return (
    <div className="navigate">
      <div className="d-flex align-items-center justify-content-between ms-3">
        <div className="col-auto mx-2">
          <div className="row">
            <div className="col-auto pe-0">
              <img
                className=""
                style={{ cursor: 'pointer', width: '70px' }}
                src={logo}
                alt="Sky Ticker"
                onClick={() => navigator('/')}
              />
            </div>
            <div className="col-auto d-flex align-items-center ps-0">
              <p className="Webname">SKY TICKER</p>
            </div>
          </div>
        </div>
      </div>
      <Button
        onClick={() => {
          user?.role === 'ADMIN'
            ? navigate('/admin/dashboard')
            : user?.role === 'LECTURER'
              ? navigate('/lecturer/dashboard')
              : setShowSigninPopup(true);
        }}
        id="loginID"
        style={{
          color: '#0063A0',
          backgroundColor: 'white',
          marginRight: '3vw',
          fontWeight: 'bold',
        }}
        variant="contained"
      >
        {loginButtonLabel}
      </Button>
      {showSigninPopup && <Signin handleCloseSignin={() => setShowSigninPopup(false)} />}
    </div>
  );
};

export default Navigator;
