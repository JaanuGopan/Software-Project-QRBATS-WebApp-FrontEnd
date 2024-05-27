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

const LecturerDashboard = () => {
  const [showCreateLecturePopup, setShowCreateLecturePopup] = useState(false);
  const [showUpdateLecturePopup, setShowUpdateLecturePopup] = useState(false);
  const [lectureList, setLectureList] = useState([]);
  const [selectedLecture, setSelectedLecture] = useState(null);
  const [searchLecture, setSearchLecture] = useState("");
  const [selectTable, setSelectTable] = useState("Events");
  const [venuesList, setVenuesList] = useState([]);
  const user = useSelector(selectUser);
  const { userId } = user || {};

  const handleReloadLectureList = async () => {
    EventService.getEventByUserID(userId)
      .then((list) => {
        setLectureList(list);
        console.log(lectureList);
      })
      .catch((error) => {
        console.log("Error in getting lecture list ", error);
      })
      .finally(() => {});
  };

  const handleGetLocationNameList = async () => {
    const response = await LocationService.getAllLocationNames();
    setVenuesList(response);
  };

  useEffect(() => {
    console.log("user id is : ", userId);
    handleReloadLectureList();
    handleGetLocationNameList();
  }, []);

  const handleDeleteLecture = async () => {
    if (selectedLecture) {
      EventService.deleteEvent(selectedLecture.eventId).then(() => {
        console.log("Error in deleted successfully ");
        handleReloadLectureList();
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
      <p className="mainHead">Staff Dashboard</p>
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
          <option value="Events">Events List</option>
          <option value="Lectures">Lectures List</option>
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
      {selectTable === "Events" ? (
        <div className="AdminEventList">
          <LectureTable
            search={searchLecture}
            handleUpdateLecture={() => setShowUpdateLecturePopup(true)}
            onLectureClick={handleLectureClick}
            lectureList={lectureList} // Pass the eventList prop here
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
            lectureList={lectureList} // Pass the eventList prop here
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
            reloadLectureList={handleReloadLectureList}
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
            reloadEventList={handleReloadLectureList}
            locationNameList={venuesList}
          />
        </div>
      )}
    </div>
  );
};

export default LecturerDashboard;
