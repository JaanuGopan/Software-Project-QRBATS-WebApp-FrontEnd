import React from "react";

const AvailableLectureList = ({
  availableLectureList,
  day,
  venue,
  moduleName = "",
}) => {
  const dayNames = {
    Mon: "Monday",
    Tue: "Tuesday",
    Wed: "Wednesday",
    Thu: "Thursday",
    Fri: "Friday",
    Sat: "Saturday",
    Sun: "Sunday",
  };

  return (
    <>
      {availableLectureList.length > 0 ? (
        <div className="available-lecture-list">
          <div className="available-lecture-list-heading">
            <h5>
              Lectures for {day ? dayNames[day] : moduleName}{" "}
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
                  <tr key={index}>
                    <td>{index + 1}</td>
                    <td>{dayNames[lecture.lectureDay]}</td>
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
            No Lecture Available for {day ? dayNames[day] : moduleName}{" "}
            {venue && `at ${venue}`}
          </h5>
        </div>
      )}
    </>
  );
};

export default AvailableLectureList;
