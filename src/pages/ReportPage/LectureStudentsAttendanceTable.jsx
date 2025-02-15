import React, { useEffect, useState } from 'react';
import { AiOutlineClose } from 'react-icons/ai';
import { FaCheck } from 'react-icons/fa6';
import './report-table.css';

const LectureStudentsAttendanceTable = ({ search, attendanceList }) => {
  const [attendance, setAttendance] = useState([]);
  const [selectedAttendance, setSelectedAttendance] = useState(null);

  useEffect(() => {
    setAttendance(attendanceList);
  }, [attendanceList]);

  const handleAttendanceClick = (attendance) => {
    setSelectedAttendance(attendance);
  };

  return (
    <div className="report-table-container">
      <table className="table table-hover">
        <thead className="sticky-header">
          <tr className="report-table-table-header-row">
            <th className="col">No</th>
            <th className="col">Student Name</th>
            <th className="col">Registration Number</th>
            <th className="col">Attendance Date</th>
            <th className="col">Attendance Time</th>
            <th className="col">Attendance Status</th>
          </tr>
        </thead>

        {attendanceList.filter(
          (attendance) =>
            attendance.studentName.toLowerCase().includes(search.toLowerCase()) ||
            attendance.studentIndexNumber.toLowerCase().includes(search.toLowerCase())
        ).length > 0 ? (
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
                  className={
                    'report-table-row' +
                    (selectedAttendance === attendance ? ' report-table-selected-row' : '')
                  }
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
        ) : (
          <tbody className="nodata">No Data Available</tbody>
        )}
      </table>
    </div>
  );
};

export default LectureStudentsAttendanceTable;
