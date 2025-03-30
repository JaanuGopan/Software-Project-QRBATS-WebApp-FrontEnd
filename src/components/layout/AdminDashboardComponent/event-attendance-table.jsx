import { Close, Done } from '@mui/icons-material';
import {
  Button,
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
import * as XLSX from 'xlsx';
import '../../../components/tables/table.css';

const EventAttendanceTable = ({ search, attendanceList }) => {
  const [attendance, setAttendance] = useState([]);
  const [selectedAttendance, setSelectedAttendance] = useState(null);
  const [order, setOrder] = useState('asc');
  const [orderBy, setOrderBy] = useState('studentName');

  useEffect(() => {
    setAttendance(attendanceList);
  }, [attendanceList]);

  const handleRequestSort = (property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const filteredAttendance = attendance
    .filter(
      (attendance) =>
        attendance.studentName.toLowerCase().includes(search.toLowerCase()) ||
        attendance.indexNumber.toLowerCase().includes(search.toLowerCase())
    )
    .sort((a, b) => {
      if (a[orderBy] < b[orderBy]) return order === 'asc' ? -1 : 1;
      if (a[orderBy] > b[orderBy]) return order === 'asc' ? 1 : -1;
      return 0;
    });

  const exportToExcel = () => {
    const wb = XLSX.utils.book_new();
    const wsData = [
      [
        'No',
        'Student Name',
        'Registration Number',
        'Attendance Date',
        'Attendance Time',
        'Attendance Status',
      ],
      ...filteredAttendance.map((attendance, index) => [
        index + 1,
        attendance.studentName,
        attendance.indexNumber,
        attendance.attendedDate,
        attendance.attendedTime,
        attendance.attendanceStatus ? 'Present' : 'Absent',
      ]),
    ];
    const ws = XLSX.utils.aoa_to_sheet(wsData);
    XLSX.utils.book_append_sheet(wb, ws, 'Event Attendance');
    XLSX.writeFile(wb, 'Event_Attendance_Report.xlsx');
  };

  return (
    <div className="table-container">
      <TableContainer component={Paper}>
        <Table stickyHeader>
          <TableHead>
            <TableRow>
              {[
                { id: 'no', label: 'No' },
                { id: 'studentName', label: 'Student Name' },
                { id: 'indexNumber', label: 'Registration Number' },
                { id: 'attendedDate', label: 'Attendance Date' },
                { id: 'attendedTime', label: 'Attendance Time' },
                { id: 'attendanceStatus', label: 'Attendance Status' },
              ].map((column) => (
                <TableCell
                  key={column.id}
                  style={{
                    fontWeight: 'bold',
                    textAlign: column.id === 'attendanceStatus' ? 'center' : 'left',
                    whiteSpace: 'nowrap',
                  }}
                >
                  {column.id !== 'no' ? (
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
            {filteredAttendance.length > 0 ? (
              filteredAttendance.map((attendance, index) => (
                <TableRow
                  key={index}
                  onClick={() => setSelectedAttendance(attendance)}
                  selected={selectedAttendance === attendance}
                >
                  <TableCell>{index + 1}</TableCell>
                  <TableCell>{attendance.studentName}</TableCell>
                  <TableCell>{attendance.indexNumber}</TableCell>
                  <TableCell>{attendance.attendedDate}</TableCell>
                  <TableCell>{attendance.attendedTime.slice(0, 8)}</TableCell>
                  <TableCell style={{ textAlign: 'center' }}>
                    {attendance.attendanceStatus ? (
                      <Done style={{ color: 'green' }} />
                    ) : (
                      <Close style={{ color: 'red' }} />
                    )}
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={6} align="center">
                  No Data Available
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
      {attendanceList.length > 0 && (
        <div
          className="d-flex justify-content-center mt-2"
          style={{
            position: 'fixed',
            bottom: 0,
            right: 0,
            width: 'auto',
            backgroundColor: 'white',
            marginBottom: '20px',
            marginRight: '20px',
          }}
        >
          <Button
            variant="contained"
            color="primary"
            onClick={exportToExcel}
            style={{ marginRight: 10 }}
          >
            Export to Excel
          </Button>
        </div>
      )}
    </div>
  );
};

export default EventAttendanceTable;
