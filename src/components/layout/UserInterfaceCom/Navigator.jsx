import React, { useContext, useEffect, useState } from 'react';
import '../../../pages/UserInterface/UserInterface.css';
import logo from '../../../assets/Images/logo/logo_white.png';
import { Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../../config/AuthProvider';

const Navigator = () => {
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);
  const loginButtonLabel = user ? 'Dashboard' : 'Login';

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
        onClick={() => navigate('/signin')}
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
    </div>
  );
};

export default Navigator;
