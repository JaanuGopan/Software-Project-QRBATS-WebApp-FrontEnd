import React, { useState, useEffect } from "react";
import "../AdminDashboard/AdminDashboard.css";
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

const LecturerDashboard = () => {
  const [showCreateLecturePopup, setShowCreateLecturePopup] = useState(false);
  const [showUpdateLecturePopup, setShowUpdateLecturePopup] = useState(false);
  const [eventLectureList, setEventLectureList] = useState([]);
  const [selectedLecture, setSelectedLecture] = useState(null);
  const [searchLecture, setSearchLecture] = useState("");
  const [selectTable, setSelectTable] = useState("Lectures");
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

  //=====================================================================================

  const handleGetLocationNameList = async () => {
    const response = await LocationService.getAllLocationNames();
    setVenuesList(response);
  };

  useEffect(() => {
    console.log("user id is : ", userId);
    handleReloadEventLectureList();
    handleGetLocationNameList();
    handleReloadLectureList();
  }, []);

  const handleDeleteLecture = async () => {
    if (selectedLecture) {
      EventService.deleteEvent(selectedLecture.eventId).then(() => {
        console.log("Error in deleted successfully ");
        handleReloadEventLectureList();
        setSelectedLecture(null);
      });
    }
  };

  const handleLectureClick = (lecture) => {
    setSelectedLecture(lecture);
    console.log(selectedLecture);
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
          onChange={handleChange}
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
            onLectureClick={() => {}}
            handleLectureUpdate={(lecture) => {
              handleEditLecture(lecture);
            }}
          />

          <div className="List-Buttons">
            <NormalButton
              handleClick={() => setShowCreateLecturePopup(true)}
              title={"Create"}
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
            onLectureClick={handleLectureClick}
            lectureList={eventLectureList} // Pass the eventList prop here
          />

          <div className="List-Buttons">
            <NormalButton
              handleClick={() => setShowCreateLecturePopup(true)}
              title={"Create"}
              titlewithiconicon={<MdCreateNewFolder className="buttonIcon" />}
            />
            <NormalButton
              title={"Delete"}
              handleClick={handleDeleteLecture}
              titlewithiconicon={<RiDeleteBin5Fill className="buttonIcon" />}
            />
          </div>
        </div>
      )}
      {showCreateLecturePopup && (
        <div
          handleClick={() => setShowCreateLecturePopup(false)}
          className="Admin-Create-Event-Dashboard"
        >
          <LectureCreation
            handleCloseCreateLectureWindow={() =>
              setShowCreateLecturePopup(false)
            }
            reloadLectureList={handleReloadEventLectureList}
            hideCloseButton={false}
            locationNameList={venuesList}
          />
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
            selectedEvent={selectedLecture}
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
