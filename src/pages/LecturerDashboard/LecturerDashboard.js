import React, { useState, useEffect } from "react";
import "../AdminDashboard/AdminDashboard.css";
import "./LectureDashboard.css";
import LectureTable from "./LectureTable";
import TotalCount from "../../components/layout/AdminDashboardComponent/TotalCount";
import Select from "react-select";
import { FaSchool } from "react-icons/fa6";
import { IoNewspaperSharp } from "react-icons/io5";
import NormalButton from "../../components/layout/AdminDashboardComponent/NormalButton";
import { MdCreateNewFolder } from "react-icons/md";
import { RiDeleteBin5Fill } from "react-icons/ri";
import LectureCreation from "./LectureCreation";
import EventService from "../../api/services/EventService";
import { useSelector } from "react-redux";
import { selectUser } from "../../redux/features/userSlice";
import AdminUpdateEvent from "../Event/AdminUpdateEvent";
import LocationService from "../../api/services/LocationService";
import LectureService from "../../api/services/LectureService";
import LecturesTable from "../Lectures/LecturesTable";
import LecturesEdit from "../Lectures/LecturesEdit";
import LectureCreationPage from "../LactureCreation/LectureCreationPage";

const LecturerDashboard = () => {
  const [showCreateLecturePopup, setShowCreateLecturePopup] = useState(false);
  const [showUpdateLecturePopup, setShowUpdateLecturePopup] = useState(false);
  const [eventLectureList, setEventLectureList] = useState([]);
  const [selectedLecture, setSelectedLecture] = useState(null);
  const [selectedEventLecture, setSelectedEventLecture] = useState(null);
  const [searchLecture, setSearchLecture] = useState("");
  const [selectTable, setSelectTable] = useState("Lectures");
  const [title, setTitle] = useState("Lecture");
  const [venuesList, setVenuesList] = useState([]);
  const user = useSelector(selectUser);
  const { userId } = user || {};

  const [lectureList, setLectureList] = useState([]);

  const handleReloadEventLectureList = async () => {
    EventService.getEventByUserID(userId)
      .then((list) => {
        setEventLectureList(list);
        console.log(eventLectureList);
      })
      .catch((error) => {
        console.log("Error in getting lecture list ", error);
      })
      .finally(() => {});
  };
  //=====================================================================================
  const [showEditLectureWindow, setShowEditLectureWindow] = useState(false);
  const [editLecture, setEditLecture] = useState(null);

  const handleReloadLectureList = async () => {
    const response = await LectureService.getAllLecturesByUserId(userId);
    if (response) {
      setLectureList(response);
      console.log("lecture list : ", response);
    }
  };

  const handleEditLecture = (lecture) => {
    if (lecture) {
      setEditLecture(lecture);
      setShowEditLectureWindow(true);
    }
  };

  const handleDeleteLecture = async () => {
    const response = await LectureService.deleteLecture(
      selectedLecture.lectureId
    );
    handleReloadLectureList();
  };

  //=====================================================================================

  const handleGetLocationNameList = async () => {
    const response = await LocationService.getAllLocationNames();
    setVenuesList(response);
  };

  useEffect(() => {
    handleReloadEventLectureList();
    handleGetLocationNameList();
    handleReloadLectureList();
  }, []);

  const handleDeleteEventLecture = async () => {
    if (selectedEventLecture) {
      EventService.deleteEvent(selectedEventLecture.eventId).then(() => {
        console.log("deleted successfully ");
        handleReloadEventLectureList();
        setSelectedEventLecture(null);
      });
    }
  };

  const handleEventLectureClick = (lecture) => {
    setSelectedEventLecture(lecture);
  };

  const handleChange = (e) => {
    setSelectTable(e.target.value);
  };

  return (
    <div className="admin-Dash">
      <p className="mainHead">{"Lecturer Dashboard"}</p>
      <div className="mainInform">
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
        <select
          style={{ border: "0px", cursor: "pointer" }}
          value={selectTable}
          onChange={(e) => {
            handleChange(e);
          }}
          className="mainHead"
        >
          <option value="Lectures">Lectures List</option>
          <option value="Events">Events List</option>
        </select>
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
          onChange={(e) => setSearchLecture(e.target.value)}
        />
      </div>
      {selectTable === "Lectures" ? (
        <div className="AdminEventList">
          <LecturesTable
            lecturesList={lectureList}
            search={searchLecture}
            onLectureClick={(e) => {
              setSelectedLecture(e);
            }}
            handleLectureUpdate={(lecture) => {
              handleEditLecture(lecture);
            }}
          />

          <div className="List-Buttons">
            <NormalButton
              handleClick={() => setShowCreateLecturePopup(true)}
              title={"Create Lecture"}
              titlewithiconicon={<MdCreateNewFolder className="buttonIcon" />}
            />
            <NormalButton
              title={"Delete"}
              handleClick={handleDeleteLecture}
              titlewithiconicon={<RiDeleteBin5Fill className="buttonIcon" />}
            />
          </div>
        </div>
      ) : (
        <div className="AdminEventList">
          <LectureTable
            search={searchLecture}
            handleUpdateLecture={() => setShowUpdateLecturePopup(true)}
            onLectureClick={handleEventLectureClick}
            lectureList={eventLectureList} // Pass the eventList prop here
          />

          <div className="List-Buttons">
            <NormalButton
              handleClick={() => setShowCreateLecturePopup(true)}
              title={"Create Event"}
              titlewithiconicon={<MdCreateNewFolder className="buttonIcon" />}
            />
            <NormalButton
              title={"Delete"}
              handleClick={handleDeleteEventLecture}
              titlewithiconicon={<RiDeleteBin5Fill className="buttonIcon" />}
            />
          </div>
        </div>
      )}
      {showCreateLecturePopup && (
        <div
          handleClick={() => setShowCreateLecturePopup(false)}
          className="Create-Lecture-Window"
        >
          {selectTable === "Events" && (
            <LectureCreation
              handleCloseCreateLectureWindow={() =>
                setShowCreateLecturePopup(false)
              }
              reloadLectureList={handleReloadEventLectureList}
              hideCloseButton={false}
              locationNameList={venuesList}
            />
          )}
          {selectTable === "Lectures" && (
            <LectureCreationPage
              handleCloseCreateLectureWindow={() =>
                setShowCreateLecturePopup(false)
              }
              handleReloadLectureList={handleReloadLectureList}
              hideCloseButton={false}
            />
          )}
        </div>
      )}
      {showUpdateLecturePopup && (
        <div
          handleClick={() => setShowUpdateLecturePopup(false)}
          className="Admin-Create-Event-Dashboard"
        >
          <AdminUpdateEvent
            handlecloseCreateEventWindow={() =>
              setShowUpdateLecturePopup(false)
            }
            selectedEvent={selectedEventLecture}
            reloadEventList={handleReloadEventLectureList}
            locationNameList={venuesList}
          />
        </div>
      )}
      {showEditLectureWindow && (
        <div className="Admin-Create-Event-Dashboard">
          <LecturesEdit
            selectedLecture={editLecture}
            handleCloseUpdateLectureWindow={() => {
              setShowEditLectureWindow(false);
              setEditLecture(null);
            }}
            handleReload={handleReloadLectureList}
            locationNameList={venuesList}
            reloadLecturesList={handleReloadLectureList}
          />
        </div>
      )}
    </div>
  );
};

export default LecturerDashboard;
