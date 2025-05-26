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
      <div className="navigate1">
        <img className="logo1" src={logo} alt="Sky Ticker" />
        <p
          style={{
            color: 'white',
            marginBottom: '0px',
            fontSize: `25px`,
            fontWeight: '600',
          }}
        >
          SKY TICKER
        </p>
      </div>
      <Button
        onClick={() => {
          user ? navigate('/mainNavigation') : setShowSigninPopup(true);
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
