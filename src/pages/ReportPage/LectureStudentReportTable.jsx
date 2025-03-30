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
import './report-table.css';

const LectureStudentReportTable = ({
  onStudentReportClick,
  lectureReportList,
  search,
  lecture,
}) => {
  const [selectedLectureReport, setSelectedLectureReport] = useState(null);
  const [order, setOrder] = useState('asc');
  const [orderBy, setOrderBy] = useState('index');
  const [filteredReports, setFilteredReports] = useState(lectureReportList);

  useEffect(() => {
    setFilteredReports(
      lectureReportList.filter(
        (report) =>
          report.studentName.toLowerCase().includes(search.toLowerCase()) ||
          report.indexNumber.toLowerCase().includes(search.toLowerCase())
      )
    );
  }, [lectureReportList, search]);

  const handleLectureReportClick = (e) => {
    setSelectedLectureReport(e);
  };

  const handleRequestSort = (property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const sortedReports = filteredReports.sort((a, b) => {
    if (orderBy === 'index') {
      return order === 'asc' ? a.index - b.index : b.index - a.index;
    } else {
      return order === 'asc'
        ? a[orderBy]?.localeCompare(b[orderBy])
        : b[orderBy]?.localeCompare(a[orderBy]);
    }
  });

  // 📌 Export Table to Excel
  const exportToExcel = () => {
    const wb = XLSX.utils.book_new();
    const wsData = [
      ['No', 'Index Number', 'Student Name', 'Attended Date', 'Attended Time', 'Attendance Status'],
      ...sortedReports.map((report, index) => [
        index + 1,
        report.indexNumber,
        report.studentName,
        report.attendedDate || '-',
        report.attendedTime || '-',
        report.attendanceStatus === 'ABSENT' ? 'Absent' : 'Present',
      ]),
    ];
    const ws = XLSX.utils.aoa_to_sheet(wsData);
    XLSX.utils.book_append_sheet(wb, ws, 'Lecture Report');
    XLSX.writeFile(wb, `Lecture_Report_${lecture.lectureDate}.xlsx`);
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
                { id: 'attendedDate', label: 'Attended Date' },
                { id: 'attendedTime', label: 'Attended Time' },
                { id: 'attendanceStatus', label: 'Attendance Status' },
              ].map((column) => (
                <TableCell
                  key={column.id}
                  sortDirection={orderBy === column.id ? order : false}
                  style={{ fontWeight: 'bold' }}
                >
                  <TableSortLabel
                    active={orderBy === column.id}
                    direction={orderBy === column.id ? order : 'asc'}
                    onClick={() => handleRequestSort(column.id)}
                  >
                    {column.label}
                  </TableSortLabel>
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {sortedReports.length > 0 ? (
              sortedReports.map((report, index) => (
                <TableRow
                  key={index}
                  onClick={() => handleLectureReportClick(report)}
                  selected={selectedLectureReport === report}
                >
                  <TableCell>{index + 1}</TableCell>
                  <TableCell>{report.indexNumber}</TableCell>
                  <TableCell>{report.studentName}</TableCell>
                  <TableCell>{report.attendedDate ? report.attendedDate : '-'}</TableCell>
                  <TableCell>{report.attendedTime ? report.attendedTime : '-'}</TableCell>
                  <TableCell align="center">
                    {report.attendanceStatus === 'ABSENT' ? (
                      <Close style={{ color: 'red' }} />
                    ) : (
                      <Done style={{ color: 'green' }} />
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
      {lectureReportList.length > 0 && (
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

export default LectureStudentReportTable;
