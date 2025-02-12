import React, { useEffect, useState } from 'react';
import './Student.css';
import NormalButton from '../../components/layout/AdminDashboardComponent/NormalButton';
import { MdCreateNewFolder } from 'react-icons/md';
import { RiDeleteBin5Fill } from 'react-icons/ri';
import StudentTable from './StudentTable';
import CreateStudentWindow from './CreateStudentWindow';
import UpdateStudentWindow from './UpdateStudentWindow';
import StudentService from '../../api/services/StudentService';
import WarningPopup from '../../components/warningPopup/WarningPopup';
import { ToastContainer, toast } from 'react-toastify';

const StudentDashboard = () => {
  const [studentCreatePopUpWindow, setStudentCreatePopUpWindow] = useState(false);
  const [studentUpdatePopUpWindow, setStudentUpdatePopUpWindow] = useState(false);
  const [showDeletePopUpWindow, setShowDeletePopUpWindow] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [studentList, setStudentList] = useState([]);
  const [search, setSearch] = useState('');

  const handleSelectedStudent = (student) => {
    setSelectedStudent(student);
  };

  const handleReloadStudentList = async () => {
    const response = await StudentService.getAllStudent();
    if (response) {
      setStudentList(response);
    }
  };

  useEffect(() => {
    handleReloadStudentList();
  }, []);

  const [processingDeleteStudent, setProcessingDeleteStudent] = useState(false);
  const handelDeleteStudent = async () => {
    try {
      setProcessingDeleteStudent(true);
      const response = await StudentService.deleteStudent(selectedStudent.userId);
      if (response) {
        handleReloadStudentList();
        setShowDeletePopUpWindow(false);
        toast.success('Successfully Deleted.');
        setSelectedStudent(null);
      }
    } finally {
      setProcessingDeleteStudent(false);
    }
  };

  return (
    <div className="student-Dash">
      <ToastContainer />
      <div className="student-SearchEvent">
        <p className="student-mainHead">Student Details</p>
        <input
          type="text"
          placeholder="Search..."
          style={{
            width: '150px',
            padding: '3px 40px',
            border: '0.5px solid black',
            borderRadius: '5px',
            textAlign: 'center',
          }}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>
      <div className="student-EventList">
        <StudentTable
          handleUpdateStudent={(e) => {
            setSelectedStudent(e);
            setStudentUpdatePopUpWindow(true);
          }}
          onStudentClick={(e) => handleSelectedStudent(e)}
          studentList={studentList}
          search={search}
        />
        <div className="student-List-Buttons">
          <NormalButton
            handleClick={() => setStudentCreatePopUpWindow(true)}
            title={'Create'}
            titlewithiconicon={<MdCreateNewFolder className="student-buttonIcon" />}
          />
          <NormalButton
            title={'Delete'}
            titlewithiconicon={<RiDeleteBin5Fill className="student-buttonIcon" />}
            handleClick={() => {
              if (!selectedStudent) {
                toast.error('Please select a student to delete.');
              } else {
                setShowDeletePopUpWindow(true);
              }
            }}
          />
        </div>
      </div>
      {studentCreatePopUpWindow && (
        <div className="student-Create-Event-Dashboard">
          <CreateStudentWindow
            handleCloseCreateStudentWindow={() => setStudentCreatePopUpWindow(false)}
            handleReloadStudentList={handleReloadStudentList}
          />
        </div>
      )}
      {studentUpdatePopUpWindow && (
        <div className="student-Create-Event-Dashboard">
          <UpdateStudentWindow
            handleCloseUpdateStudentWindow={() => setStudentUpdatePopUpWindow(false)}
            student={selectedStudent}
            handleReloadStudentList={handleReloadStudentList}
          />
        </div>
      )}
      {showDeletePopUpWindow && selectedStudent && (
        <div className="student-creation-delete-popup-window">
          <WarningPopup
            handleOk={handelDeleteStudent}
            handleCloseWarningWindow={() => setShowDeletePopUpWindow(false)}
            buttonText={'Delete'}
            titleText={'Are you sure you want to delete this student?'}
            processing={processingDeleteStudent}
          />
        </div>
      )}
    </div>
  );
};

export default StudentDashboard;
