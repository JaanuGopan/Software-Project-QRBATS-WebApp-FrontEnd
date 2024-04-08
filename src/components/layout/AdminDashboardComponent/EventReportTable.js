import React, { useState, useEffect } from "react";
import "../../../pages/AdminDashboard/AdminDashboard.css";
import { CiViewList } from "react-icons/ci";
import axios from "axios";
import FetchAttendanceByEventIdService from "../../../api/services/FetchAttendanceByEventIdService";

const EventReportTable = ({
  handleOpenReportWindow,
  search,
  onEventClick,
  eventList,
  attendedStudentList,
}) => {
  const [events, setEvents] = useState([]);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [attendanceList, setAttendanceList] = useState([]);

  useEffect(() => {
    // Update events whenever eventList prop changes
    setEvents(eventList);
  }, [eventList]);

  const handleEventClick = (event) => {
    setSelectedEvent(event);
    onEventClick(event);
  };

  const handleAttendanceList = (attendanceStudentList) => {
    setAttendanceList(attendanceStudentList);
    attendedStudentList(attendanceStudentList);
  };

  const handleReloadAttendanceList = async (eventId) => {
    FetchAttendanceByEventIdService.fetchAttendance(eventId)
      .then((attendanceList) => {
        setAttendanceList(attendanceList);
        handleAttendanceList(attendanceList);
        handleOpenReportWindow();
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
          {events
            .filter(
              (event) =>
                event.eventName.toLowerCase().includes(search.toLowerCase()) ||
                event.eventVenue.toLowerCase().includes(search.toLowerCase())
            )
            .map((event, index) => (
              <tr
                key={index}
                onClick={() => handleEventClick(event)}
                className={
                  selectedEvent === event ? "selected-row" : "event-row"
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

export default EventReportTable;
