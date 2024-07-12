import React, { useState } from "react";
import { BiUser } from "react-icons/bi";
import { MdPassword } from "react-icons/md";
import { ToastContainer, toast } from "react-toastify";
import UserService from "../../api/services/UserService";

const ResetPassword = ({
  handleCloseResetPassword,
  handleShowLogin,
  email,
}) => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [userName, setUserName] = useState("");

  const handleCheckInputs = () => {
    if (!userName || !password || !confirmPassword) {
      toast.error("All fields are required");
      return false;
    }
    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (handleCheckInputs()) {
      try {
        const response = await UserService.resetPassword(
          email,
          password,
          userName
        );
        if (response.status === 200) {
          toast.success("Password reset successfully.");
          handleShowLogin();
        } else {
          toast.error(response.data || "Error in password reset.");
        }
      } catch (error) {
        toast.error("Error in password reset.");
      }
    }
  };

  return (
    <div className="form-container">
      <form onSubmit={handleSubmit}>
        <div className="signin-form-group">
          <div className="signin-input-with-icon">
            <BiUser className="input-icon" />
            <input
              required
              type="text"
              id="userName"
              name="userName"
              placeholder="Username"
              className="signin-input-field"
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
            />
          </div>
          <div className="signin-input-with-icon">
            <MdPassword className="input-icon" />
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
          <div className="signin-input-with-icon">
            <MdPassword className="input-icon" />
            <input
              required
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              placeholder="Confirm Password"
              className="signin-input-field"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </div>

          <button id="LoginID" type="submit" className="btn btn-primary w-100">
            Verify OTP
          </button>
        </div>
      </form>
    </div>
  );
};

export default ResetPassword;
