import React, { useState, useEffect } from "react";
import "../../pages/Signin/Signin.css";
import { FaUser, FaLock } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import LoginService from "../../../api/services/LoginService";
import JwtService from "../../../api/services/JwtService";
import { useDispatch, useSelector } from "react-redux";
import { login, selectUser } from "../../../redux/features/userSlice";

const LoginForm = () => {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector(selectUser);

  // If user is already logged in, redirect to mainNavigation
  useEffect(() => {
    if (user) {
      navigate("/mainNavigation");
    }
  }, [user, navigate]);

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
      const loginUserId = decodedToken.userId;
      localStorage.setItem("token", token);

      dispatch(
        login({
          token: token,
          userId: loginUserId,
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
        <div className="signin-form-group">
          <div className="signin-input-with-icon">
            <FaUser className="input-icon" />
            <input
              required
              type="text"
              id="userName"
              name="userName"
              placeholder="user name"
              className="signin-input-field"
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
            />
          </div>
          <div className="signin-input-with-icon">
            <FaLock className="input-icon" />
            <input
              required
              type="password"
              id="password"
              name="password"
              placeholder="Password"
              className="signin-input-field"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <a href="#" className="forgot-password" onClick={() => navigate("")}>
            Forgot Password?
          </a>
          <button type="submit" className="btn btn-primary w-100">
            Login
          </button>
        </div>
      </form>
    </div>
  );
};

export default LoginForm;
