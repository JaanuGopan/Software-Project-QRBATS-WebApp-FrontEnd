import React, { useState, useEffect } from "react";
import "../Staff/StaffA.css";
import EventReportTable from "../../components/layout/AdminDashboardComponent/EventReportTable";
import EventAttendancetable from "../../components/layout/AdminDashboardComponent/EventAttendancetable";
import NormalButton from "../../components/layout/AdminDashboardComponent/NormalButton";
import { MdArrowBack } from "react-icons/md";
import { BiSolidPrinter } from "react-icons/bi";
import FetchEventsService from "../../api/services/FetchEventsService";
import FetchAttendanceByEventIdService from "../../api/services/FetchAttendanceByEventIdService";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";

const EventReport = () => {
  const [eventReportTable, setEventReportTable] = useState(true);

  const [selectedEvent, setSelectedEvent] = useState(null);
  const [eventList, setEventList] = useState([]);
  const [search, setSearch] = useState("");

  const [selectedAttendance, setSelectedAttendance] = useState(null);
  const [attendanceList, setAttendanceList] = useState([]);

  useEffect(() => {
    // Fetch the list of events from the API using the new class
    handleReloadEventList();
  }, []);

  const handleEventClick = (event) => {
    setSelectedEvent(event);
    // Do whatever you want with the selected event data
    console.log("Selected Event:", event);
  };

  const handleReloadEventList = async () => {
    FetchEventsService.fetchEvents()
      .then((events) => {
        setEventList(events);
      })
      .catch((error) => {
        console.error("Error fetching events:", error);
      });
  };

  const handleAttendenceList = (attendanceStudentList) => {
    setAttendanceList(attendanceStudentList);
  };

  const generatePDF = () => {
    const input = document.getElementById("table-to-print");
    html2canvas(input).then((canvas) => {
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF();
      pdf.addImage(imgData, "PNG", 0, 0);
      pdf.save("table.pdf");
    });
  };

  const handleGeneratePDF = () => {
    generatePDF();
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
                width: "150px",
                padding: "3px 40px",
                border: "0.5px solid black",
                borderRadius: "5px",
                textAlign: "center",
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
              attendedStudentList={handleAttendenceList}
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
                width: "150px",
                padding: "3px 40px",
                border: "0.5px solid black",
                borderRadius: "5px",
                textAlign: "center",
              }}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          <div id="table-to-print" className="staff-EventList">
            <EventAttendancetable
              search={search}
              attendanceList={attendanceList}
            />
            <div className="staff-List-Buttons">
              <NormalButton
                handleClick={() => setEventReportTable(true)}
                title={"Back"}
                titlewithiconicon={<MdArrowBack className="staff-buttonIcon" />}
              />
              <NormalButton
                title={"Print"}
                handleClick={handleGeneratePDF}
                titlewithiconicon={
                  <BiSolidPrinter className="staff-buttonIcon" />
                }
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default EventReport;
