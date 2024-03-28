import React, { useState } from "react";
import "./StaffA.css";
import NormalButton from "../../layout/AdminDashboardComponent/NormalButton";
import { MdCreateNewFolder } from "react-icons/md";
import { RiDeleteBin5Fill } from "react-icons/ri";
import CreateStaff from "./CreateStaff";
import UpdateStaff from "./UpdateStaff";
import StaffTable from "../../layout/AdminDashboardComponent/StaffTable";

const StaffDashboard = () => {
    const [staffCreatePopUpWindow, setStaffCreatePopUpWindow]=useState(false);
    const [staffUpdatePopUpWindow, setStaffUpdatePopUpWindow] = useState(false);
    const [search, setSearch] = useState('')
  return (
    <div className="staff-Dash">
        <div className="staff-SearchEvent">
          <p className="staff-mainHead">Staff Details</p>
          <input onChange={(e)=>setSearch(e.target.value)} type="text" placeholder="Search..." style={{width:'150px', padding:'3px 40px', border:'0.5px solid black', borderRadius:'5px', textAlign:'center'}}/>
        </div>
        <div className="staff-EventList">
          <StaffTable search={search} handleUpdateStaff={()=>setStaffUpdatePopUpWindow(true)}/>
          <div className="staff-List-Buttons">
            <NormalButton handleClick={()=>setStaffCreatePopUpWindow(true)} title={"Create"} titlewithiconicon={<MdCreateNewFolder className="staff-buttonIcon"/>}/>
            <NormalButton title={"Delete"} titlewithiconicon={<RiDeleteBin5Fill className="staff-buttonIcon"/>}/>
          </div>
        </div>
        {staffCreatePopUpWindow && (<div handleClick={()=>setStaffCreatePopUpWindow(false)} className="staff-Create-Event-Dashboard">
          <CreateStaff handlecloseCreateStaffWindow={()=>setStaffCreatePopUpWindow(false)}/>
        </div>)}
        {staffUpdatePopUpWindow && (<div handleClick={()=>setStaffCreatePopUpWindow(false)} className="staff-Create-Event-Dashboard">
          <UpdateStaff handlecloseUpdateStaffWindow={()=>setStaffUpdatePopUpWindow(false)}/>
        </div>)}
      </div>
  );
}

export default StaffDashboard;