import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { selectUser } from '../../redux/features/userSlice';
import '../AdminDashboard/AdminDashboard.css';
import { TbReportAnalytics } from 'react-icons/tb';
import { GiTeacher } from 'react-icons/gi';
import { CircularProgress } from '@mui/material';

const ModuleReportTable = ({
  handleOpenOverallReportWindow,
  handleOpenLecturesReportWindow,
  searchModuleReport,
  onModuleReportClick,
  modulesReportList,
  handleModuleReportReload,
}) => {
  const user = useSelector(selectUser);
  const { userId } = user || {};
  const [selectedModuleReport, setSelectedModuleReport] = useState(null);

  const handleModuleClick = (e) => {
    setSelectedModuleReport(e);
    onModuleReportClick(e);
  };

  const [loadingOverallReport, setLoadingOverallReport] = useState(false);

  const handleOpenOverallReport = async (moduleId) => {
    try {
      setLoadingOverallReport(true);
      await handleOpenOverallReportWindow(moduleId);
    } finally {
      setLoadingOverallReport(false);
    }
  };

  const [loadingLecturesReport, setLoadingLecturesReport] = useState(false);

  const handleOpenLecturesReport = async (moduleCode) => {
    try {
      setLoadingLecturesReport(true);
      await handleOpenLecturesReportWindow(moduleCode);
    } finally {
      setLoadingLecturesReport(false);
    }
  };

  return (
    <div className="tableDesign">
      <table className="event-report-tableArrangement">
        <thead>
          <tr>
            <th>No</th>
            <th className="expand">Module Name</th>
            <th>Module Code</th>
            <th>Semester</th>
            <th>Overall Report</th>
            <th>Lectures Report</th>
          </tr>
        </thead>
        {modulesReportList
            .filter(
              (module) =>
                module.moduleName.toLowerCase().includes(searchModuleReport.toLowerCase()) ||
                module.moduleCode.toLowerCase().includes(searchModuleReport.toLowerCase())
            ).length > 0 ? <tbody>
          {modulesReportList
            .filter(
              (module) =>
                module.moduleName.toLowerCase().includes(searchModuleReport.toLowerCase()) ||
                module.moduleCode.toLowerCase().includes(searchModuleReport.toLowerCase())
            )
            .map((module, index) => (
              <tr
                key={index}
                onClick={() => handleModuleClick(module)}
                className={selectedModuleReport === module ? 'selected-row' : 'event-row'}
              >
                <td>{index + 1}</td>
                <td>{module.moduleName}</td>
                <td>{module.moduleCode}</td>
                <td>{module.semester}</td>
                <td>
                  {loadingOverallReport ? (
                    <CircularProgress />
                  ) : (
                    <button
                      onClick={() => {
                        onModuleReportClick(module);
                        handleOpenOverallReport(module.moduleId);
                      }}
                      className="ViewButton"
                    >
                      <TbReportAnalytics className="EditIcon" />
                      <p className="ViewButtonLabel">Overall Report</p>
                    </button>
                  )}
                </td>
                <td>
                  {loadingLecturesReport ? (
                    <CircularProgress />
                  ) : (
                    <button
                      onClick={() => {
                        onModuleReportClick(module);
                        handleOpenLecturesReport(module.moduleCode);
                      }}
                      className="ViewButton"
                    >
                      <GiTeacher className="EditIcon" />
                      <p className="ViewButtonLabel">Lectures Report</p>
                    </button>
                  )}
                </td>
              </tr>
            ))}
        </tbody> : <tbody className='nodata'>
          No Data Available
        </tbody>}
      </table>
    </div>
  );
};

export default ModuleReportTable;
