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
import Department from '../../../utils/Department';

const StaffTable = ({ search, handleUpdateStaff, handleDeleteStaff, onStaffClick, staffsList }) => {
  const [selectedStaff, setSelectedStaff] = useState(null);
  const [order, setOrder] = useState('asc');
  const [orderBy, setOrderBy] = useState('name');

  const handleStaffClick = (staff) => {
    setSelectedStaff(staff);
    onStaffClick(staff);
  };

  const handleRequestSort = (property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const departmentList = Department.departmentList;

  const filteredStaffs = staffsList
    .filter(
      (staff) =>
        staff.firstName.toLowerCase().includes(search.toLowerCase()) ||
        staff.lastName.toLowerCase().includes(search.toLowerCase()) ||
        staff.username.toLowerCase().includes(search.toLowerCase())
    )
    .sort((a, b) => {
      if (orderBy === 'name') {
        const nameA = `${a.firstName} ${a.lastName}`.toLowerCase();
        const nameB = `${b.firstName} ${b.lastName}`.toLowerCase();
        if (nameA < nameB) return order === 'asc' ? -1 : 1;
        if (nameA > nameB) return order === 'asc' ? 1 : -1;
        return 0;
      }
      if (a[orderBy] < b[orderBy]) return order === 'asc' ? -1 : 1;
      if (a[orderBy] > b[orderBy]) return order === 'asc' ? 1 : -1;
      return 0;
    });

  return (
    <div className="table-container">
      <TableContainer component={Paper}>
        <Table stickyHeader>
          <TableHead>
            <TableRow>
              {[
                { id: 'no', label: 'No' },
                { id: 'name', label: 'Name' },
                { id: 'department', label: 'Department' },
                { id: 'email', label: 'Email' },
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
            {filteredStaffs.length > 0 ? (
              filteredStaffs.map((staff, index) => (
                <TableRow
                  key={index}
                  onClick={() => handleStaffClick(staff)}
                  selected={selectedStaff === staff}
                  style={{ cursor: 'pointer' }}
                >
                  <TableCell>{index + 1}</TableCell>
                  <TableCell>{`${staff.firstName} ${staff.lastName}`}</TableCell>
                  <TableCell>{departmentList[staff.departmentId - 1]}</TableCell>
                  <TableCell>{staff.email}</TableCell>
                  <TableCell style={{ textAlign: 'center' }}>
                    <div className="d-flex justify-content-center align-items-center">
                      <IconButton onClick={() => handleUpdateStaff(staff)}>
                        <FaEdit color="#0063a0" size={'20px'} />
                      </IconButton>
                      <IconButton onClick={() => handleDeleteStaff(staff)}>
                        <MdDeleteForever color="#f01e2c" size={'20px'} />
                      </IconButton>
                    </div>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={5} align="center">
                  No Data Available
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default StaffTable;
