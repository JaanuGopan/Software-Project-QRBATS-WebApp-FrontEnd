import React from "react";

const AvailableLectureList = ({ availableLectureList, day, venue }) => {
  return (
    <div className="available-lecture-list">
      <div className="available-lecture-list-heading">
        <h4>
          Lectures for {day} {venue && `at ${venue}`}
        </h4>
      </div>
      <div className="available-lecture-list-table">
        <table className="available-lecture-list-table-arrangement">
          <thead>
            <tr>
              <th>No</th>
              <th>Day</th>
              <th>Venue</th>
              <th>Start Time</th>
              <th>End Time</th>
            </tr>
          </thead>
          <tbody>
            {availableLectureList.map((lecture, index) => (
              <tr>
                <td>{index + 1}</td>
                <td>{lecture.lectureDay}</td>
                <td>{lecture.lectureVenue}</td>
                <td>{lecture.lectureStartTime}</td>
                <td>{lecture.lectureEndTime}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AvailableLectureList;
