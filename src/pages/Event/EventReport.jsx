import React, { useState, useEffect, use, useContext } from 'react';
import '../Staff/StaffA.css';
import EventReportTable from '../../components/layout/AdminDashboardComponent/EventReportTable';
import EventAttendanceTable from '../../components/layout/AdminDashboardComponent/EventAttendancetable';
import NormalButton from '../../components/layout/AdminDashboardComponent/NormalButton';
import { MdArrowBack } from 'react-icons/md';
import { BiSolidPrinter } from 'react-icons/bi';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import EventService from '../../api/services/EventService';
import AttendanceService from '../../api/services/AttendanceService';
import { toast } from 'react-toastify';
import { CircularProgress } from '@mui/material';
import { AuthContext } from '../../config/AuthProvider';

const EventReport = () => {
  const [eventReportTable, setEventReportTable] = useState(true);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [eventList, setEventList] = useState([]);
  const [search, setSearch] = useState('');
  const [selectedAttendance, setSelectedAttendance] = useState(null);
  const [attendanceList, setAttendanceList] = useState([]);
  const { user } = useContext(AuthContext);
  const { userId } = user || {};

  useEffect(() => {
    handleReloadEventList();
  }, []);

  const handleEventClick = (event) => {
    setSelectedEvent(event);
    // Do whatever you want with the selected event data
    console.log('Selected Event:', event);
  };

  const handleReloadEventList = async () => {
    EventService.getEventByUserID(userId)
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

  const generatePDF = () => {
    const input = document.getElementById('table-to-print');
    html2canvas(input).then((canvas) => {
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF();
      pdf.addImage(imgData, 'PNG', 0, 0);
      pdf.save('table.pdf');
    });
  };

  const [loadingDownloadReport, setLoadingDownloadReport] = useState(false);

  const handleDownloadAttendanceEventReport = async (eventId) => {
    try {
      setLoadingDownloadReport(true);
      const response = await AttendanceService.downloadEventAttendance(eventId);
      if (response.status === 200) {
        const data = response.data;
        const blob = new Blob([data], { type: 'text/csv' });
        const link = document.createElement('a');
        link.href = URL.createObjectURL(blob);
        link.download = `event_${eventId}_attendance.csv`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      } else if (response.status === 400) {
        toast.error(response.data);
      } else {
        toast.error('Error In Downloading Report.');
      }
    } finally {
      setLoadingDownloadReport(false);
    }
  };

  return (
    <div className="staff-Dash">
      {eventReportTable ? (
        <div>
          <div className="staff-SearchEvent">
            <p className="staff-mainHead">All Event Details</p>
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
          <div className="staff-EventList">
            <EventReportTable
              handleOpenReportWindow={() => setEventReportTable(false)}
              search={search}
              onEventClick={handleEventClick}
              eventList={eventList}
              attendedStudentList={handleAttendanceList}
            />
          </div>
        </div>
      ) : (
        <div>
          <div className="staff-SearchEvent">
            <p className="staff-mainHead">Event Attendance Details</p>
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

          <div id="table-to-print" className="staff-EventList">
            <EventAttendanceTable search={search} attendanceList={attendanceList} />
            <div className="staff-List-Buttons">
              <NormalButton
                handleClick={() => setEventReportTable(true)}
                title={'Back'}
                titlewithiconicon={<MdArrowBack className="staff-buttonIcon" />}
              />
              {loadingDownloadReport ? (
                <CircularProgress />
              ) : (
                <NormalButton
                  title={'Print'}
                  handleClick={() => handleDownloadAttendanceEventReport(selectedEvent.eventId)}
                  titlewithiconicon={<BiSolidPrinter className="staff-buttonIcon" />}
                />
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default EventReport;
