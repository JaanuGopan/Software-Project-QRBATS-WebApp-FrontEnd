import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { BiSolidSave } from 'react-icons/bi';
import { IoMdCloseCircleOutline } from 'react-icons/io';
import { MdDelete } from 'react-icons/md';
import { useSelector } from 'react-redux';
import Select from 'react-select';
import ModuleService from '../../api/services/ModuleService';
import NormalButton from '../buttons/NormalButton';
import './TimeSlot.css';

const daysOfWeek = ['SUNDAY', 'MONDAY', 'TUESDAY', 'WEDNESDAY', 'THURSDAY', 'FRIDAY', 'SATURDAY'];

const SelectedDate = ({ date, onDelete }) => (
  <div className="selected-date">
    <button className="date-btn">{date.toDateString()}</button>
    <button className="delete-btn" onClick={() => onDelete(date)}>
      <MdDelete />
    </button>
  </div>
);

const TimeSlot = ({ lecture, onDelete }) => {
  const [dayOfWeek, setDayOfWeek] = useState('MONDAY');
  const [startTime, setStartTime] = useState('08:30');
  const [endTime, setEndTime] = useState('10:30');
  const [locationId, setLocationId] = useState();
  const [dates, setDates] = useState([]);
  const [startDate, setStartDate] = useState();
  const [endDate, setEndDate] = useState();
  const locationList = useSelector((state) => state.locationList);
  const [selectedModuleId, setSelectedModuleId] = useState();
  const [selectedModule, setSelectedModule] = useState(null);
  const [moduleList, setModuleList] = useState([]);

  useEffect(() => {
    ModuleService.getModulesByUserId().then((res) => {
      setModuleList(res);
    });
  }, []);

  useEffect(() => {
    const start = new Date(startDate);
    const end = new Date(endDate);
    const dayIndex = daysOfWeek.indexOf(dayOfWeek);
    const result = [];

    for (let d = new Date(start); d <= end; d.setDate(d.getDate() + 1)) {
      if (d.getDay() === dayIndex) {
        result.push(new Date(d));
      }
    }

    setDates(result);
  }, [dayOfWeek, startDate, endDate, selectedModuleId]);

  const handleDateDelete = (date) => {
    setDates(dates.filter((d) => d.getTime() !== date.getTime()));
  };

  const handleDateRange = (module) => {
    setStartDate(module.statingDate);
    setEndDate(module.endingDate);
  };

  const handleSaveTimeTable = async () => {
    const timeTable = {
      moduleId: selectedModuleId,
      dayOfWeek: dayOfWeek,
      startingDate: startDate,
      validDate: endDate,
      startTime: startTime,
      endTime: endTime,
      locationId: locationId,
      lectureDateList: dates,
    };
    console.log('TimeTable : ', timeTable);

    await axios.post('/api/v1/timetables/create-timetable', timeTable);
  };

  return (
    <div className="row ms-1 timeslot-card">
      <div className="col-auto me-0 delete-timeslot-btn">
        <IoMdCloseCircleOutline className="close-icon" onClick={onDelete} />
      </div>
      <div className="col">
        <div className={'row mb-3 select-container'}>
          <div className={'col'}>
            <label>Module Name</label>
            <Select
              id="selectModule"
              placeholder={'Select Module Code'}
              onChange={(e) => {
                setSelectedModuleId(e.value);
                const module = moduleList.find((module) => module.id === e.value);
                setSelectedModule(module);
                handleDateRange(module);
              }}
              options={moduleList.map((module) => ({ value: module.id, label: module.moduleName }))}
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
                setSelectedModuleId(e.value);
                const module = moduleList.find((module) => module.id === e.value);
                setSelectedModule(module);
                handleDateRange(module);
              }}
              options={moduleList.map((module) => ({ value: module.id, label: module.moduleCode }))}
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

        {selectedModuleId && (
          <>
            <div className="row align-items-center my-2">
              <div className="col">
                <label>Start Date:</label>
                <input
                  type="date"
                  value={startDate}
                  min={selectedModule?.statingDate}
                  max={selectedModule?.endingDate}
                  onChange={(e) => setStartDate(e.target.value)}
                />
              </div>
              <div className="col">
                <label>End Date:</label>
                <input
                  type="date"
                  value={endDate}
                  min={startDate}
                  max={selectedModule?.endingDate}
                  onChange={(e) => setEndDate(e.target.value)}
                />
              </div>
            </div>
            <div className="row align-items-center my-2">
              <div className="col">
                <label>Day of week:</label>
                <select value={dayOfWeek} onChange={(e) => setDayOfWeek(e.target.value)}>
                  {daysOfWeek.map((day) => (
                    <option key={day} value={day}>
                      {day}
                    </option>
                  ))}
                </select>
              </div>
              <div className="col">
                <label>Venue:</label>
                <select
                  value={locationId}
                  onChange={(e) => setLocationId(parseInt(e.target.value))}
                >
                  <option value="">Select Venue</option>
                  {locationList.map((option) => (
                    <option key={option.locationId} value={option.locationId}>
                      {option.locationName}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <div className="row align-items-center my-2">
              <div className="col">
                <label>Start Time:</label>
                <input
                  type="time"
                  value={startTime}
                  onChange={(e) => setStartTime(e.target.value)}
                />
              </div>
              <div className="col">
                <label>End Time:</label>
                <input type="time" value={endTime} onChange={(e) => setEndTime(e.target.value)} />
              </div>
            </div>
          </>
        )}
      </div>
      {dates.length > 0 && selectedModuleId && (
        <div className="row mt-2">
          <div className="col">
            <div className="row mb-1">Selected Lectures</div>
            <div className="row">
              <div className="col">
                <div className="row">
                  {dates.map((date, index) => (
                    <div key={index} className="col-auto">
                      <SelectedDate date={date} onDelete={handleDateDelete} />
                    </div>
                  ))}
                </div>
              </div>
              <div className="col-auto d-flex align-items-center">
                <NormalButton
                  handleClick={handleSaveTimeTable}
                  title={'Save'}
                  icon={<BiSolidSave className="buttonIcon" />}
                  type={'save'}
                />
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TimeSlot;
