import React, { useState } from "react";
import "./Student.css";
import { useNavigate } from "react-router-dom";
import InputField from "../../components/textfields/InputBox/InputField";
import { IoMdCloseCircleOutline } from "react-icons/io";
import Select from "react-select";
import StudentService from "../../api/services/StudentService";
import { ToastContainer, toast } from "react-toastify";

const UpdateStudentWindow = ({
  handleCloseUpdateStudentWindow,
  student,
  handleReloadStudentList,
}) => {
  const [studentId, setStudentId] = useState(student.studentId);
  const [indexNumber, setIndexNumber] = useState(student.indexNumber);
  const [studentName, setStudentName] = useState(student.studentName);
  const [studentEmail, setStudentEmail] = useState(student.studentEmail);
  const [password, setPassword] = useState(student.password);
  const [userName, setUserName] = useState(student.username);
  const [StudentRole, setStudentRole] = useState(student.studentRole);
  const [departmentId, setDepartmentId] = useState(student.departmentId);
  const departmentList = ["DEIE", "DCOM", "DMME", "DCEE", "DMENA", "DIS"];

  const [department, setDepartment] = useState({
    value: departmentList[student.departmentId - 1],
    label: departmentList[student.departmentId - 1],
  });
  const semesterList = ["1", "2", "3", "4", "5", "6", "7", "8"];
  const [semester, setSemester] = useState({
    value: semesterList[student.currentSemester - 1],
    label: semesterList[student.currentSemester - 1],
  });

  const [updateSuccess, setUpdateSuccess] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await StudentService.updateStudent(
        studentId,
        studentName,
        indexNumber,
        studentEmail,
        userName,
        departmentList.indexOf(department.value) + 1,
        semesterList.indexOf(semester.value) + 1
      );
      if (response.status === 200) {
        toast.success("Successfully Updated.");
        setUpdateSuccess(true);
      } else {
        toast.error(response);
      }
    } catch (error) {
      console.error("Login failed", error);
    } finally {
      handleReloadStudentList();
      if (updateSuccess) {
        handleCloseUpdateStudentWindow();
      }
    }
  };

  return (
    <div className="student-signup-main-container">
      <ToastContainer />
      <div className="student-create-title-close-button">
        <h3 className="student-create-title">Update Student</h3>
        <div
          className="student-create-close-button"
          onClick={handleCloseUpdateStudentWindow}
        >
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
              <label>IndexNumber</label>
              <div className="student-creation-input-field">
                <InputField
                  placeholder="Enter Student IndexNo"
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
                  placeholder="Enter Department"
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
              <button
                type="submit"
                className="btn btn-warning update-student-save-button"
              >
                Save
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default UpdateStudentWindow;
