import React, { useState } from 'react';
import '../../pages/AdminDashboard/AdminDashboard.css';
import { CiViewList } from 'react-icons/ci';
import { CircularProgress } from '@mui/material';

const LectureWithDateReportTable = ({
  handleOpenLectureAttendanceReportWindow,
  searchLectureWithDate,
  onLectureWithDateClick,
  lectureWithDateList,
}) => {
  const [selectedLectureWithDate, setSelectedLectureWithDate] = useState(null);

  const handleLectureReportClick = (e) => {
    setSelectedLectureWithDate(e);
    onLectureWithDateClick(e);
  };

  const [isLoading, setIsLoading] = useState(false);
  const handleViewReport = async (lecture) => {
    try {
      setIsLoading(true);
      await handleOpenLectureAttendanceReportWindow(lecture.lectureId, lecture.lectureDate);
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
            <th>Date</th>
            <th>Venue</th>
            <th>Start Time</th>
            <th>End Time</th>
            <th>View</th>
          </tr>
        </thead>
        {lectureWithDateList.filter(
          (lecture) =>
            (lecture.lectureName &&
              lecture.lectureName.toLowerCase().includes(searchLectureWithDate.toLowerCase())) ||
            (lecture.lectureDate &&
              lecture.lectureDate.toLowerCase().includes(searchLectureWithDate.toLowerCase()))
        ).length > 0 ? (
          <tbody>
            {lectureWithDateList
              .filter(
                (lecture) =>
                  (lecture.lectureName &&
                    lecture.lectureName
                      .toLowerCase()
                      .includes(searchLectureWithDate.toLowerCase())) ||
                  (lecture.lectureDate &&
                    lecture.lectureDate.toLowerCase().includes(searchLectureWithDate.toLowerCase()))
              )
              .map((lecture, index) => (
                <tr
                  key={index}
                  onClick={() => handleLectureReportClick(lecture)}
                  className={selectedLectureWithDate === lecture ? 'selected-row' : 'event-row'}
                >
                  <td>{index + 1}</td>
                  <td>{`Lecture_${lecture.lectureDate}`}</td>
                  <td>{lecture.lectureModuleCode}</td>
                  <td>{lecture.lectureDate}</td>
                  <td>{lecture.lectureVenue}</td>
                  <td>{lecture.lectureStartTime}</td>
                  <td>{lecture.lectureEndTime}</td>
                  <td>
                    {isLoading ? (
                      <CircularProgress />
                    ) : (
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleViewReport(lecture);
                          handleLectureReportClick(lecture);
                        }}
                        className="ViewButton"
                      >
                        <CiViewList className="EditIcon" />
                        <p className="ViewButtonLabel">View Report</p>
                      </button>
                    )}
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

export default LectureWithDateReportTable;
