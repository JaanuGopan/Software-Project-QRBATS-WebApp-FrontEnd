import React, { useState, useEffect } from "react";
import "./StaffA.css";
import NormalButton from "../../components/layout/AdminDashboardComponent/NormalButton";
import { MdCreateNewFolder } from "react-icons/md";
import { RiDeleteBin5Fill } from "react-icons/ri";
import CreateStaff from "./CreateStaff";
import UpdateStaff from "./UpdateStaff";
import StaffTable from "../../components/layout/AdminDashboardComponent/StaffTable";
import FetchStaffService from "../../api/services/FetchStaffService";
import DeleteStaffService from "../../api/services/DeleteStaffService";

const StaffDashboard = () => {
  const [staffCreatePopUpWindow, setStaffCreatePopUpWindow] = useState(false);
  const [staffUpdatePopUpWindow, setStaffUpdatePopUpWindow] = useState(false);
  const [search, setSearch] = useState("");

  const [staffsList, setStaffsList] = useState([]);
  const [selectedStaff, setSelectedStaff] = useState(null);

  useEffect(() => {
    // Fetch the list of staffs from the API
    handleReloadStaffList();
  }, []);

  const handleEventClick = (staffs) => {
    setSelectedStaff(staffs);
    // Do whatever you want with the selected event data
    console.log("Selected Staffs:", staffs);
  };

  const handleDelete = async () => {
    try {
      const response = await DeleteStaffService.deleteStaff(
        selectedStaff.userId
      );
      handleReloadStaffList();
    } catch (error) {
      console.log("error " + error);
    }
  };

  const handleReloadStaffList = async () => {
    FetchStaffService.fetchStaffs()
      .then((staffs) => {
        setStaffsList(staffs);
      })
      .catch((error) => {
        console.error("Error fetching staffs:", error);
      });
  };

  return (
    <div className="staff-Dash">
      <div className="staff-SearchEvent">
        <p className="staff-mainHead">Staff Details</p>
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
        <StaffTable
          search={search}
          handleUpdateStaff={() => setStaffUpdatePopUpWindow(true)}
          onStaffClick={handleEventClick}
          staffsList={staffsList}
        />
        <div className="staff-List-Buttons">
          <NormalButton
            handleClick={() => setStaffCreatePopUpWindow(true)}
            title={"Create"}
            titlewithiconicon={
              <MdCreateNewFolder className="staff-buttonIcon" />
            }
          />
          <NormalButton
            title={"Delete"}
            handleClick={handleDelete}
            titlewithiconicon={
              <RiDeleteBin5Fill className="staff-buttonIcon" />
            }
          />
        </div>
      </div>
      {staffCreatePopUpWindow && (
        <div
          handleClick={() => setStaffCreatePopUpWindow(false)}
          className="staff-Create-Event-Dashboard"
        >
          <CreateStaff
            handlecloseCreateStaffWindow={() =>
              setStaffCreatePopUpWindow(false)
            }
          />
        </div>
      )}
      {staffUpdatePopUpWindow && (
        <div
          handleClick={() => setStaffCreatePopUpWindow(false)}
          className="staff-Create-Event-Dashboard"
        >
          <UpdateStaff
            handlecloseUpdateStaffWindow={() =>
              setStaffUpdatePopUpWindow(false)
            }
            selectedStaff={selectedStaff}
            handleReloadStaffList={handleReloadStaffList}
          />
        </div>
      )}
    </div>
  );
};

export default StaffDashboard;
