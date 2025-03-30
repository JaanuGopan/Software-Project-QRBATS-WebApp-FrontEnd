import {
  DayPilot,
  DayPilotCalendar,
  DayPilotMonth,
  DayPilotNavigator,
} from '@daypilot/daypilot-lite-react';
import React, { useState } from 'react';
import './Calendar.css';

const Calendar = ({ events: initialEvents }) => {
  const [view, setView] = useState('Week');
  const [startDate, setStartDate] = useState(DayPilot.Date.today());
  const [events, setEvents] = useState(initialEvents);

  const [dayView, setDayView] = useState();
  const [weekView, setWeekView] = useState();
  const [monthView, setMonthView] = useState();

  const onTimeRangeSelected = async (args) => {
    const dp = args.control;
    const modal = await DayPilot.Modal.prompt('Create a new event:', 'Event 1');
    dp.clearSelection();
    if (modal.canceled) {
      return;
    }
    const e = {
      start: args.start,
      end: args.end,
      text: modal.result,
    };
    setEvents([...events, e]);
  };

  return (
    <div className={'container'}>
      <div className={'navigator'}>
        <DayPilotNavigator
          selectMode={view}
          showMonths={1}
          skipMonths={1}
          onTimeRangeSelected={(args) => setStartDate(args.day)}
          events={events}
        />
      </div>
      <div className={'content'}>
        <div className={'toolbar'}>
          <div className={'toolbar-group'}>
            <button onClick={() => setView('Day')} className={view === 'Day' ? 'selected' : ''}>
              Day
            </button>
            <button onClick={() => setView('Week')} className={view === 'Week' ? 'selected' : ''}>
              Week
            </button>
            <button onClick={() => setView('Month')} className={view === 'Month' ? 'selected' : ''}>
              Month
            </button>
          </div>
          <button onClick={() => setStartDate(DayPilot.Date.today())} className={'standalone'}>
            Today
          </button>
        </div>

        <DayPilotCalendar
          viewType={'Day'}
          startDate={startDate}
          events={events}
          visible={view === 'Day'}
          durationBarVisible={false}
          onTimeRangeSelected={onTimeRangeSelected}
          controlRef={setDayView}
        />
        <DayPilotCalendar
          viewType={'Week'}
          startDate={startDate}
          events={events}
          visible={view === 'Week'}
          durationBarVisible={false}
          onTimeRangeSelected={onTimeRangeSelected}
          controlRef={setWeekView}
        />
        <DayPilotMonth
          startDate={startDate}
          events={events}
          visible={view === 'Month'}
          eventBarVisible={false}
          onTimeRangeSelected={onTimeRangeSelected}
          controlRef={setMonthView}
        />
      </div>
    </div>
  );
};

export default Calendar;
