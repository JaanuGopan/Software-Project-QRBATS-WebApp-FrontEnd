import React, { useState } from 'react';
import '../../pages/AdminDashboard/AdminDashboard.css';
import { CiViewList } from 'react-icons/ci';
import { CircularProgress } from '@mui/material';

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
    <div className="tableDesign">
      <table className="event-report-tableArrangement">
        <thead>
          <tr>
            <th>No</th>
            <th className="expand">Name</th>
            <th>Module Code</th>
            <th>Day</th>
            <th>Venue</th>
            <th>Start Time</th>
            <th>End Time</th>
            <th>View</th>
          </tr>
        </thead>
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
                className={selectedLectureReport === lecture ? 'selected-row' : 'event-row'}
              >
                <td>{index + 1}</td>
                <td>{lecture.lectureName}</td>
                <td>{lecture.lectureModuleCode}</td>
                <td>{lecture.lectureDay}</td>
                <td>{lecture.lectureVenue}</td>
                <td>{lecture.lectureStartTime}</td>
                <td>{lecture.lectureEndTime}</td>
                <td>
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
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
};

export default LectureReportTable;
