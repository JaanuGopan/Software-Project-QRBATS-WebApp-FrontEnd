import { CircularProgress } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { CiViewList } from 'react-icons/ci';
import FetchAttendanceByEventIdService from '../../../api/services/FetchAttendanceByEventIdService';

import './event-report-table.css';

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
    await FetchAttendanceByEventIdService.fetchAttendance(eventId)
      .then((attendanceList) => {
        setAttendanceList(attendanceList);
        handleAttendanceList(attendanceList);
        handleOpenReportWindow();
      })
      .catch((error) => {
        console.error('Error fetching attendance:', error);
      });
  };

  const [loadingEventReport, setLoadingEventReport] = useState(false);
  const handleViewEventAttendance = async (eventId) => {
    try {
      setLoadingEventReport(true);
      await handleReloadAttendanceList(eventId);
    } finally {
      setLoadingEventReport(false);
    }
  };

  return (
    <div className="event-report-table-container">
      <table className="table table-hover">
        <thead className="sticky-header">
          <tr className="event-report-table-table-header-row">
            <th className="col">No</th>
            <th className="col">Name</th>
            <th className="col">Start Date</th>
            <th className="col">Venue</th>
            <th className="col">Start Time</th>
            <th className="col">End Time</th>
            <th className="col">View</th>
          </tr>
        </thead>
        {events.filter(
          (event) =>
            event.eventName.toLowerCase().includes(search.toLowerCase()) ||
            event.eventVenue.toLowerCase().includes(search.toLowerCase())
        ).length > 0 ? (
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
                    'event-report-table-row' +
                    (selectedEvent === event ? ' event-report-table-selected-row' : '')
                  }
                >
                  <td>{index + 1}</td>
                  <td>{event.eventName}</td>
                  <td>{event.eventDate}</td>
                  <td>{event.eventVenue}</td>
                  <td>{event.eventTime}</td>
                  <td>{event.eventEndTime}</td>
                  <td>
                    <div className="row">
                      <div className="col">
                        {loadingEventReport ? (
                          <CircularProgress />
                        ) : (
                          <button
                            onClick={() => handleViewEventAttendance(event.eventId)}
                            className="ViewButton"
                          >
                            <CiViewList className="EditIcon" />
                            <p className="ViewButtonLabel">View</p>
                          </button>
                        )}
                      </div>
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

export default EventReportTable;
