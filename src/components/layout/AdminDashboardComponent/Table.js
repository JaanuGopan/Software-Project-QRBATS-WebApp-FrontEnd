import React, { useState, useEffect } from "react";
import "../../pages/AdminDashboard/AdminDashboard.css";
import { FaEdit } from "react-icons/fa";
import axios from "axios";

const Table = ({ handleUpdateEvent }) => {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    // Fetch the list of events from the API
    axios
      .post("http://localhost:8080/api/v1/event/getallevents")
      .then((res) => {
        console.log(res);
        // Update the component state with the fetched list of events
        setEvents(res.data);
      })
      .catch((err) => {
        console.error("Error fetching events:", err);
      });
  }, []);

  return (
    <div className="tableDesign">
      <table className="tableArrangement">
        <thead>
          <tr>
            <th>No</th>
            <th className="expand">Name</th>
            <th>Start Date</th>
            <th>End Date</th>
            <th>Venue</th>
            <th>Start Time</th>
            <th>End Time</th>
            <th>Edit</th>
          </tr>
        </thead>
        <tbody>
          {events.map((event, index) => (
            <tr key={index}>
              <td>{index + 1}</td>
              <td>{event.eventName}</td>
              <td>{event.eventDate}</td>
              <td>{event.eventValidDate}</td>
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
