import {
  Button,
  Checkbox,
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
import './lectures-table.css';

const LecturesTable = ({
  lecturesList,
  onLectureClick,
  search,
  handleLectureUpdate,
  handleLectureDelete,
  handleDeleteSelectedLectures,
}) => {
  const [selectedLecture, setSelectedLecture] = useState(null);
  const [order, setOrder] = useState('asc');
  const [orderBy, setOrderBy] = useState('name');
  const [selectedLectures, setSelectedLectures] = useState([]);
  const [selectAll, setSelectAll] = useState(false);

  const handleLectureClick = (clickedLecture) => {
    onLectureClick(clickedLecture);
    setSelectedLecture(clickedLecture);
  };

  const handleRequestSort = (property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleToggleSelect = (lecture) => {
    setSelectedLectures((prevSelected) =>
      prevSelected.includes(lecture)
        ? prevSelected.filter((l) => l !== lecture)
        : [...prevSelected, lecture]
    );
  };

  const handleSelectAll = () => {
    if (selectAll) {
      setSelectedLectures([]);
    } else {
      setSelectedLectures(sortedLectures);
    }
    setSelectAll(!selectAll);
  };

  const sortedLectures = [...lecturesList]
    .filter(
      (lecture) =>
        lecture.name.toLowerCase().includes(search.toLowerCase()) ||
        lecture.moduleCode.toLowerCase().includes(search.toLowerCase())
    )
    .sort((a, b) => {
      if (a[orderBy] < b[orderBy]) return order === 'asc' ? -1 : 1;
      if (a[orderBy] > b[orderBy]) return order === 'asc' ? 1 : -1;
      return 0;
    });

  return (
    <>
      <TableContainer
        component={Paper}
        className={`${selectedLectures.length > 0 ? 'table-container-when-lectures-selected' : 'table-container'}`}
      >
        <Table stickyHeader>
          <TableHead>
            <TableRow>
              <TableCell>
                <Checkbox
                  checked={selectAll}
                  onChange={handleSelectAll}
                  indeterminate={
                    selectedLectures.length > 0 && selectedLectures.length < sortedLectures.length
                  }
                />
              </TableCell>
              {[
                { id: 'index', label: 'No' },
                { id: 'moduleCode', label: 'Module Code' },
                { id: 'dayOfWeek', label: 'Day of Week' },
                { id: 'lectureDate', label: 'Date' },
                { id: 'locationName', label: 'Venue' },
                { id: 'lectureStartTime', label: 'Start Time' },
                { id: 'lectureEndTime', label: 'End Time' },
                { id: 'actions', label: 'Actions' },
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
            {sortedLectures.length > 0 ? (
              sortedLectures.map((lecture, index) => (
                <TableRow
                  key={index}
                  onClick={() => handleLectureClick(lecture)}
                  selected={selectedLecture === lecture}
                >
                  <TableCell>
                    <Checkbox
                      checked={selectedLectures.includes(lecture)}
                      onChange={() => handleToggleSelect(lecture)}
                      onClick={(e) => e.stopPropagation()} // Prevent row click when toggling
                    />
                  </TableCell>
                  <TableCell>{index + 1}</TableCell>
                  <TableCell>{lecture.moduleCode}</TableCell>
                  <TableCell>
                    {new Date(lecture.lectureDate).toLocaleDateString('en-US', { weekday: 'long' })}
                  </TableCell>
                  <TableCell className="text-nowrap">{lecture.lectureDate}</TableCell>
                  <TableCell>{lecture.locationName}</TableCell>
                  <TableCell>{lecture.lectureStartTime}</TableCell>
                  <TableCell>{lecture.lectureEndTime}</TableCell>
                  <TableCell className="text-nowrap">
                    <IconButton onClick={() => handleLectureUpdate(lecture)}>
                      <FaEdit color="#0063a0" size={'20px'} />
                    </IconButton>
                    <IconButton onClick={() => handleLectureDelete(lecture)}>
                      <MdDeleteForever color="#f01e2c" size={'20px'} />
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
      {selectedLectures.length > 0 && (
        <div className="row mt-2 align-items-center justify-content-center">
          <div className="col-auto">
            <Button
              variant="contained"
              color="error"
              onClick={() => handleDeleteSelectedLectures(selectedLectures)}
              startIcon={<MdDeleteForever />}
            >
              Delete Selected Lectures
            </Button>
          </div>
        </div>
      )}
    </>
  );
};

export default LecturesTable;
