import React, { useEffect, useState } from 'react';
import { FaPlus } from 'react-icons/fa';
import { toast } from 'react-toastify';
import StudentService from '../../api/services/StudentService';
import AppContentCard from '../../components/app-content-card/app-content-card';
import NormalButton from '../../components/buttons/NormalButton';
import WarningPopup from '../../components/warningPopup/WarningPopup';
import CreateStudentWindow from './CreateStudentWindow';
import StudentTable from './student-table';
import './Student.css';
import UpdateStudentWindow from './UpdateStudentWindow';

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
    <div className="row">
      <div className="col">
        <div className="row my-2 justify-content-between">
          <div className="col-auto fs-3 fw-bold ms-4">Student Details</div>
          <div className="col-auto">
            <div className="row align-items-center">
              <div className="col-auto">
                <NormalButton
                  title={'Create Student'}
                  handleClick={() => setStudentCreatePopUpWindow(true)}
                  icon={<FaPlus className="buttonIcon" />}
                />
              </div>
              <div className="col-auto">
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
            </div>
          </div>
        </div>
        <AppContentCard>
          <StudentTable
            handleUpdateStudent={(e) => {
              setSelectedStudent(e);
              setStudentUpdatePopUpWindow(true);
            }}
            handleDeleteStudent={() => setShowDeletePopUpWindow(true)}
            onStudentClick={(e) => handleSelectedStudent(e)}
            studentList={studentList}
            search={search}
          />
        </AppContentCard>
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
    </div>
  );
};

export default StudentDashboard;
