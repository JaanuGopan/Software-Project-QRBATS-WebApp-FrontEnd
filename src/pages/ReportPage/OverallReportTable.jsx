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
import React, { useState } from 'react';
import * as XLSX from 'xlsx';
import './report-table.css';

const OverallReportTable = ({ search, studentAttendanceDetails, lectureList }) => {
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [order, setOrder] = useState('asc');
  const [orderBy, setOrderBy] = useState('studentName');

  const handleRequestSort = (property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const sortedStudents = [...studentAttendanceDetails]
    .filter(
      (details) =>
        details.studentName.toLowerCase().includes(search.toLowerCase()) ||
        details.indexNumber.toLowerCase().includes(search.toLowerCase())
    )
    .sort((a, b) => {
      if (a[orderBy] < b[orderBy]) return order === 'asc' ? -1 : 1;
      if (a[orderBy] > b[orderBy]) return order === 'asc' ? 1 : -1;
      return 0;
    });

  // 📌 Export Table to Excel
  const exportToExcel = () => {
    const wb = XLSX.utils.book_new();
    const wsData = [
      [
        'No',
        'Index Number',
        'Student Name',
        'Finished Lectures',
        'Attended Lectures',
        'Attendance %',
        ...lectureList.map((lec) => lec.lectureDate),
      ],
      ...sortedStudents.map((details, index) => [
        index + 1,
        details.indexNumber,
        details.studentName,
        details.finishedLectureCount,
        details.attendanceCount,
        `${Number(details.attendancePercentage).toFixed(2)} %`,
        ...lectureList.map((lecture) =>
          details.attendedLectureIdList.includes(lecture.id) ? 'Present' : 'Absent'
        ),
      ]),
    ];
    const ws = XLSX.utils.aoa_to_sheet(wsData);
    XLSX.utils.book_append_sheet(wb, ws, 'Attendance Report');
    XLSX.writeFile(wb, `Attendance_Report_${lectureList[0].moduleCode}.xlsx`);
  };

  return (
    <div className="table-container">
      <TableContainer component={Paper}>
        <Table stickyHeader>
          <TableHead>
            <TableRow>
              {[
                { id: 'index', label: 'No' },
                { id: 'indexNumber', label: 'Index Number' },
                { id: 'studentName', label: 'Student Name' },
                { id: 'finishedLectureCount', label: 'Finished Lectures' },
                { id: 'attendedLectureCount', label: 'Attended Lectures' },
                { id: 'attendancePercentage', label: 'Attendance Percentage' },
                ...lectureList.map((lecture, index) => ({
                  id: `lecture_${index}`,
                  label: lecture.lectureDate,
                })),
              ].map((column) => (
                <TableCell
                  key={column.id}
                  style={{
                    fontWeight: 'bold',
                    textAlign:
                      column.id === 'attendancePercentage' ||
                      column.id === 'finishedLectureCount' ||
                      column.id === 'attendedLectureCount'
                        ? 'center'
                        : 'left',
                    whiteSpace: 'nowrap',
                  }}
                >
                  {column.id !== 'index' ? (
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
            {sortedStudents.length > 0 ? (
              sortedStudents.map((details, index) => (
                <TableRow
                  key={index}
                  onClick={() => setSelectedStudent(details)}
                  selected={selectedStudent === details}
                >
                  <TableCell>{index + 1}</TableCell>
                  <TableCell>{details.indexNumber}</TableCell>
                  <TableCell>{details.studentName}</TableCell>
                  <TableCell style={{ textAlign: 'center' }}>
                    {details.finishedLectureCount}
                  </TableCell>
                  <TableCell style={{ textAlign: 'center' }}>{details.attendanceCount}</TableCell>
                  <TableCell
                    style={{
                      textAlign: 'center',
                      color: details.attendancePercentage < 80 ? 'red' : 'green',
                    }}
                  >
                    {Number(details.attendancePercentage).toFixed(2) || 0} %
                  </TableCell>
                  {lectureList.map((lecture, lectureIndex) => (
                    <TableCell style={{ textAlign: 'center' }} key={lectureIndex}>
                      {details.attendedLectureIdList.includes(lecture.id) ? (
                        <Done style={{ color: 'green' }} />
                      ) : (
                        <Close style={{ color: 'red' }} />
                      )}
                    </TableCell>
                  ))}
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
      {lectureList.length > 0 && (
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

export default OverallReportTable;
