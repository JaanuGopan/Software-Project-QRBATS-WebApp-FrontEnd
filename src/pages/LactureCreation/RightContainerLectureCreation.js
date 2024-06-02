import React, { useEffect, useState } from "react";
import {
  Button,
  IconButton,
  ToggleButton,
  ToggleButtonGroup,
} from "@mui/material";
import InputField from "../../components/textfields/InputBox/InputField";
import DeleteIcon from "@mui/icons-material/Delete";
import { pink } from "@mui/material/colors";
import axios from "axios";

const RightContainerLectureCreation = ({ moduleCode, dayList, userId }) => {
  const [selectedDay, setSelectedDay] = useState(dayList[0]);
  const [times, setTimes] = useState({});
  const maxTimeSlots = 5;
  const venueList = ["NCC", "LT1", "LT2", "Auditorium", "DEIE", "DMME", "DCEE"];

  useEffect(() => {
    setTimes((prevTimes) => {
      const updatedTimes = dayList.reduce((acc, day) => {
        acc[day] = prevTimes[day] || [
          { startTime: "", endTime: "", venue: "" },
        ];
        return acc;
      }, {});
      return updatedTimes;
    });

    if (dayList.includes(selectedDay)) {
      setSelectedDay(selectedDay);
    } else {
      const dayWithoutTimes = dayList.find(
        (day) =>
          !times[day]?.some(
            (slot) => !slot.startTime || !slot.endTime || !slot.venue
          )
      );
      setSelectedDay(dayWithoutTimes || dayList[dayList.length - 1]);
    }
  }, [dayList]);

  const handleDaySelect = (event, newDay) => {
    if (newDay !== null) {
      setSelectedDay(newDay);
    }
  };

  const handleTimeChange = (slotIndex, type, value) => {
    setTimes((prevTimes) => ({
      ...prevTimes,
      [selectedDay]: prevTimes[selectedDay].map((slot, index) =>
        index === slotIndex ? { ...slot, [type]: value } : slot
      ),
    }));
  };

  const handleVenueChange = (slotIndex, value) => {
    setTimes((prevTimes) => ({
      ...prevTimes,
      [selectedDay]: prevTimes[selectedDay].map((slot, index) =>
        index === slotIndex ? { ...slot, venue: value } : slot
      ),
    }));
  };

  const handleSaveClick = async () => {
    const formattedTimes = dayList.reduce((acc, day) => {
      if (times[day]) {
        acc[day] = times[day]
          .filter((slot) => slot.startTime && slot.endTime && slot.venue)
          .map((slot) => ({
            ...slot,
            startTime: new Date(`1970-01-01T${slot.startTime}:00`)
              .toISOString()
              .substr(11, 8),
            endTime: new Date(`1970-01-01T${slot.endTime}:00`)
              .toISOString()
              .substr(11, 8),
          }));
      }
      return acc;
    }, {});

    const requestData = {
      lectureAssignedUserId: userId,
      moduleCode,
      times: formattedTimes,
    };

    console.log(requestData);

    try {
      const response = await axios.post(
        "http://localhost:8080/api/v1/lecture/createlecture",
        requestData
      );

      if (response.status !== 200) {
        throw new Error("Network response was not ok");
      }

      const data = response.data;
      console.log("Save successful:", data);
    } catch (error) {
      console.error("Save failed:", error);
    }
  };

  const addTimeSlot = () => {
    setTimes((prevTimes) => ({
      ...prevTimes,
      [selectedDay]: [
        ...prevTimes[selectedDay],
        { startTime: "", endTime: "", venue: "" },
      ],
    }));
  };

  const handleCloseTimeSlot = (index) => {
    if (times[selectedDay]?.length > 1) {
      setTimes((prevTimes) => ({
        ...prevTimes,
        [selectedDay]: prevTimes[selectedDay].filter((_, i) => i !== index),
      }));
    }
  };

  const areAllTimesFilled = () => {
    return dayList.every((day) =>
      times[day]?.every((slot) => slot.startTime && slot.endTime && slot.venue)
    );
  };

  const isSaveDisabled = !areAllTimesFilled();

  return (
    <div className="right-container-lecture-creation">
      <div className="right-container-lecture-creation-heading">
        <label>{`Module Code: ${moduleCode}`}</label>
      </div>

      {dayList.length > 0 && (
        <div>
          <div className="right-container-lecture-creation-day-time">
            <div className="right-container-lecture-creation-toggle-button">
              <label>Time selection</label>
              <ToggleButtonGroup
                color="success"
                value={selectedDay}
                exclusive
                onChange={handleDaySelect}
                aria-label="selected day"
              >
                {dayList.map((day) => (
                  <ToggleButton key={day} value={day}>
                    {day}
                  </ToggleButton>
                ))}
              </ToggleButtonGroup>
            </div>
          </div>
          {selectedDay && (
            <div className="right-container-lecture-creation-time-selection-container">
              <div className="right-container-lecture-creation-time-selection">
                <label>
                  Select Time For{" "}
                  {selectedDay === "Tue"
                    ? "Tuesday"
                    : selectedDay === "Thu"
                    ? "Thursday"
                    : selectedDay === "Sat"
                    ? "Saturday"
                    : selectedDay === "Wed"
                    ? "Wednesday"
                    : selectedDay + "day"}
                </label>
              </div>
              {times[selectedDay]?.map((slot, index) => (
                <div
                  key={index}
                  className="right-container-lecture-creation-time-selection-time-slot"
                >
                  <div className="right-container-lecture-creation-time-selection-time-slot-heading">
                    <label id="heading">Time Slot {index + 1}</label>
                    <IconButton
                      aria-label="delete"
                      sx={{ color: pink[500] }}
                      id="iconButton"
                      onClick={() => handleCloseTimeSlot(index)}
                      disabled={times[selectedDay].length === 1}
                    >
                      <DeleteIcon />
                    </IconButton>
                  </div>
                  <div className="right-container-lecture-creation-time-selection">
                    <label>Start Time</label>
                    <InputField
                      inputType={"time"}
                      onChange={(e) => {
                        handleTimeChange(index, "startTime", e.target.value);
                      }}
                      value={slot.startTime || ""}
                    />
                  </div>
                  <div className="right-container-lecture-creation-time-selection">
                    <label>End Time</label>
                    <InputField
                      inputType={"time"}
                      onChange={(e) => {
                        handleTimeChange(index, "endTime", e.target.value);
                      }}
                      value={slot.endTime || ""}
                    />
                  </div>
                  <div className="right-container-lecture-creation-time-selection">
                    <label>Venue</label>
                    <div className="right-container-lecture-creation-venue-selection-select">
                      <select
                        required
                        value={slot.venue || ""}
                        onChange={(e) =>
                          handleVenueChange(index, e.target.value)
                        }
                        className="form-control mb-2"
                      >
                        <option value="">Select Venue</option>
                        {venueList.map((option, index) => (
                          <option key={index} value={option}>
                            {option}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                </div>
              ))}
              {times[selectedDay]?.length < maxTimeSlots && (
                <div className="right-container-lecture-creation-time-selection-time-slot-button">
                  <Button
                    variant="contained"
                    fullWidth
                    onClick={addTimeSlot}
                    color="warning"
                  >
                    Add Time Slot
                  </Button>
                </div>
              )}
            </div>
          )}
          <div className="right-container-lecture-creation-submit-button">
            <Button
              variant="contained"
              color="success"
              onClick={handleSaveClick}
              fullWidth
              disabled={isSaveDisabled}
            >
              Save
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default RightContainerLectureCreation;
