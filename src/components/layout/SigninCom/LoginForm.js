import React, { useState } from "react";
import "../../pages/Signin/Signin.css";
import axios from "axios";
import { FaUser, FaLock } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import LoginService from "../../../api/services/LoginService";
import JwtService from "../../../api/services/JwtService";
import { useDispatch } from "react-redux";
import { login } from "../../../redux/features/userSlice";

const LoginForm = () => {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = await LoginService.loginUser(userName, password);
      const decodedToken = JwtService.parseJwt(token);
      const loginUserName = decodedToken.sub;
      const lodinUserFirstName = decodedToken.firstName;
      const loginUserLastName = decodedToken.lastName;
      const loginUserEmail = decodedToken.email;
      const loginUserRole = decodedToken.role;
      localStorage.setItem("token", token);

      dispatch(
        login({
          token: token,
          userName: loginUserName,
          firstName: lodinUserFirstName,
          lastName: loginUserLastName,
          email: loginUserEmail,
          role: loginUserRole,
          loggedIn: true,
        })
      );

      navigate("/mainNavigation");
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
