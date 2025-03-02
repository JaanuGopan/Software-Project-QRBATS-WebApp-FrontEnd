import React, { useEffect, useState } from 'react';
import { MdDelete } from 'react-icons/md';
import './TimeSlot.css';
import { useSelector } from 'react-redux';

const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

const SelectedDate = ({ date, onDelete }) => (
  <div className="selected-date">
    <button className="date-btn">{date.toDateString()}</button>
    <button className="delete-btn" onClick={() => onDelete(date)}>
      <MdDelete />
    </button>
  </div>
);

const formatDate = (date) => {
  const d = new Date(date);
  const month = `${d.getMonth() + 1}`.padStart(2, '0');
  const day = `${d.getDate()}`.padStart(2, '0');
  const year = d.getFullYear();
  return `${year}-${month}-${day}`;
};

const TimeSlot = ({ lecture, onDelete, module }) => {
  const [dayOfWeek, setDayOfWeek] = useState('Monday');
  const [startTime, setStartTime] = useState('08:30');
  const [endTime, setEndTime] = useState('10:30');
  const [locationId, setLocationId] = useState();
  const [isVerified, setIsVerified] = useState(false);
  const [dates, setDates] = useState([]);
  const [startDate, setStartDate] = useState(module ? module.statingDate : new Date());
  const [endDate, setEndDate] = useState(module ? module.endingDate : new Date());
  const locationList = useSelector((state) => state.locationList);

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
  }, [dayOfWeek, startDate, endDate]);

  useEffect(() => {
    setStartDate(module?.statingDate);
    setEndDate(module?.endingDate);
  }, [module]);

  const handleDateDelete = (date) => {
    setDates(dates.filter((d) => d.getTime() !== date.getTime()));
  };

  return (
    <div className="timeslot-card">
      <div className="row align-items-center">
        <div className={'row'}>{module?.moduleName}</div>
        <div className="row align-items-center mt-2">
          <div className="col">
            <label>Start Date:</label>
            <input
              type="date"
              value={formatDate(startDate)}
              onChange={(e) => setStartDate(e.target.value)}
            />
          </div>
          <div className="col">
            <label>End Date:</label>
            <input
              type="date"
              value={formatDate(endDate)}
              onChange={(e) => setEndDate(e.target.value)}
            />
          </div>
          <div className="col-auto">
            <MdDelete className="delete-timeslot-btn" onClick={onDelete} />
          </div>
        </div>
        <div className="col">
          <select value={dayOfWeek} onChange={(e) => setDayOfWeek(e.target.value)}>
            {daysOfWeek.map((day) => (
              <option key={day} value={day}>
                {day}
              </option>
            ))}
          </select>
        </div>
        <div className="col">
          <input type="time" value={startTime} onChange={(e) => setStartTime(e.target.value)} />
        </div>
        <div className="col">
          <input type="time" value={endTime} onChange={(e) => setEndTime(e.target.value)} />
        </div>
        <div className="col">
          <select value={locationId} onChange={(e) => setLocationId(e.target.value)}>
            <option value="">Select Venue</option>
            {locationList.map((option, index) => (
              <option key={index} value={option.locationId}>
                {option.locationName}
              </option>
            ))}
          </select>
        </div>
      </div>
      <div className="row mt-2">
        {dates.map((date, index) => (
          <div key={index} className="col-auto">
            <SelectedDate key={index} date={date} onDelete={handleDateDelete} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default TimeSlot;
