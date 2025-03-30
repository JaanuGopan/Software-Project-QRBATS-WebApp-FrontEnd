import React, { useEffect, useState } from 'react';
import { MdArrowBack } from 'react-icons/md';
import EventService from '../../api/services/EventService';
import AppContentCard from '../../components/app-content-card/app-content-card';
import NormalButton from '../../components/buttons/NormalButton';
import EventAttendanceTable from '../../components/layout/AdminDashboardComponent/event-attendance-table';
import EventReportTable from '../../components/layout/AdminDashboardComponent/event-report-table';
import '../Staff/StaffA.css';

const EventReport = () => {
  const [eventReportTable, setEventReportTable] = useState(true);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [eventList, setEventList] = useState([]);
  const [search, setSearch] = useState('');
  const [selectedAttendance, setSelectedAttendance] = useState(null);
  const [attendanceList, setAttendanceList] = useState([]);

  useEffect(() => {
    handleReloadEventList();
  }, []);

  const handleEventClick = (event) => {
    setSelectedEvent(event);
  };

  const handleReloadEventList = async () => {
    EventService.getEventByUserID()
      .then((events) => {
        setEventList(events);
      })
      .catch((error) => {
        console.error('Error fetching events:', error);
      });
  };

  const handleAttendanceList = (attendanceStudentList) => {
    setAttendanceList(attendanceStudentList);
  };

  return (
    <div className="row">
      <div className="col">
        {eventReportTable ? (
          <>
            <div className="row py-2 justify-content-between align-items-center">
              <div className="col-auto fs-5 fw-bold ms-4">All Event Details</div>
              <div className="col-auto">
                <input
                  type="text"
                  placeholder="Search..."
                  style={{
                    width: '150px',
                    padding: '3px 40px',
                    border: '0.5px solid black',
                    borderRadius: '5px',
                    textAlign: 'center',
                  }}
                  onChange={(e) => setSearch(e.target.value)}
                />
              </div>
            </div>
            <AppContentCard>
              <EventReportTable
                handleOpenReportWindow={() => setEventReportTable(false)}
                search={search}
                onEventClick={handleEventClick}
                eventList={eventList}
                attendedStudentList={handleAttendanceList}
              />
            </AppContentCard>
          </>
        ) : (
          <>
            <div className="row py-2 justify-content-between align-items-center">
              <div className="col-auto fs-5 fw-bold ms-4">Event Attendance Details</div>
              <div className="col-auto">
                <input
                  type="text"
                  placeholder="Search..."
                  style={{
                    width: '150px',
                    padding: '3px 40px',
                    border: '0.5px solid black',
                    borderRadius: '5px',
                    textAlign: 'center',
                  }}
                  onChange={(e) => setSearch(e.target.value)}
                />
              </div>
            </div>
            <AppContentCard hasBottomContents={true}>
              <EventAttendanceTable search={search} attendanceList={attendanceList} />
            </AppContentCard>
            <div className="row px-5 justify-content-around">
              <div className="col-auto">
                <NormalButton
                  handleClick={() => setEventReportTable(true)}
                  title={'Back'}
                  icon={<MdArrowBack className="staff-buttonIcon" />}
                />
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default EventReport;
