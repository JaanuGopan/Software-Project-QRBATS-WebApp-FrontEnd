import React, { useState, useEffect } from "react";
import "../../../pages/AdminDashboard/AdminDashboard.css";
import { FaEdit } from "react-icons/fa";

const Table = ({ search, handleUpdateEvent, onEventClick, eventList }) => {
  const [events, setEvents] = useState([]);
  const [selectedEvent, setSelectedEvent] = useState(null);

  useEffect(() => {
    // Update events whenever eventList prop changes
    setEvents(eventList);
  }, [eventList]);

  const handleEventClick = (event) => {
    setSelectedEvent(event);
    onEventClick(event);
  };

  return (
    <div className="tableDesign">
      <table className="tableArrangement">
        <thead>
          <tr>
            <th>No</th>
            <th className="expand">Name</th>
            <th>Start Date</th>
            <th>Venue</th>
            <th>Start Time</th>
            <th>End Time</th>
            <th>Edit</th>
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
                <td>{event.eventVenue}</td>
                <td>{event.eventTime}</td>
                <td>{event.eventEndTime}</td>
                <td>
                  <button
                    onClick={() => handleUpdateEvent(event)}
                    className="EditButton"
                  >
                    <FaEdit className="EditIcon" />
                  </button>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
