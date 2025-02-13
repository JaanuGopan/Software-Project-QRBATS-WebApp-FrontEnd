import React, { useState, useEffect } from 'react';
import '../../../pages/AdminDashboard/AdminDashboard.css';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import { FaCheck } from 'react-icons/fa';
import { AiOutlineClose } from 'react-icons/ai';

const EventAttendanceTable = ({ search, attendanceList, handleGeneratePDF }) => {
  const [attendance, setAttendance] = useState([]);
  const [selectedAttendance, setSelectedAttendance] = useState(null);

  useEffect(() => {
    // Update events whenever eventList prop changes
    setAttendance(attendanceList);
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

        {attendance.filter(
          (attendance) =>
            attendance.studentName.toLowerCase().includes(search.toLowerCase()) ||
            attendance.indexNumber.toLowerCase().includes(search.toLowerCase())
        ).length > 0 ? (
          <tbody>
            {attendance
              .filter(
                (attendance) =>
                  attendance.studentName.toLowerCase().includes(search.toLowerCase()) ||
                  attendance.indexNumber.toLowerCase().includes(search.toLowerCase())
              )
              .map((attendance, index) => (
                <tr
                  key={index}
                  className={selectedAttendance === attendance ? 'selected-row' : 'event-row'}
                >
                  <td>{index + 1}</td>
                  <td>{attendance.studentName}</td>
                  <td>{attendance.indexNumber}</td>
                  <td>{attendance.attendedDate}</td>
                  <td>{attendance.attendedTime}</td>
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
        ) : (
          <tbody className="nodata">No Data Available</tbody>
        )}
      </table>
    </div>
  );
};

export default EventAttendanceTable;
