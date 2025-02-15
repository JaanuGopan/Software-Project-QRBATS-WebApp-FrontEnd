import React, { useState } from 'react';
import { CiViewList } from 'react-icons/ci';
import { CircularProgress } from '@mui/material';
import './report-table.css';

const LectureReportTable = ({
  handleOpenLectureWithDateWindow,
  searchLecturesReport,
  onLecturesReportClick,
  lecturesReportList,
}) => {
  const [selectedLectureReport, setSelectedLectureReport] = useState(null);

  const handleLectureReportClick = (e) => {
    setSelectedLectureReport(e);
    onLecturesReportClick(e);
  };

  const [isLoading, setIsLoading] = useState(false);
  const OpenLectureWithDateWindow = async (lectureId) => {
    try {
      setIsLoading(true);
      await handleOpenLectureWithDateWindow(lectureId);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="report-table-container">
      <table className="table table-hover">
        <thead className='sticky-header'>
          <tr className='report-table-table-header-row'>
            <th className='col'>No</th>
            <th className='col'>Name</th>
            <th className='col'>Module Code</th>
            <th className='col'>Day</th>
            <th className='col'>Venue</th>
            <th className='col'>Start Time</th>
            <th className='col'>End Time</th>
            <th className='col'>View</th>
          </tr>
        </thead>
        {lecturesReportList.filter(
          (lecture) =>
            lecture.lectureName.toLowerCase().includes(searchLecturesReport.toLowerCase()) ||
            lecture.lectureDay.toLowerCase().includes(searchLecturesReport.toLowerCase())
        ).length > 0 ? (
          <tbody>
            {lecturesReportList
              .filter(
                (lecture) =>
                  lecture.lectureName.toLowerCase().includes(searchLecturesReport.toLowerCase()) ||
                  lecture.lectureDay.toLowerCase().includes(searchLecturesReport.toLowerCase())
              )
              .map((lecture, index) => (
                <tr
                  key={index}
                  onClick={() => handleLectureReportClick(lecture)}
                  className={'report-table-row' + (selectedLectureReport === lecture ? ' report-table-selected-row' : '')}
                >
                  <td>{index + 1}</td>
                  <td>{lecture.lectureName}</td>
                  <td>{lecture.lectureModuleCode}</td>
                  <td>{lecture.lectureDay}</td>
                  <td>{lecture.lectureVenue}</td>
                  <td>{lecture.lectureStartTime}</td>
                  <td>{lecture.lectureEndTime}</td>
                  <td>
                    <div className='row'>
                      <div className='col'>
                        {isLoading ? (
                          <CircularProgress />
                        ) : (
                          <button
                            onClick={() => OpenLectureWithDateWindow(lecture.lectureId)}
                            className="ViewButton"
                          >
                            <CiViewList className="EditIcon" />
                            <p className="ViewButtonLabel">View Lecture</p>
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

export default LectureReportTable;
