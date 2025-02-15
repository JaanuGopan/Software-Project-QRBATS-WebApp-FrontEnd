import { CircularProgress } from '@mui/material';
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
    <div className="report-table-container">
      <table className="table table-hover">
        <thead className="sticky-header">
          <tr className="report-table-table-header-row">
            <th className="col">No</th>
            <th className="col">Module Name</th>
            <th className="col">Module Code</th>
            <th className="col">Semester</th>
            <th className="col text-center">Reports</th>
          </tr>
        </thead>
        {modulesReportList.filter(
          (module) =>
            module.moduleName.toLowerCase().includes(searchModuleReport.toLowerCase()) ||
            module.moduleCode.toLowerCase().includes(searchModuleReport.toLowerCase())
        ).length > 0 ? (
          <tbody>
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
                  className={
                    'report-table-row' +
                    (selectedModuleReport === module ? ' report-table-selected-row' : '')
                  }
                >
                  <td>{index + 1}</td>
                  <td>{module.moduleName}</td>
                  <td>{module.moduleCode}</td>
                  <td>{module.semester}</td>
                  <td>
                    <div className="row align-items-center justify-content-center report-table-reports-buttons-container">
                      <div className="col-auto">
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
                      </div>
                      <div className="col-auto">
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
                      </div>
                    </div>
                  </td>
                </tr>
              ))}
          </tbody>
        ) : (
          <tbody className="nodata">No Data Available</tbody>
        )}
      </table>
    </div>
  );
};

export default ModuleReportTable;
