import React, { useState, useEffect } from "react";
import "./AdminDashboard.css";
import Table from "../../layout/AdminDashboardComponent/Table";
import TotalCount from "../../layout/AdminDashboardComponent/TotalCount";
import { FaUsers } from "react-icons/fa";
import { PiUsersFourFill } from "react-icons/pi";
import { FaSchool } from "react-icons/fa6";
import { IoNewspaperSharp } from "react-icons/io5";
import NormalButton from "../../layout/AdminDashboardComponent/NormalButton";
import { MdCreateNewFolder } from "react-icons/md";
import { RiDeleteBin5Fill } from "react-icons/ri";
import AdminUpdateEvent from "../Event/AdminUpdateEvent";
import AdminEventCreation from "../Event/AdminEventCreation";
import DeleteEventService from "../../../api/services/DeleteEventService";
import axios from "axios";
import FetchEventsService from "../../../api/services/FetchEventsService";

const AdminDashboard = () => {
  const [eventCreatePopUpWindow, setEventCreatePopUpWindow] = useState(false);
  const [eventUpdatePopUpWindow, setEventUpdatePopUpWindow] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [eventList, setEventList] = useState([]);

  useEffect(() => {
    // Fetch the list of events from the API using the new class
    handleReloadEventList();
  }, []);

  // Function to handle event click
  const handleEventClick = (event) => {
    setSelectedEvent(event);
    // Do whatever you want with the selected event data
    console.log("Selected Event:", event);
  };

  const handleDelete = async () => {
    try {
      const response = await DeleteEventService.deleteEvent(
        selectedEvent.eventId
      );
      // After deleting, you may want to update the event list
      // Fetch the updated event list
      handleReloadEventList();
    } catch (error) {
      console.log("error " + error);
    }
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

  return (
    <div className="admin-Dash">
      <p className="mainHead">Admin Dashboard</p>
      <div className="mainInform">
        <TotalCount
          total={"20"}
          countIcon={
            <FaUsers
              style={{ color: "white", padding: "2%", fontSize: "250%" }}
            />
          }
          countTitle={"Total Staffs"}
        />
        <TotalCount
          total={"201"}
          countIcon={
            <PiUsersFourFill
              style={{ color: "white", padding: "2%", fontSize: "250%" }}
            />
          }
          countTitle={"Total Students"}
        />
        <TotalCount
          total={"08"}
          countIcon={
            <FaSchool
              style={{ color: "white", padding: "2%", fontSize: "250%" }}
            />
          }
          countTitle={"Total Departments"}
        />
        <TotalCount
          total={"350"}
          countIcon={
            <IoNewspaperSharp
              style={{ color: "white", padding: "2%", fontSize: "250%" }}
            />
          }
          countTitle={"Total Modules"}
        />
      </div>
      <div className="SearchEvent">
        <p className="mainHead">Upcoming Events</p>
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
        />
      </div>
      <div className="AdminEventList">
        <Table
          handleUpdateEvent={() => setEventUpdatePopUpWindow(true)}
          onEventClick={handleEventClick}
          eventList={eventList} // Pass the eventList prop here
        />

        <div className="List-Buttons">
          <NormalButton
            handleClick={() => setEventCreatePopUpWindow(true)}
            title={"Create"}
            titlewithiconicon={<MdCreateNewFolder className="buttonIcon" />}
          />
          <NormalButton
            title={"Delete"}
            handleClick={handleDelete}
            titlewithiconicon={<RiDeleteBin5Fill className="buttonIcon" />}
          />
        </div>
      </div>
      {eventCreatePopUpWindow && (
        <div
          handleClick={() => setEventCreatePopUpWindow(false)}
          className="Admin-Create-Event-Dashboard"
        >
          <AdminEventCreation
            handlecloseCreateEventWindow={() =>
              setEventCreatePopUpWindow(false)
            }
            reloadEventList={handleReloadEventList}
          />
        </div>
      )}
      {eventUpdatePopUpWindow && (
        <div
          handleClick={() => setEventCreatePopUpWindow(false)}
          className="Admin-Create-Event-Dashboard"
        >
          <AdminUpdateEvent
            handlecloseCreateEventWindow={() =>
              setEventUpdatePopUpWindow(false)
            }
            selectedEvent={selectedEvent}
            reloadEventList={handleReloadEventList}
          />
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;
