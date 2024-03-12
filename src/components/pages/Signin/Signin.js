import React from "react";
import "./Signin.css";
import LoginForm from "../../layout/SigninCom/LoginForm";
import Designer from "../../../assets/Images/Designer.jpeg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleArrowLeft } from "@fortawesome/free-solid-svg-icons";

function Signin() {
  return (
    <div className="mainBackground">
      <div className="ComponentBackground">
        <button className="back-button">
          <FontAwesomeIcon icon={faCircleArrowLeft} className="backicon" />
        </button>
        <p className="head1">LOGIN</p>
        <div className="content">
          <div className="image-container">
            <img className="Designer" src={Designer} alt="" />
          </div>
          <div className="bodyContent">
            <LoginForm />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Signin;
