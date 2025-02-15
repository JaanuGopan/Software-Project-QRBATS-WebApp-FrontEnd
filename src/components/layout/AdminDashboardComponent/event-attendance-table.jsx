import React, { useEffect, useState } from 'react';
import { AiOutlineClose } from 'react-icons/ai';
import { FaCheck } from 'react-icons/fa';
import '../../../components/tables/table.css';

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
    <div className="table-container">
      <table className="table table-hover">
        <thead className="sticky-header">
          <tr className="table-header-row">
            <th className="col">No</th>
            <th className="col">Student Name</th>
            <th className="col">Registration Number</th>
            <th className="col">Attendance Date</th>
            <th className="col">Attendance Time</th>
            <th className="col">Attendance Status</th>
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
                  className={
                    'table-row' + (selectedAttendance === attendance ? ' table-selected-row' : '')
                  }
                >
                  <td>{index + 1}</td>
                  <td>{attendance.studentName}</td>
                  <td>{attendance.indexNumber}</td>
                  <td>{attendance.attendedDate}</td>
                  <td>{attendance.attendedTime}</td>
                  <td>
                    <div className="row">
                      {attendance.attendanceStatus ? (
                        <FaCheck color="green" />
                      ) : (
                        <AiOutlineClose color="red" />
                      )}
                    </div>
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
