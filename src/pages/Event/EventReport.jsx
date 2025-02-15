import { CircularProgress } from '@mui/material';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import React, { useContext, useEffect, useState } from 'react';
import { BiSolidPrinter } from 'react-icons/bi';
import { MdArrowBack } from 'react-icons/md';
import { toast } from 'react-toastify';
import AttendanceService from '../../api/services/AttendanceService';
import EventService from '../../api/services/EventService';
import AppContentCard from '../../components/app-content-card/app-content-card';
import NormalButton from '../../components/buttons/NormalButton';
import EventAttendanceTable from '../../components/layout/AdminDashboardComponent/event-attendance-table';
import EventReportTable from '../../components/layout/AdminDashboardComponent/event-report-table';
import { AuthContext } from '../../config/AuthProvider';
import '../Staff/StaffA.css';

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
    <div className="row">
      <div className="col">
        {eventReportTable ? (
          <>
            <div className="row py-2 justify-content-between align-items-center">
              <div className="col-auto fs-3 fw-bold ms-4">All Event Details</div>
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
              <div className="col-auto fs-3 fw-bold ms-4">Event Attendance Details</div>
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
              <div className="col-auto">
                {loadingDownloadReport ? (
                  <CircularProgress />
                ) : (
                  <NormalButton
                    title={'Print'}
                    handleClick={() => handleDownloadAttendanceEventReport(selectedEvent.eventId)}
                    icon={<BiSolidPrinter className="staff-buttonIcon" />}
                  />
                )}
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default EventReport;
