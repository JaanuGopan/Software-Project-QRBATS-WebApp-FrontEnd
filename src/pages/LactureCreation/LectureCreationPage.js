import React, { useState } from "react";
import "./LectureCreation.css";
import LeftContainerLectureCreation from "./LeftContainerLectureCreation";
import RightContainerLectureCreation from "./RightContainerLectureCreation";
import { useSelector } from "react-redux";
import { selectUser } from "../../redux/features/userSlice";
import { IoMdCloseCircleOutline } from "react-icons/io";
import LectureQRCodeWindow from "./LectureQRCodeWindow";
import AvailableLectureList from "./AvailableLectureList";
import LectureService from "../../api/services/LectureService";
import { ToastContainer, toast } from "react-toastify";
const LectureCreationPage = ({
  handleCloseCreateLectureWindow,
  handleReloadLectureList = () => {},
  hideCloseButton = true,
}) => {
  const user = useSelector(selectUser);
  const { userId, departmentId } = user || {};
  const [dayList, setDayList] = useState([]);
  const [day, setDay] = useState("");
  const [venue, setVenue] = useState("");
  const [moduleCode, setModuleCode] = useState("");
  const [showRightSideWindow, setShowRightSideWindow] = useState(false);
  const [showQRCodeWindow, setShowQRCodeWindow] = useState(false);
  const [availableLectureList, setAvailableLectureList] = useState([]);
  const [showAvailableLecture, setShowAvailableLecture] = useState(false);
  const [moduleLectureList, setModuleLectureList] = useState([]);
  const [timesList, setTimesList] = useState([]);
  const [createdLectureDetails, setCreatedLectureDetails] = useState([]);

  const handleGetAvailableLectureList = async (selectedVenue, selectedDay) => {
    try {
      const response = await LectureService.getAllLecturesByDayAndVenue(
        selectedDay,
        selectedVenue
      );
      if (response.status === 200) {
        setAvailableLectureList(response.data);
      }
    } catch (error) {
    } finally {
      setShowAvailableLecture(true);
    }
  };

  const handleGetLecturesListByModuleCode = async (moduleCode) => {
    try {
      const response = await LectureService.getAllLecturesByModuleCode(
        moduleCode
      );
      if (response) {
        setModuleLectureList(response);
        setTimesList(transformLecturesByDay(response));
        const lecturesList = response.filter((lecture) => lecture.lectureId);
        setAvailableLectureList(response);
        setShowAvailableLecture(true);
      }
    } catch (error) {
      // Handle error
    }
  };

  const transformLecturesByDay = (lectures) => {
    return lectures.reduce((acc, lecture) => {
      const day = lecture.lectureDay;
      const lectureDetails = {
        startTime: lecture.lectureStartTime,
        endTime: lecture.lectureEndTime,
        venue: lecture.lectureVenue,
      };

      if (!acc[day]) {
        acc[day] = [];
      }
      acc[day].push(lectureDetails);

      return acc;
    }, {});
  };

  const handleLectureShowQRCode = (moduleLectures) => {
    setCreatedLectureDetails(moduleLectures);
    console.log("Created Lecture List is : ", moduleLectures);
    setShowQRCodeWindow(true);
  };

  return (
    <div className="lecture-creation-main-container">
      {/*  <ToastContainer /> */}
      {!hideCloseButton && (
        <div
          className="lecture-creation-icon-close-button"
          onClick={handleCloseCreateLectureWindow}
        >
          <IoMdCloseCircleOutline size={25} />
        </div>
      )}
      <div className="lecture-creation-title-icon-close-button">
        <h3>Lecture Creation</h3>
      </div>
      <div className="lecture-creation-container">
        <div className="lecture-creation-container-left">
          <LeftContainerLectureCreation
            getDayList={(e) => setDayList(e)}
            getModuleCode={(e) => {
              setModuleCode(e);
              handleGetLecturesListByModuleCode(e);
            }}
            showRightSideWindow={() => setShowRightSideWindow(true)}
            handleUpdateAvailableLectures={(venue, day) => {
              setDay(day);
              setVenue(venue);
              handleGetAvailableLectureList(venue, day);
            }}
          />
          {showAvailableLecture && (
            <div className="available-lectures-container">
              <AvailableLectureList
                availableLectureList={availableLectureList}
                day={day}
                venue={venue}
                moduleName={moduleCode}
              />
            </div>
          )}
        </div>
        <div className="lecture-creation-container-right">
          {showRightSideWindow && (
            <RightContainerLectureCreation
              dayList={dayList}
              moduleCode={moduleCode}
              userId={userId}
              handelShowAvailableLectures={(venue, day) => {
                setDay(day);
                setVenue(venue);
                handleGetAvailableLectureList(venue, day);
              }}
              timesList={timesList}
              handleReloadLecturesList={handleReloadLectureList}
              handleShowQrCode={(moduleLectures) =>
                handleLectureShowQRCode(moduleLectures)
              }
            />
          )}
        </div>
        {showQRCodeWindow && (
          <div className="lecture-creation-qrCode-popup">
            <LectureQRCodeWindow
              createdLectureDetails={createdLectureDetails}
              handleCloseQrCodeWindow={() => {
                setShowQRCodeWindow(false);
              }}
              moduleCode={moduleCode}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default LectureCreationPage;
