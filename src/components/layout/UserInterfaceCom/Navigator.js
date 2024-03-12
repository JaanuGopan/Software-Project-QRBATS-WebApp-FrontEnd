import React from "react";
import "../../pages/UserInterface/UserInterface.css";
import logo from "../../../assets/Images/logo/logo_white.png";
import { Button } from "@mui/material";

const Navigator = () => {
  const maxFontSize = 1500;
  return (
    <div className="navigate">
      <div className="navigate1">
        <img className="logo1" src={logo} alt="" />
        <p
          style={{
            color: "white",
            letterSpacing: "0.5rem",
            marginTop: "0.75vw",
            marginLeft: "0.5vw",
            fontSize: `min(${maxFontSize}vw, 200%)`,
            fontWeight: "bold",
          }}
        >
          SKY TICKER
        </p>
      </div>
      <a href="/signin">
        <Button
          style={{
            color: "#0063A0",
            backgroundColor: "white",
            marginRight: "3vw",
            fontWeight: "bold",
          }}
          variant="contained"
        >
          Sign In
        </Button>
      </a>
    </div>
  );
};

export default Navigator;
