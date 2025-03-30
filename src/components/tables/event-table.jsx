import {
  IconButton,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TableSortLabel,
} from '@mui/material';
import React, { useState } from 'react';
import { FaEdit } from 'react-icons/fa';
import { MdDeleteForever } from 'react-icons/md';
import './table.css';

const EventTable = ({ eventList, onEventClick, search, handleUpdateEvent, handleEventDelete }) => {
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [order, setOrder] = useState('asc');
  const [orderBy, setOrderBy] = useState('eventName');

  const handleEventClick = (event) => {
    onEventClick(event);
    setSelectedEvent(event);
  };

  const handleRequestSort = (property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const sortedEvents = [...eventList]
    .filter(
      (event) =>
        event.name.toLowerCase().includes(search.toLowerCase()) ||
        event.locationName.toLowerCase().includes(search.toLowerCase())
    )
    .sort((a, b) => {
      if (a[orderBy] < b[orderBy]) return order === 'asc' ? -1 : 1;
      if (a[orderBy] > b[orderBy]) return order === 'asc' ? 1 : -1;
      return 0;
    });

  return (
    <TableContainer component={Paper} className="table-container">
      <Table stickyHeader>
        <TableHead>
          <TableRow>
            {[
              { id: 'index', label: 'No' },
              { id: 'name', label: 'Name' },
              { id: 'lectureDate', label: 'Date' },
              { id: 'locationName', label: 'Venue' },
              { id: 'lectureStartTime', label: 'Start Time' },
              { id: 'lectureEndTime', label: 'End Time' },
              { id: 'actions', label: 'Actions' },
            ].map((column) => (
              <TableCell key={column.id} style={{ fontWeight: 'bold' }}>
                {column.id !== 'actions' ? (
                  <TableSortLabel
                    active={orderBy === column.id}
                    direction={orderBy === column.id ? order : 'asc'}
                    onClick={() => handleRequestSort(column.id)}
                  >
                    {column.label}
                  </TableSortLabel>
                ) : (
                  column.label
                )}
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {sortedEvents.length > 0 ? (
            sortedEvents.map((event, index) => (
              <TableRow
                key={index}
                onClick={() => handleEventClick(event)}
                selected={selectedEvent === event}
              >
                <TableCell>{index + 1}</TableCell>
                <TableCell>{event.name}</TableCell>
                <TableCell className="text-nowrap">{event.lectureDate}</TableCell>
                <TableCell>{event.locationName}</TableCell>
                <TableCell>{event.lectureStartTime}</TableCell>
                <TableCell>{event.lectureEndTime}</TableCell>
                <TableCell className="text-nowrap">
                  <IconButton onClick={() => handleUpdateEvent(event)}>
                    <FaEdit color="#0063a0" size={'20px'} />
                  </IconButton>
                  <IconButton onClick={() => handleEventDelete(event)}>
                    <MdDeleteForever color="#f01e2c" size={'20px'} />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={7} align="center">
                No Data Available
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default EventTable;
