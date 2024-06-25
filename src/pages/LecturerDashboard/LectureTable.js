import React, { useEffect, useState } from "react";
import "../AdminDashboard/AdminDashboard.css";
import { FaEdit } from "react-icons/fa";

const LectureTable = ({
  lectureList,
  onLectureClick,
  search,
  handleUpdateLecture,
}) => {
  const [lecturesList, setLecturesList] = useState([]);
  const [selectedLecture, setSelectedLecture] = useState(null);

  useEffect(() => {
    setLecturesList(lectureList);
  }, [lectureList]);

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
            <th>Date</th>
            <th>Venue</th>
            <th>Start Time</th>
            <th>End Time</th>
            <th>Edit</th>
          </tr>
        </thead>
        <tbody>
          {lecturesList
            .filter(
              (lecture) =>
                lecture.eventName
                  .toLowerCase()
                  .includes(search.toLowerCase()) ||
                lecture.eventVenue.toLowerCase().includes(search.toLowerCase())
            )
            .map((lecture, index) => (
              <tr
                key={index}
                onClick={() => handleLectureClick(lecture)}
                className={
                  selectedLecture === lecture ? "selected-row" : "event-row"
                }
              >
                <td>{index + 1}</td>
                <td>{lecture.eventName}</td>
                <td>{lecture.eventDate}</td>
                <td>{lecture.eventVenue}</td>
                <td>{lecture.eventTime}</td>
                <td>{lecture.eventEndTime}</td>
                <td>
                  <button
                    onClick={() => handleUpdateLecture(lecture)}
                    className="EditButton"
                  >
                    <FaEdit className="EditIcon" />
                  </button>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
};
export default LectureTable;
