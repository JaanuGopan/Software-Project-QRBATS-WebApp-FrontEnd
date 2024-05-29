import React, { useState } from "react";
import "../../pages/AdminDashboard/AdminDashboard.css";
import { CiViewList } from "react-icons/ci";
import FetchAttendanceByEventIdService from "../../api/services/FetchAttendanceByEventIdService";

const LectureReportTable = ({
  handleOpenLectureAttendanceReportWindow,
  searchLecturesReport,
  onLecturesReportClick,
  lecturesReportList,
  attendedStudentList,
}) => {
  const [selectedLectureReport, setSelectedLectureReport] = useState(null);
  const [attendanceList, setAttendanceList] = useState([]);

  const handleLectureReportClick = (e) => {
    setSelectedLectureReport(e);
    onLecturesReportClick(e);
  };

  const handleAttendanceList = (attendanceStudentList) => {
    setAttendanceList(attendanceStudentList);
    attendedStudentList(attendanceStudentList);
  };

  const handleReloadAttendanceList = async (eventId) => {
    await FetchAttendanceByEventIdService.fetchAttendance(eventId)
      .then((attendanceList) => {
        setAttendanceList(attendanceList);
        handleAttendanceList(attendanceList);
        handleOpenLectureAttendanceReportWindow();
      })
      .catch((error) => {
        console.error("Error fetching attendance:", error);
      });
  };

  return (
    <div className="tableDesign">
      <table className="event-report-tableArrangement">
        <thead>
          <tr>
            <th>No</th>
            <th className="expand">Name</th>
            <th>Start Date</th>
            <th>End Date</th>
            <th>Venue</th>
            <th>Start Time</th>
            <th>End Time</th>
            <th>View</th>
          </tr>
        </thead>
        <tbody>
          {lecturesReportList
            .filter(
              (event) =>
                event.eventName
                  .toLowerCase()
                  .includes(searchLecturesReport.toLowerCase()) ||
                event.eventVenue
                  .toLowerCase()
                  .includes(searchLecturesReport.toLowerCase())
            )
            .map((event, index) => (
              <tr
                key={index}
                onClick={() => handleLectureReportClick(event)}
                className={
                  selectedLectureReport === event ? "selected-row" : "event-row"
                }
              >
                <td>{index + 1}</td>
                <td>{event.eventName}</td>
                <td>{event.eventDate}</td>
                <td>{event.eventValidDate}</td>
                <td>{event.eventVenue}</td>
                <td>{event.eventTime}</td>
                <td>{event.eventEndTime}</td>
                <td>
                  <button
                    onClick={() => handleReloadAttendanceList(event.eventId)}
                    className="ViewButton"
                  >
                    <CiViewList className="EditIcon" />
                    <p className="ViewButtonLabel">View</p>
                  </button>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
};

export default LectureReportTable;
