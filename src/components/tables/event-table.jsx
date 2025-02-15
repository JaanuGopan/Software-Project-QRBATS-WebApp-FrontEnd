import { IconButton } from '@mui/material';
import React, { useState } from 'react';
import { FaEdit } from 'react-icons/fa';
import { MdDeleteForever } from 'react-icons/md';
import '../tables/table.css';

const EventTable = ({ eventList, onEventClick, search, handleUpdateEvent, handleEventDelete }) => {
  const [selectedEvent, setSelectedEvent] = useState(null);

  const handleEventClick = (event) => {
    onEventClick(event);
    setSelectedEvent(event);
  };

  return (
    <div className="table-container">
      <table className="table table-hover">
        <thead className="sticky-header">
          <tr className="table-header-row">
            <th className="col">No</th>
            <th className="col">Name</th>
            <th className="col">Date</th>
            <th className="col">Venue</th>
            <th className="col">Start Time</th>
            <th className="col">End Time</th>
            <th className="col">Actions</th>
          </tr>
        </thead>
        {eventList.filter(
          (event) =>
            event.eventName.toLowerCase().includes(search.toLowerCase()) ||
            event.eventVenue.toLowerCase().includes(search.toLowerCase())
        ).length > 0 ? (
          <tbody>
            {eventList
              .filter(
                (event) =>
                  event.eventName.toLowerCase().includes(search.toLowerCase()) ||
                  event.eventVenue.toLowerCase().includes(search.toLowerCase())
              )
              .map((event, index) => (
                <tr
                  key={index}
                  onClick={() => handleEventClick(event)}
                  className={'table-row' + (selectedEvent === event ? ' table-selected-row' : '')}
                >
                  <td>{index + 1}</td>
                  <td>{event.eventName}</td>
                  <td>{event.eventDate}</td>
                  <td>{event.eventVenue}</td>
                  <td>{event.eventTime}</td>
                  <td>{event.eventEndTime}</td>
                  <td>
                    <div className="row table-action-icons">
                      <div className="col px-0 d-flex justify-content-center align-items-center">
                        <IconButton onClick={() => handleUpdateEvent(event)}>
                          <FaEdit color="#0063a0" size={'20px'} />
                        </IconButton>
                      </div>
                      <div className="col ps-0  d-flex justify-content-center align-items-center">
                        <IconButton onClick={() => handleEventDelete(event)}>
                          <MdDeleteForever color="#f01e2c" size={'20px'} />
                        </IconButton>
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
export default EventTable;
