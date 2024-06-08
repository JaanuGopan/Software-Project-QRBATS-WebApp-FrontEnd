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
import LocationService from "../../api/services/LocationService";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const RightContainerLectureCreation = ({
  moduleCode,
  dayList,
  userId,
  handelShowAvailableLectures,
  timesList,
}) => {
  const [selectedDay, setSelectedDay] = useState(dayList[0]);
  const [times, setTimes] = useState(timesList);
  const maxTimeSlots = 20;
  const [venueList, setVenuesList] = useState([
    "NCC",
    "LT1",
    "LT2",
    "Auditorium",
    "DEIE",
    "DMME",
    "DCEE",
  ]);

  const handleGetLocationNameList = async () => {
    const response = await LocationService.getAllLocationNames();
    setVenuesList(response);
  };

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
    handleGetLocationNameList();
  }, [dayList]);

  const handleDaySelect = (event, newDay) => {
    if (newDay !== null) {
      setSelectedDay(newDay);
      handelShowAvailableLectures(times[newDay][0].venue, newDay);
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
    handelShowAvailableLectures(value, selectedDay);
  };

  const validateTimeSlots = (timeSlots) => {
    for (let i = 0; i < timeSlots.length; i++) {
      const slot = timeSlots[i];
      const startTime = `${slot.startTime}:00`;
      const endTime = `${slot.endTime}:00`;

      if (startTime === endTime) {
        toast.error("Start time and end time cannot be the same.");
        return false;
      }

      if (startTime > endTime) {
        toast.error("End time cannot be before start time.");
        return false;
      }

      for (let j = 0; j < timeSlots.length; j++) {
        if (i !== j) {
          const otherSlot = timeSlots[j];
          const otherStartTime = `${otherSlot.startTime}:00`;
          const otherEndTime = `${otherSlot.endTime}:00`;

          if (
            (startTime >= otherStartTime && startTime < otherEndTime) ||
            (endTime > otherStartTime && endTime <= otherEndTime) ||
            (startTime <= otherStartTime && endTime >= otherEndTime)
          ) {
            toast.error("Time slots cannot overlap.");
            return false;
          }
        }
      }
    }
    return true;
  };

  const handleSaveClick = async () => {
    const formattedTimes = dayList.reduce((acc, day) => {
      if (times[day]) {
        const validSlots = times[day]
          .filter((slot) => slot.startTime && slot.endTime && slot.venue)
          .map((slot) => {
            return {
              ...slot,
              startTime: `${slot.startTime}:00`,
              endTime: `${slot.endTime}:00`,
            };
          });

        if (validateTimeSlots(validSlots)) {
          acc[day] = validSlots;
        } else {
          acc[day] = [];
        }
      }
      return acc;
    }, {});

    if (Object.values(formattedTimes).some((slots) => slots.length === 0)) {
      toast.error("Please fix the errors before saving.");
      return;
    }

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

      const savedLectures = data.filter((lecture) => lecture.lectureId);
      const failedLectures = data.filter((lecture) => !lecture.lectureId);

      if (savedLectures.length > 0) {
        toast.success(
          `Lectures saved successfully: ${savedLectures
            .map((lecture) => lecture.lectureName)
            .join(", ")}`
        );
      }

      if (failedLectures.length > 0) {
        toast.error(
          `Failed to save lectures: ${failedLectures
            .map((lecture) => lecture.lectureName)
            .join(", ")}`
        );
      }
    } catch (error) {
      console.error("Save failed:", error);
      toast.error("Save failed.");
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
      <ToastContainer />
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
                          <option key={index} value={option.locationName}>
                            {option.locationName}
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
