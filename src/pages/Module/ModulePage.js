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

const ModulePage = () => {
  const [moduleTable, setModuleTable] = useState(true);

  const [selectedModule, setSelectedModule] = useState(null);
  const [moduleList, setModuleList] = useState([]);
  const [search, setSearch] = useState("");

  const [selectedEvent, setSelectedEvent] = useState(null);
  const [eventList, setEventList] = useState([]);

  useEffect(() => {
    // Fetch the list of events from the API using the new class
    handleReloadModuleList();
  }, []);

  const handleModuleClick = (module) => {
    setSelectedEvent(module);
    // Do whatever you want with the selected event data
    console.log("Selected Event:", module);
  };

  const handleReloadModuleList = async () => {
    // TODO: Fetch the list of events from the API
    FetchEventsService.fetchEvents()
      .then((events) => {
        setEventList(events);
      })
      .catch((error) => {
        console.error("Error fetching events:", error);
      });
  };

  const handleEventList = (eventList) => {
    setEventList(eventList);
  };


  return (
    <div className="staff-Dash">
      {moduleTable ? (
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
            <ModuleTable
              handleOpenReportWindow={() => setModuleTable(false)}
              search={search}
              onEventClick={handleModuleClick}
              moduleList={moduleList}
              eventList={handleEventList}
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
