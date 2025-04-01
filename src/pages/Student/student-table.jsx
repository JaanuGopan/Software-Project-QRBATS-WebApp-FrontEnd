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
import Department from '../../utils/Department';

const StudentTable = ({
  handleUpdateStudent,
  handleDeleteStudent,
  onStudentClick,
  studentList,
  search,
}) => {
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [order, setOrder] = useState('asc');
  const [orderBy, setOrderBy] = useState('name');

  const handleStudentClick = (student) => {
    onStudentClick(student);
    setSelectedStudent(student);
  };

  const handleRequestSort = (property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const departmentList = Department.studentDepartmentList;

  const filteredStudents = studentList
    .filter(
      (student) =>
        student.firstName.toLowerCase().includes(search.toLowerCase()) ||
        student.indexNumber.toLowerCase().includes(search.toLowerCase())
    )
    .sort((a, b) => {
      if (orderBy === 'name') {
        const nameA = a.firstName.toLowerCase();
        const nameB = b.firstName.toLowerCase();
        if (nameA < nameB) return order === 'asc' ? -1 : 1;
        if (nameA > nameB) return order === 'asc' ? 1 : -1;
        return 0;
      }
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
              { id: 'no', label: 'No' },
              { id: 'name', label: 'Name' },
              { id: 'indexNumber', label: 'IndexNo' },
              { id: 'department', label: 'Department' },
              { id: 'semester', label: 'Semester' },
              { id: 'actions', label: 'Actions' },
            ].map((column) => (
              <TableCell
                key={column.id}
                style={{
                  fontWeight: 'bold',
                  textAlign: column.id === 'actions' ? 'center' : 'left',
                  whiteSpace: 'nowrap',
                }}
              >
                {column.id !== 'actions' && column.id !== 'no' ? (
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
          {filteredStudents.length > 0 ? (
            filteredStudents.map((student, index) => (
              <TableRow
                key={index}
                onClick={() => handleStudentClick(student)}
                selected={selectedStudent === student}
                style={{ cursor: 'pointer' }}
              >
                <TableCell>{index + 1}</TableCell>
                <TableCell>{student.firstName}</TableCell>
                <TableCell>{student.indexNumber}</TableCell>
                <TableCell>{departmentList[student.departmentId - 1]}</TableCell>
                <TableCell>{student.semester}</TableCell>
                <TableCell style={{ textAlign: 'center' }}>
                  <div className="d-flex justify-content-center align-items-center">
                    <IconButton onClick={() => handleUpdateStudent(student)}>
                      <FaEdit color="#0063a0" size={'20px'} />
                    </IconButton>
                    <IconButton onClick={() => handleDeleteStudent(student)}>
                      <MdDeleteForever color="#f01e2c" size={'20px'} />
                    </IconButton>
                  </div>
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
  );
};

export default StudentTable;
