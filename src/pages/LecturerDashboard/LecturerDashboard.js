import React, { useState, useEffect } from "react";
import "../AdminDashboard/AdminDashboard.css";
import LectureTable from "./LectureTable";
import TotalCount from "../../components/layout/AdminDashboardComponent/TotalCount";
import { FaUsers } from "react-icons/fa";
import { PiUsersFourFill } from "react-icons/pi";
import { FaSchool } from "react-icons/fa6";
import { IoNewspaperSharp } from "react-icons/io5";
import NormalButton from "../../components/layout/AdminDashboardComponent/NormalButton";
import { MdCreateNewFolder } from "react-icons/md";
import { RiDeleteBin5Fill } from "react-icons/ri";
import LectureCreation from "./LectureCreation";
import DeleteEventService from "../../api/services/DeleteEventService";
import EventService from "../../api/services/EventService";
import UserDetails from "../../utils/UserDetails";

import { useSelector } from "react-redux";
import { selectUser } from "../../redux/features/userSlice";
import AdminUpdateEvent from "../Event/AdminUpdateEvent";

const LecturerDashboard = () => {
  const [showCreateLecturePopup, setShowCreateLecturePopup] = useState(false);
  const [showUpdateLecturePopup, setShowUpdateLecturePopup] = useState(false);
  const [lectureList, setLectureList] = useState([]);
  const [selectedLecture, setSelectedLecture] = useState(null);
  const [searchLecture, setSearchLecture] = useState("");

  //const [userId, setUserId] = useState(UserDetails.getUserId);
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

  useEffect(() => {
    //setUserId(UserDetails.getUserId);
    console.log("user id is : ", userId);
    handleReloadLectureList();
  }, []);

  const handleDeleteLecture = async () => {
    selectedLecture != null ??
      DeleteEventService.deleteEvent(selectedLecture.eventId)
        .then(() => {
          console.log("Error in deleted successfully ");
        })
        .catch((error) => {
          console.log("Error in delete lecture ", error);
        })
        .finally(() => {
          handleReloadLectureList();
          setSelectedLecture(null);
        });
  };

  const handleLectureClick = (lecture) => {
    setSelectedLecture(lecture);
    console.log(searchLecture);
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
          onChange={(e) => setSearchLecture(e.target.value)}
        />
      </div>
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
          />
        </div>
      )}
    </div>
  );
};

export default LecturerDashboard;