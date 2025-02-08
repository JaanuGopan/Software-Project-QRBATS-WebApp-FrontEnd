import React, { useState, useEffect } from 'react';
import '../../pages/AdminDashboard/AdminDashboard.css';
import { FaCheck } from 'react-icons/fa6';
import { AiOutlineClose } from 'react-icons/ai';

const LectureStudentsAttendanceTable = ({ search, attendanceList }) => {
  const [attendance, setAttendance] = useState([]);
  const [selectedAttendance, setSelectedAttendance] = useState(null);

  useEffect(() => {
    // Update events whenever eventList prop changes
    setAttendance(attendanceList);
    console.log('Attendance report : ', attendanceList);
  }, [attendanceList]);

  const handleAttendanceClick = (attendance) => {
    setSelectedAttendance(attendance);
  };

  return (
    <div className="tableDesign">
      <table className="student-tableArrangement">
        <thead>
          <tr>
            <th>No</th>
            <th className="expand">Student Name</th>
            <th>Registration Number</th>
            <th>Attendance Date</th>
            <th>Attendance Time</th>
            <th>Attendance Status</th>
          </tr>
        </thead>

        <tbody>
          {attendanceList
            .filter(
              (attendance) =>
                attendance.studentName.toLowerCase().includes(search.toLowerCase()) ||
                attendance.studentIndexNumber.toLowerCase().includes(search.toLowerCase())
            )
            .map((attendance, index) => (
              <tr
                key={index}
                className={selectedAttendance === attendance ? 'selected-row' : 'event-row'}
              >
                <td>{index + 1}</td>
                <td>{attendance.studentName}</td>
                <td>{attendance.studentIndexNumber}</td>
                <td>{attendance.attendanceStatus ? attendance.attendedDate : '-'}</td>
                <td>{attendance.attendanceStatus ? attendance.attendedTime : '-'}</td>
                <td>
                  {attendance.attendanceStatus ? (
                    <FaCheck color="green" />
                  ) : (
                    <AiOutlineClose color="red" />
                  )}
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
};

export default LectureStudentsAttendanceTable;
