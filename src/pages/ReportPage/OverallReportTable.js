import React, { useEffect, useState } from "react";
import "../../pages/AdminDashboard/AdminDashboard.css";

const OverallReportTable = ({ search, studentAttendanceDetails }) => {
  const [selectedStudent, setSelectedStudent] = useState(null);

  return (
    <div className="tableDesign">
      <table className="student-tableArrangement">
        <thead>
          <tr>
            <th>No</th>
            <th className="expand">Student Name</th>
            <th>Registration Number</th>
            <th>Attended Lecture</th>
            <th>Attendance Percentage</th>
          </tr>
        </thead>

        <tbody>
          {studentAttendanceDetails
            .filter(
              (details) =>
                details.studentName
                  .toLowerCase()
                  .includes(search.toLowerCase()) ||
                details.indexNumber.toLowerCase().includes(search.toLowerCase())
            )
            .map((details, index) => (
              <tr
                key={index}
                className={
                  selectedStudent === details ? "selected-row" : "event-row"
                }
              >
                <td>{index + 1}</td>
                <td>{details.studentName}</td>
                <td>{details.indexNumber}</td>
                <td>
                  {details.attendedLectureCount} /{" "}
                  {details.attendedLectureCount + details.missedLectureCount}
                </td>
                <td>{details.attendancePercentage} %</td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
};

export default OverallReportTable;
