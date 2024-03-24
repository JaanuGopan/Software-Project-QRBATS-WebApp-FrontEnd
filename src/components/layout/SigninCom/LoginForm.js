import React, { useState } from "react";
import "../../pages/Signin/Signin.css";
import axios from "axios";
import { FaUser, FaLock } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import LoginService from "../../../api/services/LoginService";
import JwtService from "../../../api/services/JwtService";

const LoginForm = () => {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = await LoginService.loginUser(userName, password);
      console.log("Token is : " + token);
      const decodedToken = JwtService.parseJwt(token);
      const loginUserName = decodedToken.sub;
      console.log("User User Name is : " + loginUserName);
      localStorage.setItem("token", token);
      navigate("/mainNavigation", { state: { loginUserName } });
    } catch (error) {
      console.error("Login failed", error);
    }
  };

  return (
    <div className="form-container">
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <div className="signin-input-with-icon">
            <FaUser className="input-icon" />
            <input
              type="text"
              id="userName"
              name="userName"
              placeholder="user name"
              className="signin-input-field"
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
            />
          </div>
        </div>
        <div className="form-group">
          <div className="signin-input-with-icon">
            <FaLock className="input-icon" />
            <input
              type="password"
              id="password"
              name="password"
              placeholder="Password"
              className="signin-input-field"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
        </div>
        <div className="form-group">
          <a href="#" onClick={() => navigate("/forgotpassword")}>
            Forgot Password?
          </a>
        </div>
        <button type="submit" className="btn btn-primary w-100">
          Login
        </button>
      </form>
    </div>
  );
};

export default LoginForm;
