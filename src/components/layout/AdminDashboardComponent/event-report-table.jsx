import {
  CircularProgress,
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
  const [loadingEventReport, setLoadingEventReport] = useState(false);
  const [order, setOrder] = useState('asc');
  const [orderBy, setOrderBy] = useState('eventName');

  useEffect(() => {
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
    await FetchAttendanceByEventIdService.fetchEventAttendance(eventId)
      .then((attendanceList) => {
        setAttendanceList(attendanceList);
        handleAttendanceList(attendanceList);
        handleOpenReportWindow(attendanceList);
      })
      .catch((error) => {
        console.error('Error fetching attendance:', error);
      });
  };

  const handleViewEventAttendance = async (eventId) => {
    try {
      setLoadingEventReport(true);
      await handleReloadAttendanceList(eventId);
    } finally {
      setLoadingEventReport(false);
    }
  };

  const handleRequestSort = (property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const sortedEvents = [...events]
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
              { id: 'eventName', label: 'Name' },
              { id: 'eventDate', label: 'Start Date' },
              { id: 'eventVenue', label: 'Venue' },
              { id: 'eventTime', label: 'Start Time' },
              { id: 'eventEndTime', label: 'End Time' },
              { id: 'actions', label: 'View' },
            ].map((column) => (
              <TableCell
                key={column.id}
                style={{
                  fontWeight: 'bold',
                  ...(column.id === 'actions' && { textAlign: 'center' }),
                }}
              >
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
                <TableCell>{event.lectureDate}</TableCell>
                <TableCell>{event.locationName}</TableCell>
                <TableCell>{event.lectureStartTime}</TableCell>
                <TableCell>{event.lectureEndTime}</TableCell>
                <TableCell className="text-nowrap">
                  {loadingEventReport ? (
                    <CircularProgress />
                  ) : (
                    <IconButton onClick={() => handleViewEventAttendance(event.id)}>
                      <CiViewList className="EditIcon" />
                    </IconButton>
                  )}
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

export default EventReportTable;
