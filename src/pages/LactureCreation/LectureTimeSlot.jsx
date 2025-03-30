import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import './LectureTimeSlot.css';

const LectureTimeSlot = ({
  selectedTimeSlots,
  day,
  handleTimeSlotChange,
  handleDeleteTimeSlot,
  handleCheckLectureConflict,
}) => {
  const [timeSlots, setTimeSlots] = useState([{ startTime: '', endTime: '', locationId: null }]);

  useEffect(() => {
    if (selectedTimeSlots && selectedTimeSlots.length > 0) {
      setTimeSlots(selectedTimeSlots);
    } else {
      setTimeSlots([{ startTime: '', endTime: '', locationId: null }]);
    }
  }, [selectedTimeSlots, day]);

  const locationList = useSelector((state) => state.locationList);

  const handleAddTimeSlot = (index) => {
    const newTimeSlots = timeSlots.map((slot) => ({ ...slot }));
    newTimeSlots.push({ startTime: '', endTime: '', locationId: null });
    setTimeSlots(newTimeSlots);
    handleTimeSlotChange(day, newTimeSlots);

    // scroll to to  id={'lecture-time-slot-' + index}
    const container = document.getElementById('lecture-time-slot-' + day + '-' + index);
    if (container) {
      container.scrollIntoView({ behavior: 'smooth', block: 'end' });
    }
  };

  const handleRemoveTimeSlot = (index) => {
    if (timeSlots.length === 1) {
      toast.warn('At least one time slot is required.');
      return;
    }
    const newTimeSlots = timeSlots.filter((_, i) => i !== index);
    setTimeSlots(newTimeSlots);
    handleDeleteTimeSlot(day, index);
  };

  const handleChange = (index, field, value) => {
    const newTimeSlots = timeSlots.map((slot, i) =>
      i === index ? { ...slot, [field]: value } : slot
    );

    if (
      field === 'startTime' &&
      newTimeSlots[index].endTime &&
      value >= newTimeSlots[index].endTime
    ) {
      toast.warn('Start time must be earlier than end time.');
      return;
    }

    if (
      field === 'endTime' &&
      newTimeSlots[index].startTime &&
      value <= newTimeSlots[index].startTime
    ) {
      toast.warn('End time must be later than start time.');
      return;
    }

    const hasNotEmptyTimeSlot = newTimeSlots.some(
      (slot) => slot.startTime && slot.endTime && slot.locationId
    );
    if (hasNotEmptyTimeSlot) {
      console.log('hasNotEmptyTimeSlot');
      handleCheckLectureConflict(day, newTimeSlots);
    }

    setTimeSlots(newTimeSlots);
    handleTimeSlotChange(day, newTimeSlots);
  };

  return (
    <div className="row">
      <div className="col">
        {timeSlots.map((slot, index) => (
          <div
            name={'lecture-time-slot-' + day + '-' + index}
            id={'lecture-time-slot-' + day + '-' + index}
            key={index}
            className="row align-items-center my-2 lecture-time-slot-container"
          >
            <div className="col">
              <div className="row align-items-center">
                <div className="col">
                  <label>Start Time:</label>
                  <input
                    type="time"
                    value={slot.startTime}
                    onChange={(e) => handleChange(index, 'startTime', e.target.value + ':00')}
                  />
                </div>
                <div className="col">
                  <label>End Time:</label>
                  <input
                    type="time"
                    value={slot.endTime}
                    onChange={(e) => handleChange(index, 'endTime', e.target.value + ':00')}
                  />
                </div>
                <div className="col">
                  <label>Venue:</label>
                  <select
                    required
                    value={slot.locationId || ''}
                    onChange={(e) =>
                      handleChange(index, 'locationId', Number.parseInt(e.target.value))
                    }
                    className="form-control mb-2"
                  >
                    <option value="">Select Venue</option>
                    {locationList.map((option, index) => (
                      <option key={index} value={option.locationId}>
                        {option.locationName}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="col-auto">
                  {index !== 0 && (
                    <div className="row justify-content-end align-items-center">
                      <div className="col-auto">
                        <button
                          type="button"
                          className="btn btn-danger"
                          onClick={() => handleRemoveTimeSlot(index)}
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                  )}
                  {index === timeSlots.length - 1 && (
                    <div className="row justify-content-center align-items-center my-2">
                      <div className="col-auto">
                        <button
                          type="button"
                          className="btn btn-primary"
                          onClick={() => handleAddTimeSlot(index)}
                        >
                          Add New Time Slot
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LectureTimeSlot;
