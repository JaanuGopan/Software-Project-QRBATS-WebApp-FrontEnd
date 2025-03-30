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
import { FaEdit, FaEye } from 'react-icons/fa';
import { MdDeleteForever } from 'react-icons/md';
import Department from '../../utils/Department';
import './module-table.css';

const ModuleTable = ({
  handleOpenUpdateModuleWindow,
  searchModule,
  onModuleClick,
  modulesList,
  handleDeleteModule,
  handleOpenModuleLectureList,
}) => {
  const [selectedModule, setSelectedModule] = useState(null);
  const [order, setOrder] = useState('asc');
  const [orderBy, setOrderBy] = useState('moduleName');

  const departmentList = Department.studentDepartmentList;

  const handleModuleClick = (module) => {
    setSelectedModule(module);
    onModuleClick(module);
  };

  const handleRequestSort = (property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const sortedModules = [...modulesList]
    .filter(
      (module) =>
        module.moduleName.toLowerCase().includes(searchModule.toLowerCase()) ||
        module.moduleCode.toLowerCase().includes(searchModule.toLowerCase())
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
              { id: 'moduleName', label: 'Module Name' },
              { id: 'moduleCode', label: 'Module Code' },
              { id: 'semester', label: 'Semester' },
              { id: 'batch', label: 'Batch' },
              { id: 'department', label: 'Department' },
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
          {sortedModules.length > 0 ? (
            sortedModules.map((module, index) => (
              <TableRow
                key={index}
                onClick={() => handleModuleClick(module)}
                selected={selectedModule === module}
              >
                <TableCell>{index + 1}</TableCell>
                <TableCell>{module.moduleName}</TableCell>
                <TableCell>{module.moduleCode}</TableCell>
                <TableCell>{module.semester}</TableCell>
                <TableCell>{module.studentBatch}</TableCell>
                <TableCell>{departmentList[module.departmentId - 1]}</TableCell>
                <TableCell className="text-nowrap">
                  <IconButton onClick={() => handleOpenModuleLectureList(module)}>
                    <FaEye color="#0063a0" size={'20px'} />
                  </IconButton>
                  <IconButton onClick={() => handleOpenUpdateModuleWindow(module)}>
                    <FaEdit color="#0063a0" size={'20px'} />
                  </IconButton>
                  <IconButton onClick={() => handleDeleteModule(module.id)}>
                    <MdDeleteForever color="#f01e2c" size={'20px'} />
                  </IconButton>
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

export default ModuleTable;
