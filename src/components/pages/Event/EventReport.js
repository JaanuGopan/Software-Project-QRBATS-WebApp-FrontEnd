import React, { useState } from "react";
import "../Staff/StaffA.css";
import EventReportTable from "../../layout/AdminDashboardComponent/EventReportTable";
import EventAttendancetable from "../../layout/AdminDashboardComponent/EventAttendancetable";
import NormalButton from "../../layout/AdminDashboardComponent/NormalButton";
import { MdArrowBack } from "react-icons/md";
import { BiSolidPrinter } from "react-icons/bi";

const EventReport = () => {
  const [eventReportTable, setEventReportTable] = useState(true);
  return (
    <div className="staff-Dash">
    {eventReportTable ? (<div>
      <div className="staff-SearchEvent">
        <p className="staff-mainHead">All Event Details</p>
        <input type="text" placeholder="Search..." style={{width:'150px', padding:'3px 40px', border:'0.5px solid black', borderRadius:'5px', textAlign:'center'}}/>
      </div>
      <div className="staff-EventList">
        <EventReportTable handleOpenReportWindow={()=>setEventReportTable(false)}/>
      </div>
    </div>): 
    (<div>
      <div className="staff-SearchEvent">
        <p className="staff-mainHead">Event Attendance Details</p>
        <input type="text" placeholder="Search..." style={{width:'150px', padding:'3px 40px', border:'0.5px solid black', borderRadius:'5px', textAlign:'center'}}/>
      </div>
      <div className="staff-EventList">
        <EventAttendancetable/>
        <div className="staff-List-Buttons">
            <NormalButton handleClick={()=>setEventReportTable(true)} title={"Back"} titlewithiconicon={<MdArrowBack className="staff-buttonIcon"/>}/>
            <NormalButton title={"Print"} titlewithiconicon={<BiSolidPrinter className="staff-buttonIcon"/>}/>
          </div>
      </div>
    </div>)
    }
    </div>
  );
}

export default EventReport;