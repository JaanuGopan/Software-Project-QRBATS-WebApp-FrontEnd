import { IconButton, ToggleButton, ToggleButtonGroup } from '@mui/material';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { MdDelete } from 'react-icons/md';
import Select from 'react-select';
import { toast } from 'react-toastify';
import ModuleService from '../../api/services/ModuleService';
import CreatedTimeTableViewModal from './CreatedTimeTableViewModal';
import LectureTimeSlot from './LectureTimeSlot';
import './LectureTimeTable.css';

const SelectedDate = ({ day, date, onDelete, index, conflictLectureList }) => {
  const hasConflict = conflictLectureList.some((lectureDate) => lectureDate === date);
  return (
    <div
      className={`col-auto m-1 selected-date${hasConflict ? ' selected-date-with-conflict' : ''}`}
    >
      <div className="row align-items-center">
        <div className="col-auto pe-0">{date}</div>
        <div className="col-auto px-0">
          <IconButton onClick={() => onDelete(date, day)}>
            <MdDelete className="delete-icon" />
          </IconButton>
        </div>
      </div>
    </div>
  );
};

const LectureTimeTable = () => {
  const today = new Date().toISOString().split('T')[0];
  const [selectedModuleId, setSelectedModuleId] = useState();
  const [selectedModule, setSelectedModule] = useState(null);
  const [moduleList, setModuleList] = useState([]);
  const [startDate, setStartDate] = useState();
  const [endDate, setEndDate] = useState();
  const [dayList, setDayList] = useState([]);
  const [selectedDay, setSelectedDay] = useState(dayList[0] || '');
  const [timeSlotList, setTimeSlotList] = useState([]);
  const [lectureDateList, setLectureDateList] = useState({});
  const [conflictLectureList, setConflictLectureList] = useState([]);
  const [createdLectureList, setCreatedLectureList] = useState([]);
  const [showCreatedLecturesDetails, setShowCreatedLecturesDetails] = useState(false);

  const days = ['SUNDAY', 'MONDAY', 'TUESDAY', 'WEDNESDAY', 'THURSDAY', 'FRIDAY', 'SATURDAY'];

  useEffect(() => {
    ModuleService.getModulesByUserId().then((res) => {
      setModuleList(res);
    });
  }, []);

  const handleReset = () => {
    setLectureDateList([]);
    setSelectedDay('');
    setTimeSlotList([]);
    setDayList([]);
  };

  function handleModuleChange(e) {
    const module = moduleList.find((module) => module.id === e.value);
    if (module?.endingDate >= today) {
      setSelectedModuleId(e.value);
      setSelectedModule(module);
      handleDateRange(module);
      handleReset();
    } else {
      toast.warn(`The module ${module.moduleName} has already ended.`);
    }
  }

  const handleDateRange = (module) => {
    if (new Date(module.statingDate) > new Date(today)) {
      setStartDate(module.statingDate);
    } else {
      if (new Date(module.endingDate) < new Date(today)) {
        toast.warn('The module has already ended.');
        setStartDate(null);
        setEndDate(null);
        return;
      } else {
        setStartDate(today);
      }
    }
    if (new Date(module.endingDate) < new Date(today)) {
      toast.warn('The module has already ended.');
      setStartDate(null);
      setEndDate(null);
    } else {
      setEndDate(module.endingDate);
    }
  };

  const handleStartDateChange = (e) => {
    const newStartDate = e.target.value;
    if (new Date(newStartDate) < new Date(today)) {
      toast.warn('Start date cannot be in the past.');
      return;
    }
    if (new Date(newStartDate) > new Date(endDate)) {
      toast.warn('Start date cannot be after end date.');
      return;
    }
    if (new Date(newStartDate) < new Date(selectedModule.statingDate)) {
      toast.warn('Start date cannot be before module start date.');
      return;
    }
    setStartDate(newStartDate);
  };

  const handleEndDateChange = (e) => {
    const newEndDate = e.target.value;
    if (new Date(newEndDate) < new Date(startDate)) {
      toast.warn('End date cannot be before start date.');
      return;
    }
    if (new Date(newEndDate) > new Date(selectedModule.endingDate)) {
      toast.warn('End date cannot be after module end date.');
      return;
    }
    setEndDate(newEndDate);
  };

  const handleDayChange = (e) => {
    const newDay = e;

    if (!dayList.includes(newDay)) {
      const dates = [];
      let currentDate = new Date(startDate);
      while (currentDate <= new Date(endDate)) {
        if (currentDate.getDay() === days.indexOf(newDay)) {
          dates.push(currentDate.toISOString().split('T')[0]);
        }
        currentDate.setDate(currentDate.getDate() + 1);
      }
      if (dates.length > 0) {
        setLectureDateList((prevLectureDateList) => ({
          ...prevLectureDateList,
          [newDay]: dates,
        }));
      } else {
        toast.warn('No dates available for the selected day.');
        return;
      }
    } else {
      setLectureDateList((prevLectureDateList) => {
        const updatedLectureDateList = { ...prevLectureDateList };
        delete updatedLectureDateList[newDay];
        return updatedLectureDateList;
      });
    }

    setDayList((prevDay) => {
      const updatedDay = prevDay.includes(newDay)
        ? prevDay.filter((d) => d !== newDay)
        : [...prevDay, newDay];
      return updatedDay;
    });

    // Filter the timeSlotList for removing the day
    setTimeSlotList((prevTimeSlotList) => {
      const updatedTimeSlotList = [...prevTimeSlotList];
      if (dayList.includes(newDay)) {
        // If the day is already selected, remove it from the timeSlotList
        updatedTimeSlotList.splice(
          updatedTimeSlotList.findIndex((timeSlot) => timeSlot.day === newDay),
          1
        );
      }
      return updatedTimeSlotList;
    });
  };

  const handleRemoveDateInLectureDateList = (date, day) => {
    setLectureDateList((prevLectureDateList) => {
      const updatedLectureDateList = { ...prevLectureDateList };
      updatedLectureDateList[day] = updatedLectureDateList[day].filter((d) => d !== date);
      return updatedLectureDateList;
    });
  };

  const handleDaySelect = (event, newDay) => {
    if (newDay !== null) {
      setSelectedDay(newDay);
    }
  };

  useEffect(() => {
    if (!dayList.includes(selectedDay)) {
      setSelectedDay(dayList[0] || '');
    }
  }, [dayList]);

  const handleTimeSlotChange = (day, timeSlots) => {
    setTimeSlotList((prevTimeSlotList) => {
      const updatedTimeSlotList = [...prevTimeSlotList];
      const dayIndex = updatedTimeSlotList.findIndex((timeSlot) => timeSlot.day === day);
      if (dayIndex === -1) {
        updatedTimeSlotList.push({ day, timeSlots: timeSlots });
      } else {
        updatedTimeSlotList[dayIndex].timeSlots = timeSlots;
      }
      return updatedTimeSlotList;
    });
  };

  const handleDeleteTimeSlot = (day, index) => {
    setTimeSlotList((prevTimeSlotList) => {
      const updatedTimeSlotList = [...prevTimeSlotList];
      const dayIndex = updatedTimeSlotList.findIndex((timeSlot) => timeSlot.day === day);
      if (dayIndex !== -1) {
        updatedTimeSlotList[dayIndex].timeSlots.splice(index, 1);
        if (updatedTimeSlotList[dayIndex].timeSlots.length === 0) {
          updatedTimeSlotList.splice(dayIndex, 1);
        }
      }
      return updatedTimeSlotList;
    });
  };

  const handleSaveLectureTimeTable = async (e) => {
    e.preventDefault();

    const hasOverlappingTimeSlots = timeSlotList.some(({ timeSlots, day }) => {
      for (let i = 0; i < timeSlots.length; i++) {
        for (let j = i + 1; j < timeSlots.length; j++) {
          const { startTime: start1, endTime: end1, locationId: locationId1 } = timeSlots[i];
          const { startTime: start2, endTime: end2, locationId: locationId2 } = timeSlots[j];
          if (
            locationId1 === locationId2 &&
            ((start1 >= start2 && start1 < end2) ||
              (end1 > start2 && end1 <= end2) ||
              (start1 <= start2 && end1 >= end2))
          ) {
            toast.error(`Overlapping time slots are not allowed on ${day}.`);
            return true;
          }
        }
      }
      return false;
    });

    const hasEmptyTimeSlots = timeSlotList.some(({ timeSlots }) => {
      return timeSlots.some(({ startTime, endTime, locationId }) => {
        const isEmpty = startTime === '' || endTime === '' || locationId === null;
        if (isEmpty) {
          toast.error('Please fill in all the time slots.');
          return true;
        }
        return false;
      });
    });

    const timeSlotsHasNotIncludeDay = dayList.some((day) => {
      if (!timeSlotList.some((timeSlot) => timeSlot.day === day)) {
        toast.error('Please fill in all the time slots.');
        return true;
      }
      return false;
    });

    const data = {
      moduleId: selectedModuleId,
      startDate: startDate,
      endDate: endDate,
      dayList: dayList,
      dayScheduleList: timeSlotList,
      lectureDatesForDayList: lectureDateList,
    };
    console.log('TimeTable :', data);

    if (hasOverlappingTimeSlots || hasEmptyTimeSlots || timeSlotsHasNotIncludeDay) {
      return;
    }

    await axios.post('/api/v1/timetables/create-timetable', data).then((res) => {
      toast.success('Lectures are created successfully.');
      setCreatedLectureList(res.data);
      setShowCreatedLecturesDetails(true);
    });
  };

  const handleCheckLectureConflict = async (day, timeSlots) => {
    timeSlots.forEach((timeSlot, index) => {
      if (timeSlot.startTime && timeSlot.endTime && timeSlot.locationId) {
        const startTime = timeSlot.startTime;
        const endTime = timeSlot.endTime;
        const locationId = timeSlot.locationId;
        const lectureDatesForDay = lectureDateList[day] || [];

        lectureDatesForDay.forEach((lectureDate, index) => {
          const data = {
            lectureDate: lectureDate,
            startTime: startTime,
            endTime: endTime,
            locationId: locationId,
          };
          axios.post('/api/v1/lecture/check-lecture-conflict', data).then((res) => {
            if (res) {
              handleLectureDateConflict(lectureDate, res.data);
            }
          });
        });
      }
    });
  };

  const handleLectureDateConflict = (lectureDate, isConflict) => {
    if (isConflict === true) {
      setConflictLectureList((prevConflictLectureList) => {
        const updatedConflictLectureList = [...prevConflictLectureList];
        updatedConflictLectureList.push(lectureDate);
        return updatedConflictLectureList;
      });
      toast.warn('Lecture conflict found on ' + lectureDate);
    } else if (isConflict === false) {
      setConflictLectureList((prevConflictLectureList) => {
        const updatedConflictLectureList = [...prevConflictLectureList];
        const index = updatedConflictLectureList.indexOf(lectureDate);
        if (index !== -1) {
          updatedConflictLectureList.splice(index, 1);
        }
        return updatedConflictLectureList;
      });
    }
  };

  const handleCloseCreatedTimeTableViewModal = () => {
    setShowCreatedLecturesDetails(false);
    setCreatedLectureList([]);
    handleReset();
  };

  return (
    <div
      id="lecture-time-table"
      className="row px-3 lecture-time-table overflow-auto"
      style={{ height: '80vh' }}
    >
      <div className="col">
        <form onSubmit={handleSaveLectureTimeTable}>
          <div className="row justify-content-center mb-3">
            <div className="col-auto">
              <h5>Create Lecture TimeTable</h5>
            </div>
          </div>
          <div className={'row mb-3'}>
            <div className={'col'}>
              <label>Module Name</label>
              <Select
                id="selectModule"
                placeholder={'Select Module Name'}
                onChange={(e) => {
                  handleModuleChange(e);
                }}
                options={moduleList.map((module) => ({
                  value: module.id,
                  label: module.moduleName,
                }))}
                value={
                  selectedModuleId
                    ? {
                        value: selectedModuleId,
                        label: moduleList.find((module) => module.id === selectedModuleId)
                          ?.moduleName,
                      }
                    : null
                }
              />
            </div>
            <div className={'col'}>
              <label>Module Code</label>
              <Select
                id="selectModule"
                placeholder={'Select Module Code'}
                onChange={(e) => {
                  handleModuleChange(e);
                }}
                options={moduleList.map((module) => ({
                  value: module.id,
                  label: module.moduleCode,
                }))}
                value={
                  selectedModuleId
                    ? {
                        value: selectedModuleId,
                        label: moduleList.find((module) => module.id === selectedModuleId)
                          ?.moduleCode,
                      }
                    : null
                }
              />
            </div>
          </div>
          {selectedModule ? (
            <>
              <div className="row align-items-center my-2">
                <div className="col">
                  <label>Start Date:</label>
                  <input
                    type="date"
                    value={startDate}
                    min={today}
                    max={selectedModule?.endingDate}
                    onChange={handleStartDateChange}
                  />
                </div>
                <div className="col">
                  <label>End Date:</label>
                  <input
                    type="date"
                    value={endDate}
                    min={startDate}
                    max={selectedModule?.endingDate}
                    onChange={handleEndDateChange}
                  />
                </div>
              </div>
              <div className="row align-items-center my-2">
                <div className="col">
                  <div className="row">
                    <div className="col">Select Day</div>
                  </div>
                  <div className="row">
                    <ToggleButtonGroup
                      color="primary"
                      value={dayList}
                      onChange={(e) => {
                        handleDayChange(e.target.value);
                      }}
                      aria-label="Platform"
                      id="toggle-button"
                    >
                      <ToggleButton value="MONDAY">MON</ToggleButton>
                      <ToggleButton value="TUESDAY">TUE</ToggleButton>
                      <ToggleButton value="WEDNESDAY">WED</ToggleButton>
                      <ToggleButton value="THURSDAY">THU</ToggleButton>
                      <ToggleButton value="FRIDAY">FRI</ToggleButton>
                      <ToggleButton value="SATURDAY">SAT</ToggleButton>
                      <ToggleButton value="SUNDAY">SUN</ToggleButton>
                    </ToggleButtonGroup>
                  </div>
                </div>
              </div>
              {dayList.length > 0 ? (
                <>
                  <div className="row justify-content-center fw-bold mb-2">Create Time Slot</div>
                  <div className="row justify-content-center align-items-center">
                    <div className="col-auto">Select Day: </div>
                    <div className="col-auto">
                      <ToggleButtonGroup
                        color="success"
                        value={selectedDay}
                        exclusive
                        onChange={handleDaySelect}
                        aria-label="selected day"
                      >
                        {dayList.map((day) => (
                          <ToggleButton key={day} value={day}>
                            {day?.slice(0, 3)}
                          </ToggleButton>
                        ))}
                      </ToggleButtonGroup>
                    </div>
                    <div className="col-auto">
                      <button type="submit" className="btn btn-success">
                        Save
                      </button>
                    </div>
                  </div>
                  {selectedDay ? (
                    <>
                      {lectureDateList[selectedDay]?.length > 0 && (
                        <>
                          <div className="row justify-content-center align-items-center my-2">
                            Selected Dates
                          </div>
                          <div className="row justify-content-center align-items-center my-2">
                            {lectureDateList[selectedDay]?.map((date, index) => (
                              <div className="col-auto" key={index}>
                                <div className="row justify-content-center align-items-center">
                                  {SelectedDate({
                                    day: selectedDay,
                                    date: date,
                                    onDelete: handleRemoveDateInLectureDateList,
                                    index: index,
                                    conflictLectureList: conflictLectureList,
                                  })}
                                </div>
                              </div>
                            ))}
                          </div>
                        </>
                      )}
                      <div className="row justify-content-center align-items-center my-2">
                        Create Time Slot for {selectedDay}
                      </div>
                      <div className="row justify-content-center align-items-center my-2">
                        <div className="col">
                          <LectureTimeSlot
                            day={selectedDay}
                            handleTimeSlotChange={handleTimeSlotChange}
                            handleDeleteTimeSlot={handleDeleteTimeSlot}
                            selectedTimeSlots={
                              timeSlotList.find((timeSlot) => timeSlot.day === selectedDay)
                                ?.timeSlots || []
                            }
                            handleCheckLectureConflict={handleCheckLectureConflict}
                          />
                        </div>
                      </div>
                    </>
                  ) : (
                    <div className="row justify-content-center align-items-center">
                      <div className="col-auto">No Day Selected</div>
                    </div>
                  )}
                </>
              ) : (
                <div
                  className="row justify-content-center align-items-center"
                  style={{ height: '30vh' }}
                >
                  No Day Selected
                </div>
              )}
            </>
          ) : (
            <div
              className="row justify-content-center align-items-center"
              style={{ height: '50vh' }}
            >
              <div className="col-auto">No Module Selected</div>
            </div>
          )}
        </form>
      </div>
      <CreatedTimeTableViewModal
        handleClose={handleCloseCreatedTimeTableViewModal}
        lectureList={createdLectureList}
        show={showCreatedLecturesDetails}
        module={selectedModule}
      />
    </div>
  );
};

export default LectureTimeTable;
