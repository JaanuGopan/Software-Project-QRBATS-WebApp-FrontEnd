import { DayPilot } from '@daypilot/daypilot-lite-react';
import React, { useEffect, useState } from 'react';
import LectureService from '../../api/services/LectureService';
import Calendar from '../../components/calendar/Calendar';

const CalendarPage = () => {
  const [lectureList, setLectureList] = useState([]);

  const fetchLectureList = async () => {
    const response = await LectureService.getAllLectureWithDateByLectureId();
    setLectureList(response.data);
  };

  useEffect(() => {
    fetchLectureList();
  }, []);

  const getRandomColor = () => {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  };

  const sampleLectureList = [
    {
      id: 1,
      title: 'Introduction to Java',
      description: 'Covering Java basics and syntax.',
      moduleId: 101,
      startTime: DayPilot.Date.today().addHours(9),
      endTime: DayPilot.Date.today().addHours(11),
      status: 'SCHEDULED',
      createdBy: 'user123',
      createdDate: '2023-09-20T15:30:00',
      updatedDate: '2023-09-25T09:45:00',
    },
    {
      id: 2,
      title: 'Spring Framework Basics',
      description: 'Introduction to Dependency Injection and IOC.',
      moduleId: 102,
      startTime: DayPilot.Date.today().addHours(12),
      endTime: DayPilot.Date.today().addHours(13),
      status: 'COMPLETED',
      createdBy: 'user123',
      createdDate: '2023-09-21T16:00:00',
      updatedDate: '2023-10-05T17:00:00',
    },
  ];

  const lectures = lectureList.length > 0 ? lectureList : sampleLectureList;

  const calendarData = lectures.map((lecture) => ({
    id: lecture.id,
    text: lecture.title,
    start: lecture.startTime,
    end: lecture.endTime,
    backColor: getRandomColor(),
    borderColor: 'darker',
  }));

  return (
    <div className="row h-100">
      <div className="col">
        <div className="row my-3 justify-content-between align-items-center">
          <div className="col-auto fs-4 fw-bold ms-4">Calendar</div>
        </div>
        <div className="row">
          <Calendar events={calendarData} />
        </div>
      </div>
    </div>
  );
};

export default CalendarPage;
