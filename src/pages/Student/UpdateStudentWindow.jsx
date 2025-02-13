import React, { useState } from 'react';
import './Student.css';
import InputField from '../../components/textfields/InputBox/InputField';
import { IoMdCloseCircleOutline } from 'react-icons/io';
import Select from 'react-select';
import StudentService from '../../api/services/StudentService';
import { toast } from 'react-toastify';
import { CircularProgress } from '@mui/material';
import Department from '../../utils/Department';

const UpdateStudentWindow = ({
  handleCloseUpdateStudentWindow,
  student,
  handleReloadStudentList,
}) => {
  const [studentId, setStudentId] = useState(student.userId);
  const [indexNumber, setIndexNumber] = useState(student.indexNumber);
  const [studentName, setStudentName] = useState(student.firstName);
  const [studentEmail, setStudentEmail] = useState(student.email);
  const [userName, setUserName] = useState(student.username);
  const [StudentRole, setStudentRole] = useState(student.role);
  const [departmentId, setDepartmentId] = useState(student.departmentId);
  const departmentList = Department.studentDepartmentList;

  const [department, setDepartment] = useState({
    value: departmentList[student.departmentId - 1],
    label: departmentList[student.departmentId - 1],
  });
  const semesterList = ['1', '2', '3', '4', '5', '6', '7', '8'];
  const [semester, setSemester] = useState({
    value: semesterList[student.semester - 1],
    label: semesterList[student.semester - 1],
  });

  const [updateSuccess, setUpdateSuccess] = useState(false);

  const [processing, setProcessing] = useState(false);

  const handleInputValidation = () => {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!studentName.trim()) {
      toast.error('Student name is required');
      return false;
    }
    // indexno = "EG/20XX/XXXX"
    const indexNoPattern = /^EG\/20[0-9]{2}\/[0-9]{4}$/;

    if (!indexNoPattern.test(indexNumber)) {
      toast.error('Invalid index number');
      return false;
    }

    if (!indexNumber.trim()) {
      toast.error('Index number is required');
      return false;
    }

    if (!studentEmail.trim() || !emailPattern.test(studentEmail)) {
      toast.error('A valid email is required');
      return false;
    }

    if (!userName.trim()) {
      toast.error('Username is required');
      return false;
    }

    if (!department.value) {
      toast.error('Department is required');
      return false;
    }

    if (!semester.value) {
      toast.error('Semester is required');
      return false;
    }

    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!handleInputValidation()) {
      return;
    }

    try {
      setProcessing(true);
      const response = await StudentService.updateStudent(
        studentId,
        studentName,
        indexNumber,
        studentEmail,
        userName,
        departmentList.indexOf(department.value) + 1,
        semesterList.indexOf(semester.value) + 1,
        StudentRole
      );
      if (response.status === 200) {
        toast.success('Successfully Updated.');
        setUpdateSuccess(true);
        handleCloseUpdateStudentWindow();
        handleReloadStudentList();
      } else if (response.status === 400) {
        toast.error(response.data);
      }
    } catch (error) {
      console.error('Update failed', error);
      toast.error('Error In Updating Student.');
    } finally {
      setProcessing(false);
    }
  };

  return (
    <div className="student-signup-main-container">
      <div className="student-create-title-close-button">
        <h3 className="student-create-title">Update Student</h3>
        <div className="student-create-close-button" onClick={handleCloseUpdateStudentWindow}>
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
                  placeholder="Enter Student name"
                  value={studentName}
                  onChange={(e) => setStudentName(e.target.value)}
                  inputType="text"
                />
              </div>
            </div>
            <div className="student-creation-input">
              <label>Index Number</label>
              <div className="student-creation-input-field">
                <InputField
                  placeholder="Enter Student Index No"
                  value={indexNumber}
                  onChange={(e) => setIndexNumber(e.target.value)}
                  inputType="text"
                />
              </div>
            </div>
            <div className="student-creation-input">
              <label>Student Email</label>
              <div className="student-creation-input-field">
                <InputField
                  placeholder="Enter Student Email"
                  value={studentEmail}
                  onChange={(e) => setStudentEmail(e.target.value)}
                  inputType="text"
                />
              </div>
            </div>
            <div className="student-creation-input">
              <label>Semester</label>
              <div className="student-creation-input-field">
                <Select
                  required
                  placeholder="Enter Semester"
                  value={semester}
                  onChange={(e) => setSemester(e)}
                  options={semesterList.map((sem) => ({
                    value: sem,
                    label: sem,
                  }))}
                />
              </div>
            </div>
            <div className="student-creation-input">
              <label>Department</label>
              <div className="student-creation-input-field">
                <Select
                  required
                  placeholder="Enter Department"
                  value={department}
                  onChange={(e) => setDepartment(e)}
                  options={departmentList.map((department) => ({
                    value: department,
                    label: department,
                  }))}
                />
              </div>
            </div>
            {/* <div className="student-creation-input">
              <label>UserName</label>
              <div className="student-creation-input-field">
                <InputField
                  placeholder="Enter Student UserName"
                  value={userName}
                  onChange={(e) => setUserName(e.target.value)}
                  inputType="text"
                />
              </div>
            </div> */}

            <div className="update-student-buttons-container">
              {processing ? (
                <CircularProgress />
              ) : (
                <button type="submit" className="btn btn-warning update-student-save-button">
                  Save
                </button>
              )}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default UpdateStudentWindow;
