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
import React, { useState } from 'react';
import { CiViewList } from 'react-icons/ci';
import './report-table.css';

const LectureReportTable = ({
  handleOpenLectureReport,
  searchLecturesReport,
  onLecturesReportClick,
  lecturesReportList,
}) => {
  const [selectedLectureReport, setSelectedLectureReport] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [order, setOrder] = useState('asc');
  const [orderBy, setOrderBy] = useState('name');

  const handleLectureReportClick = (e) => {
    setSelectedLectureReport(e);
    onLecturesReportClick(e);
  };

  const openLectureReport = async (lectureId) => {
    try {
      setIsLoading(true);
      await handleOpenLectureReport(lectureId);
    } finally {
      setIsLoading(false);
    }
  };

  const handleRequestSort = (property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const filteredLectures = lecturesReportList
    .filter(
      (lecture) =>
        lecture.name.toLowerCase().includes(searchLecturesReport.toLowerCase()) ||
        lecture.lectureDate.toLowerCase().includes(searchLecturesReport.toLowerCase())
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
              { id: 'lectureDate', label: 'Date' },
              { id: 'locationName', label: 'Venue' },
              { id: 'lectureStartTime', label: 'Start Time' },
              { id: 'lectureEndTime', label: 'End Time' },
              { id: 'actions', label: 'View' },
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
          {filteredLectures.length > 0 ? (
            filteredLectures.map((lecture, index) => (
              <TableRow
                key={index}
                onClick={() => handleLectureReportClick(lecture)}
                selected={selectedLectureReport === lecture}
              >
                <TableCell>{index + 1}</TableCell>
                <TableCell>{lecture.lectureDate}</TableCell>
                <TableCell>{lecture.locationName}</TableCell>
                <TableCell>{lecture.lectureStartTime}</TableCell>
                <TableCell>{lecture.lectureEndTime}</TableCell>
                <TableCell>
                  <IconButton onClick={() => openLectureReport(lecture.id)}>
                    {isLoading && selectedLectureReport?.id === lecture.id ? (
                      <CircularProgress size={20} />
                    ) : (
                      <CiViewList style={{ color: '#0063a0' }} />
                    )}
                  </IconButton>
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={9} align="center">
                No Data Available
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default LectureReportTable;
