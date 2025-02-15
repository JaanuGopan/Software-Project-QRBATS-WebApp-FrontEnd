import React, { useState } from 'react';
import './report-table.css';

const OverallReportTable = ({ search, studentAttendanceDetails }) => {
  const [selectedStudent, setSelectedStudent] = useState(null);

  return (
    <div className="report-table-container">
      <table className="table table-hover">
        <thead className="sticky-header">
          <tr className="report-table-table-header-row">
            <th className="col">No</th>
            <th className="col">Student Name</th>
            <th className="col">Registration Number</th>
            <th className="col">Attended Lecture</th>
            <th className="col">Attendance Percentage</th>
          </tr>
        </thead>

        {studentAttendanceDetails.filter(
          (details) =>
            details.studentName.toLowerCase().includes(search.toLowerCase()) ||
            details.indexNumber.toLowerCase().includes(search.toLowerCase())
        ).length > 0 ? (
          <tbody>
            {studentAttendanceDetails
              .filter(
                (details) =>
                  details.studentName.toLowerCase().includes(search.toLowerCase()) ||
                  details.indexNumber.toLowerCase().includes(search.toLowerCase())
              )
              .map((details, index) => (
                <tr
                  key={index}
                  className={
                    'report-table-row' +
                    (selectedStudent === details ? ' report-table-selected-row' : '')
                  }
                >
                  <td>{index + 1}</td>
                  <td>{details.studentName}</td>
                  <td>{details.indexNumber}</td>
                  <td>
                    {details.attendedLectureCount} /{' '}
                    {details.attendedLectureCount + details.missedLectureCount}
                  </td>
                  <td>{Number(details.attendancePercentage).toFixed(2) || 0} %</td>
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

export default OverallReportTable;
