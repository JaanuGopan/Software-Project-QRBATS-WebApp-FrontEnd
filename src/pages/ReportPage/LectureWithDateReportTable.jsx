import React, { useState } from 'react';
import { CiViewList } from 'react-icons/ci';
import { CircularProgress } from '@mui/material';
import './report-table.css';

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
    <div className="report-table-container">
      <table className="table table-hover">
        <thead className='sticky-header'>
          <tr className='report-table-table-header-row'>
            <th className='col'>No</th>
            <th className='col'>Name</th>
            <th className='col'>Module Code</th>
            <th className='col'>Date</th>
            <th className='col'>Venue</th>
            <th className='col'>Start Time</th>
            <th className='col'>End Time</th>
            <th className='col'>View</th>
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
                  className={'report-table-row' + (selectedLectureWithDate === lecture ? ' report-table-selected-row' : '')}
                >
                  <td>{index + 1}</td>
                  <td>{`Lecture_${lecture.lectureDate}`}</td>
                  <td>{lecture.lectureModuleCode}</td>
                  <td>{lecture.lectureDate}</td>
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

export default LectureWithDateReportTable;
