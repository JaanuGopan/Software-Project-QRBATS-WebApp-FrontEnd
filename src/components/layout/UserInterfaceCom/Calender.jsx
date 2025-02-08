import React, { useState } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import '../../../pages/UserInterface/UserInterface.css';

const MyLiveCalendar = () => {
  const localizer = momentLocalizer(moment);
  /*const [events, setEvents] = useState([]);
  
  const fetchEvents = async ({ start, end }) => {
    const newEvents = [
      {
        id: 1,
        title: 'Event 1',
        start: moment().toDate(),
        end: moment().add(1, 'hour').toDate(),
      },
      // Add more events as needed
    ];
    setEvents([...events, ...newEvents]);
  };*/

  return (
    <div style={{ height: '65vh', width: '100%' }}>
      <h2 style={{ color: '#025587' }}>Calendar</h2>
      <Calendar
        localizer={localizer}
        startAccessor="start"
        endAccessor="end"
        views={['month', 'agenda', 'day']}
      />
    </div>
  );
};

export default MyLiveCalendar;
