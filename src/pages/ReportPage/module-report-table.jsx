import {
  CircularProgress,
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
import { GiTeacher } from 'react-icons/gi';
import { TbReportAnalytics } from 'react-icons/tb';
import './report-table.css';

const ModuleReportTable = ({
  handleOpenOverallReportWindow,
  handleOpenLecturesReportWindow,
  searchModuleReport,
  onModuleReportClick,
  modulesReportList,
  handleModuleReportReload,
}) => {
  const [selectedModuleReport, setSelectedModuleReport] = useState(null);
  const [order, setOrder] = useState('asc');
  const [orderBy, setOrderBy] = useState('moduleName');
  const [loadingOverallReport, setLoadingOverallReport] = useState(false);
  const [loadingLecturesReport, setLoadingLecturesReport] = useState(false);

  const handleModuleClick = (module) => {
    setSelectedModuleReport(module);
    onModuleReportClick(module);
  };

  const handleRequestSort = (property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleOpenOverallReport = async (moduleId) => {
    try {
      setLoadingOverallReport(true);
      await handleOpenOverallReportWindow(moduleId);
    } finally {
      setLoadingOverallReport(false);
    }
  };

  const handleOpenLecturesReport = async (module) => {
    try {
      setLoadingLecturesReport(true);
      await handleOpenLecturesReportWindow(module);
    } finally {
      setLoadingLecturesReport(false);
    }
  };

  const sortedModules = [...modulesReportList]
    .filter(
      (module) =>
        module.moduleName.toLowerCase().includes(searchModuleReport.toLowerCase()) ||
        module.moduleCode.toLowerCase().includes(searchModuleReport.toLowerCase())
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
              { id: 'reports', label: 'Reports' },
            ].map((column) => (
              <TableCell
                key={column.id}
                style={{
                  fontWeight: 'bold',
                  textAlign:
                    column.id === 'reports' || column.id === 'semester' || column.id === 'batch'
                      ? 'center'
                      : 'left',
                }}
              >
                {column.id !== 'reports' ? (
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
                selected={selectedModuleReport === module}
              >
                <TableCell>{index + 1}</TableCell>
                <TableCell>{module.moduleName}</TableCell>
                <TableCell>{module.moduleCode}</TableCell>
                <TableCell
                  style={{
                    textAlign: 'center',
                  }}
                >
                  {module.semester}
                </TableCell>
                <TableCell
                  style={{
                    textAlign: 'center',
                  }}
                >
                  {module.studentBatch}
                </TableCell>
                <TableCell>
                  <div className="row align-items-center justify-content-center report-table-reports-buttons-container">
                    <div className="col-auto">
                      {loadingOverallReport && selectedModuleReport === module ? (
                        <CircularProgress />
                      ) : (
                        <button
                          onClick={() => {
                            handleModuleClick(module);
                            handleOpenOverallReport(module.id);
                          }}
                          className="ViewButton"
                        >
                          <TbReportAnalytics className="EditIcon" />
                          <p className="ViewButtonLabel">Overall Report</p>
                        </button>
                      )}
                    </div>
                    <div className="col-auto">
                      {loadingLecturesReport && selectedModuleReport === module ? (
                        <CircularProgress />
                      ) : (
                        <button
                          onClick={() => {
                            onModuleReportClick(module);
                            handleOpenLecturesReport(module);
                          }}
                          className="ViewButton"
                        >
                          <GiTeacher className="EditIcon" />
                          <p className="ViewButtonLabel">Lectures Report</p>
                        </button>
                      )}
                    </div>
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
  );
};

export default ModuleReportTable;
