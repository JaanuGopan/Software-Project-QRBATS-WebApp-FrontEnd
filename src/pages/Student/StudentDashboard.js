import React, { useState } from "react";
import "./Student.css";
import NormalButton from "../../components/layout/AdminDashboardComponent/NormalButton";
import { MdCreateNewFolder } from "react-icons/md";
import { RiDeleteBin5Fill } from "react-icons/ri";
import StudentTable from "../../components/layout/AdminDashboardComponent/StudentTable";
import CreateStudentWindow from "./CreateStudentWindow";
import UpdateStudentWindow from "./UpdateStudentWindow";

const StudentDashboard = () => {
  const [studentCreatePopUpWindow, setStudentCreatePopUpWindow] =
    useState(false);
  const [studentUpdatePopUpWindow, setStudentUpdatePopUpWindow] =
    useState(false);
  const [selectedStudent, setSelectedStudent] = useState(null);

  const handleSelectedStudent = (student) => {
    setSelectedStudent(student);
    console.log(selectedStudent);
  };

  return (
    <div className="student-Dash">
      <div className="student-SearchEvent">
        <p className="student-mainHead">Student Details</p>
        <input
          type="text"
          placeholder="Search..."
          style={{
            width: "150px",
            padding: "3px 40px",
            border: "0.5px solid black",
            borderRadius: "5px",
            textAlign: "center",
          }}
        />
      </div>
      <div className="student-EventList">
        <StudentTable
          handleUpdateStudent={(e) => {
            setSelectedStudent(e);
            setStudentUpdatePopUpWindow(true);
          }}
          selectedStudent={(e) => handleSelectedStudent(e)}
        />
        <div className="student-List-Buttons">
          <NormalButton
            handleClick={() => setStudentCreatePopUpWindow(true)}
            title={"Create"}
            titlewithiconicon={
              <MdCreateNewFolder className="student-buttonIcon" />
            }
          />
          <NormalButton
            title={"Delete"}
            titlewithiconicon={
              <RiDeleteBin5Fill className="student-buttonIcon" />
            }
          />
        </div>
      </div>
      {studentCreatePopUpWindow && (
        <div
          handleClick={() => setStudentCreatePopUpWindow(false)}
          className="student-Create-Event-Dashboard"
        >
          <CreateStudentWindow
            handlecloseCreateStudentWindow={() =>
              setStudentCreatePopUpWindow(false)
            }
          />
        </div>
      )}
      {studentUpdatePopUpWindow && (
        <div
          handleClick={() => setStudentCreatePopUpWindow(false)}
          className="student-Create-Event-Dashboard"
        >
          <UpdateStudentWindow
            handlecloseUpdateStudentWindow={() =>
              setStudentUpdatePopUpWindow(false)
            }
            student={selectedStudent}
          />
        </div>
      )}
    </div>
  );
};

export default StudentDashboard;
