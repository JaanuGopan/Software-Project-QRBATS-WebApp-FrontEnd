import { CircularProgress } from '@mui/material';
import React, { useState } from 'react';
import { IoMdCloseCircleOutline } from 'react-icons/io';
import Select from 'react-select';
import { toast } from 'react-toastify';
import StudentService from '../../api/services/StudentService';
import InputField from '../../components/textfields/InputBox/InputField';
import Department from '../../utils/Department';
import Utils from './../../utils/Utils';
import './Student.css';

const CreateStudentWindow = ({ handleCloseCreateStudentWindow, handleReloadStudentList }) => {
  const [studentName, setStudentName] = useState('');
  const [studentIndexNo, setStudentIndexNo] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [userName, setUserName] = useState('');
  const [userRole, setUserRole] = useState('STUDENT');
  const [semester, setSemester] = useState();
  const [departmentId, setDepartmentId] = useState('');
  const [studentBatch, setStudentBatch] = useState();

  const semesterList = ['1', '2', '3', '4', '5', '6', '7', '8'];
  const departmentList = Department.studentDepartmentList;
  const studentBatchList = Utils.studentBatchList;

  const [processing, setProcessing] = useState(false);

  const handleInputValidation = () => {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!studentName.trim()) {
      toast.error('Student name is required');
      return false;
    }

    // indexno = "EG/20XX/XXXX"
    const indexNoPattern = /^EG\/20[0-9]{2}\/[0-9]{4}$/;
    if (!studentIndexNo.trim()) {
      toast.error('Index number is required');
      return false;
    }
    if (!indexNoPattern.test(studentIndexNo)) {
      toast.error('Invalid index number. The format should be like "EG/20XX/XXXX"');
      return false;
    }

    if (!email.trim() || !emailPattern.test(email)) {
      toast.error('A valid email is required');
      return false;
    }

    if (!userName.trim()) {
      toast.error('Username is required');
      return false;
    }
    if (userName.length < 6) {
      toast.error('Username must be at least 6 characters');
      return false;
    }
    if (userName.includes(' ')) {
      toast.error('Username cannot contain spaces');
      return false;
    }

    if (!departmentId) {
      toast.error('Department is required');
      return false;
    }

    if (!semester || !semester.value) {
      toast.error('Semester is required');
      return false;
    }

    if (!studentBatch) {
      toast.error('Batch is required');
      return false;
    }

    if (!password.trim()) {
      toast.error('Password is required');
      return false;
    }

    // password must include at least one uppercase letter, one lowercase letter, one number, and be more than 8 characters
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{8,})/;
    if (!passwordRegex.test(password)) {
      toast.error(
        'Password must contain at least one uppercase letter, one lowercase letter, one number, and be more than 8 characters'
      );
      return false;
    }

    if (/^(?=.*[#,?$%]).+$/.test(password)) {
      toast.error("Password should not include the characters '#', '%', '?', or '$'.");
      return false;
    }

    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!handleInputValidation()) {
      return;
    }
    if (password !== confirmPassword) {
      toast.error('Password does not match');
      return;
    }
    try {
      setProcessing(true);
      const response = await StudentService.createStudentByAdmin(
        studentName,
        studentIndexNo,
        email,
        userName,
        password,
        semester.value,
        departmentList.indexOf(departmentId.value) + 1,
        userRole,
        studentBatch.value
      );
      if (response) {
        handleReloadStudentList();
        handleCloseCreateStudentWindow();
      }
    } finally {
      setProcessing(false);
    }
  };

  return (
    <div className="student-signup-main-container">
      <div className="student-create-title-close-button">
        <h3 className="student-create-title">Create Student</h3>
        <div className="student-create-close-button" onClick={handleCloseCreateStudentWindow}>
          <IoMdCloseCircleOutline id="close-icon" />
        </div>
      </div>
      <div className="student-login-container">
        <div className="form-container">
          <form onSubmit={handleSubmit}>
            <div className="student-creation-input">
              <label>Student Name</label>
              <div className="student-creation-input-field">
                <InputField
                  placeholder="Enter Student Name"
                  value={studentName}
                  onChange={(e) => setStudentName(e.target.value)}
                  inputType="text"
                />
              </div>
            </div>

            <div className="student-creation-input">
              <label>Student IndexNo</label>
              <div className="student-creation-input-field">
                <InputField
                  placeholder="Enter Student IndexNo"
                  value={studentIndexNo}
                  onChange={(e) => setStudentIndexNo(e.target.value)}
                  inputType="text"
                />
              </div>
            </div>

            <div className="student-creation-input">
              <label>Student Email</label>
              <div className="student-creation-input-field">
                <InputField
                  placeholder="Enter Student Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  inputType="text"
                />
              </div>
            </div>

            <div className="student-creation-input">
              <label>Student UserName</label>
              <div className="student-creation-input-field">
                <InputField
                  placeholder="Enter Student UserName"
                  value={userName}
                  onChange={(e) => setUserName(e.target.value)}
                  inputType="text"
                />
              </div>
            </div>

            <div className="student-creation-input">
              <label>Password</label>
              <div className="student-creation-input-field">
                <InputField
                  placeholder="Enter Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  inputType="password"
                />
              </div>
            </div>
            <div className="student-creation-input">
              <label>Confirm Password</label>
              <div className="student-creation-input-field">
                <InputField
                  placeholder="Re-enter Password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  inputType="password"
                />
              </div>
            </div>
            <div className="student-creation-input">
              <label>Current Semester</label>
              <div className="student-creation-input-field">
                <div className="eventCreation-form">
                  <Select
                    required
                    value={semester}
                    onChange={(e) => setSemester(e)}
                    options={semesterList.map((sem) => ({
                      value: sem,
                      label: sem,
                    }))}
                    placeholder={'Select Semester'}
                  />
                </div>
              </div>
            </div>
            <div className="student-creation-input">
              <label>Student Department</label>
              <div className="student-creation-input-field">
                <div className="eventCreation-form">
                  <Select
                    required
                    value={departmentId}
                    onChange={(e) => setDepartmentId(e)}
                    options={departmentList.map((dept) => ({
                      value: dept,
                      label: dept,
                    }))}
                    placeholder={'Select Department'}
                  />
                </div>
              </div>
            </div>
            <div className="student-creation-input">
              <label>Student Batch</label>
              <div className="student-creation-input-field">
                <div className="eventCreation-form">
                  <Select
                    required
                    value={studentBatch}
                    onChange={(e) => setStudentBatch(e)}
                    options={studentBatchList.map((b) => ({
                      value: b,
                      label: b,
                    }))}
                    placeholder={'Select Batch'}
                  />
                </div>
              </div>
            </div>
            <di className="student-creation-save-button-container">
              {processing ? (
                <CircularProgress />
              ) : (
                <button type="submit" className="btn btn-success student-creation-save-button">
                  Create Student
                </button>
              )}
            </di>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreateStudentWindow;
