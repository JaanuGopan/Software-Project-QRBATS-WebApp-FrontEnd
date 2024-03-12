import React, { useState } from "react";
import "../../pages/Signin/Signin.css";
import axios from "axios";
import { FaUser, FaLock } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:8080/api/v1/auth/authendicate", // Corrected endpoint URL
        {
          email: email,
          password: password,
        }
      );
      const token = response.data.token;
      console.log("Token is : " + token);
      const decodedToken = parseJwt(token);
      const userEmail = decodedToken.sub;
      console.log("User Email is : " + userEmail);
      localStorage.setItem("token", token);
      navigate("/mainNavigation", { state: { userEmail } }); // Pass userEmail as a parameter
    } catch (error) {
      console.error("Login failed", error);
    }
  };

  // Helper function to parse JWT token
  const parseJwt = (token) => {
    const base64Url = token.split(".")[1];
    const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
    const jsonPayload = decodeURIComponent(
      atob(base64)
        .split("")
        .map((c) => "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2))
        .join("")
    );
    return JSON.parse(jsonPayload);
  };

  return (
    <div className="form-container">
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <div className="signin-input-with-icon">
            <FaUser className="input-icon" />
            <input
              type="text"
              id="email"
              name="email"
              placeholder="Email"
              className="signin-input-field"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
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
