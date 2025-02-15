import React, { useState } from 'react';
import { FaEdit } from 'react-icons/fa';
import './lectures-table.css';
import { IconButton } from '@mui/material';
import { MdDeleteForever } from 'react-icons/md';

const LecturesTable = ({ lecturesList, onLectureClick, search, handleLectureUpdate, handleLectureDelete }) => {
  const [selectedLecture, setSelectedLecture] = useState(null);

  const handleLectureClick = (clickedLecture) => {
    onLectureClick(clickedLecture);
    setSelectedLecture(clickedLecture);
  };
  return (
    <div className="lectures-table-container">
      <table className="table table-hover">
        <thead className='sticky-header'>
          <tr className='lectures-table-table-header-row'>
            <th className='col'>No</th>
            <th className="col">Name</th>
            <th className='col'>Module Code</th>
            <th className='col'>Day</th>
            <th className='col'>Venue</th>
            <th className='col'>Start Time</th>
            <th className='col'>End Time</th>
            <th className='col'>Actions</th>
          </tr>
        </thead>
        {lecturesList.filter(
          (lecture) =>
            lecture.lectureName.toLowerCase().includes(search.toLowerCase()) ||
            lecture.lectureModuleCode.toLowerCase().includes(search.toLowerCase())
        ).length > 0 ? (
          <tbody>
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
                  className={'lecture-table-row' + (selectedLecture === lecture ? ' lectures-table-selected-row' : '')}
                >
                  <td>{index + 1}</td>
                  <td>{lecture.lectureName}</td>
                  <td>{lecture.lectureModuleCode}</td>
                  <td>{lecture.lectureDay}</td>
                  <td>{lecture.lectureVenue}</td>
                  <td>{lecture.lectureStartTime}</td>
                  <td>{lecture.lectureEndTime}</td>
                  <td>
                    <div className='row table-action-icons'>
                      <div className='col px-0 d-flex justify-content-center align-items-center'>
                        <IconButton onClick={() => handleLectureUpdate(lecture)} ><FaEdit color='#0063a0' size={"20px"}/></IconButton>
                      </div>
                      <div className='col ps-0  d-flex justify-content-center align-items-center'>
                        <IconButton onClick={() => handleLectureDelete(lecture)} ><MdDeleteForever color='#f01e2c' size={"20px"}/></IconButton>
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

export default LecturesTable;
