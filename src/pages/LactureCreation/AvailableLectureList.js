import React from "react";

const AvailableLectureList = ({
  availableLectureList,
  day,
  venue,
  moduleName = "",
}) => {
  return (
    <>
      {availableLectureList.length > 0 ? (
        <div className="available-lecture-list">
          <div className="available-lecture-list-heading">
            <h5>
              Lectures for{" "}
              {day
                ? day === "Tue"
                  ? "Tuesday"
                  : day === "Thu"
                  ? "Thursday"
                  : day === "Sat"
                  ? "Saturday"
                  : day === "Wed"
                  ? "Wednesday"
                  : day + "day"
                : moduleName}{" "}
              {venue && `at ${venue}`}
            </h5>
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
      ) : (
        <div className="available-lecture-list-empty">
          <h5>
            No Lecture Available for{" "}
            {day
              ? day === "Tue"
                ? "Tuesday"
                : day === "Thu"
                ? "Thursday"
                : day === "Sat"
                ? "Saturday"
                : day === "Wed"
                ? "Wednesday"
                : day + "day"
              : moduleName}{" "}
            {venue && `at ${venue}`}
          </h5>
        </div>
      )}
    </>
  );
};

export default AvailableLectureList;
