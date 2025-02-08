import React, { useState } from "react";

const AvailableLectureList = ({ availableLectureList, day, venue }) => {
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
      {availableLectureList.length > 0 && day ? (
        <div className="available-lecture-list">
          <div className="available-lecture-list-heading">
            <h5>
              Available Lectures for {dayNames[day]} {venue && `at ${venue}`}{" "}
              {" For All Modules"}
            </h5>
          </div>
          <div className="available-lecture-list-table">
            <table className="available-lecture-list-table-arrangement-for-creation">
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
            No Lecture Available for {dayNames[day]} {venue && `at ${venue}`}
          </h5>
        </div>
      )}
    </>
  );
};

export default AvailableLectureList;
