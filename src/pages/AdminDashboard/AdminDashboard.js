import React, { useState, useEffect } from "react";
import "./AdminDashboard.css";
import Table from "../../components/layout/AdminDashboardComponent/Table";
import TotalCount from "../../components/layout/AdminDashboardComponent/TotalCount";
import { FaUsers } from "react-icons/fa";
import { PiUsersFourFill } from "react-icons/pi";
import { FaSchool } from "react-icons/fa6";
import { IoNewspaperSharp } from "react-icons/io5";
import NormalButton from "../../components/layout/AdminDashboardComponent/NormalButton";
import { MdCreateNewFolder } from "react-icons/md";
import { RiDeleteBin5Fill } from "react-icons/ri";
import AdminUpdateEvent from "../Event/AdminUpdateEvent";
import AdminEventCreation from "../Event/AdminEventCreation";
import DeleteEventService from "../../api/services/DeleteEventService";
import FetchEventsService from "../../api/services/FetchEventsService";
import LocationService from "../../api/services/LocationService";

const AdminDashboard = () => {
  const [eventCreatePopUpWindow, setEventCreatePopUpWindow] = useState(false);
  const [eventUpdatePopUpWindow, setEventUpdatePopUpWindow] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [eventList, setEventList] = useState([]);
  const [search, setSearch] = useState("");
  const [venuesList, setVenuesList] = useState([]);

  const handleGetLocationNameList = async () => {
    const response = await LocationService.getAllLocationNames();
    setVenuesList(response);
  };

  useEffect(() => {
    // Fetch the list of events from the API using the new class
    handleReloadEventList();
    handleGetLocationNameList();
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
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>
      <div className="AdminEventList">
        <Table
          search={search}
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
            locationList={venuesList}
            showCloseButton={true}
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
            locationNameList={venuesList}
          />
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;
