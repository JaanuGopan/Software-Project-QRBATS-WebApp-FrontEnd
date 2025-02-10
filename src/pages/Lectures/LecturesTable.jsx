import React, { useEffect, useState } from 'react';
import '../AdminDashboard/AdminDashboard.css';
import { FaEdit } from 'react-icons/fa';

const LecturesTable = ({ lecturesList, onLectureClick, search, handleLectureUpdate }) => {
  const [selectedLecture, setSelectedLecture] = useState(null);

  const handleLectureClick = (clickedLecture) => {
    onLectureClick(clickedLecture);
    setSelectedLecture(clickedLecture);
  };
  return (
    <div className="tableDesign">
      <table className="tableArrangement">
        <thead>
          <tr>
            <th>No</th>
            <th className="expand">Name</th>
            <th>Module Code</th>
            <th>Day</th>
            <th>Venue</th>
            <th>Start Time</th>
            <th>End Time</th>
            <th>Edit</th>
          </tr>
        </thead>
        {lecturesList
            .filter(
              (lecture) =>
                lecture.lectureName.toLowerCase().includes(search.toLowerCase()) ||
                lecture.lectureModuleCode.toLowerCase().includes(search.toLowerCase())
            ).length > 0 ? <tbody>
          {lecturesList
            .filter(
              (lecture) =>
                lecture.lectureName.toLowerCase().includes(search.toLowerCase()) ||
                lecture.lectureModuleCode.toLowerCase().includes(search.toLowerCase())
            )
            .map((lecture, index) => (
              <tr
                key={index}
                onClick={() => handleLectureClick(lecture)}
                className={selectedLecture === lecture ? 'selected-row' : 'event-row'}
              >
                <td>{index + 1}</td>
                <td>{lecture.lectureName}</td>
                <td>{lecture.lectureModuleCode}</td>
                <td>{lecture.lectureDay}</td>
                <td>{lecture.lectureVenue}</td>
                <td>{lecture.lectureStartTime}</td>
                <td>{lecture.lectureEndTime}</td>
                <td>
                  <button onClick={() => handleLectureUpdate(lecture)} className="EditButton">
                    <FaEdit className="EditIcon" />
                  </button>
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

export default LecturesTable;
