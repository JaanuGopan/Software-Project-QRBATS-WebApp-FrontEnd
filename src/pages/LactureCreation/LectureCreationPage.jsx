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
import CircularProgress from "@mui/material/CircularProgress";
import AvailableLectureListForModule from "./AvailableLectureListForModule";
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
  const [module, setModule] = useState("");
  const [showRightSideWindow, setShowRightSideWindow] = useState(false);
  const [showQRCodeWindow, setShowQRCodeWindow] = useState(false);
  const [availableLectureList, setAvailableLectureList] = useState([]);
  const [availableModuleLectureList, setAvailableModuleLectureList] = useState(
    []
  );
  const [showAvailableLecture, setShowAvailableLecture] = useState(false);
  const [showAvailableModuleLecture, setShowAvailableModuleLecture] =
    useState(false);
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
        setDay(selectedDay);
        setVenue(selectedVenue);
        setAvailableLectureList(response.data);
      }
    } catch (error) {
    } finally {
      setShowAvailableLecture(true);
      setShowAvailableModuleLecture(false);
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
        setAvailableModuleLectureList(lecturesList);
        setShowAvailableLecture(false);
        setShowAvailableModuleLecture(true);
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

  const handleDayListChange = (dayList) => {
    if (dayList.length > 0) {
      setDayList(dayList);
      handleGetAvailableLectureList("", dayList[dayList.length - 1]);
    } else {
      setDayList([]);
      setAvailableLectureList([]);
      setShowAvailableLecture(false);
    }
  };

  return (
    <div className="lecture-creation-main-container">
      {hideCloseButton && <ToastContainer />}
      {!hideCloseButton && (
        <div className="lecture-create-title-close-button">
          <h3 className="lecture-create-title">Create Lecture Time Table</h3>
          <div
            className="lecture-create-close-button"
            onClick={handleCloseCreateLectureWindow}
          >
            <IoMdCloseCircleOutline id="close-icon" />
          </div>
        </div>
      )}
      {hideCloseButton && (
        <div className="lecture-creation-title-icon-close-button">
          <h3>Create Lecture Time Table</h3>
        </div>
      )}
      <div className="lecture-creation-container">
        <div className="lecture-creation-container-left">
          <LeftContainerLectureCreation
            getDayList={(dayList) => handleDayListChange(dayList)}
            getModuleCode={(e) => {
              setModuleCode(e);
            }}
            showRightSideWindow={() => setShowRightSideWindow(true)}
            hideRightSideWindow={() => setShowRightSideWindow(false)}
            handleUpdateAvailableLectures={(venue, day) => {
              setDay(day);
              setVenue(venue);
              handleGetAvailableLectureList(venue, day);
            }}
            onModuleChange={(e) => setModule(e)}
            handleGetAvailableLecturesForModule={(moduleCode) => {
              handleGetLecturesListByModuleCode(moduleCode);
            }}
          />
          {showAvailableLecture && !showAvailableModuleLecture && (
            <div className="available-lectures-container">
              {availableLectureList ? (
                <AvailableLectureList
                  availableLectureList={availableLectureList}
                  day={day}
                  venue={venue}
                />
              ) : (
                <div className="available-lectures-container-loading">
                  <CircularProgress />
                </div>
              )}
            </div>
          )}
          {showAvailableModuleLecture && !showAvailableLecture && (
            <div className="available-lectures-container">
              {availableModuleLectureList ? (
                <AvailableLectureListForModule
                  availableLectureListForModule={availableModuleLectureList}
                  module={module}
                />
              ) : (
                <div className="available-lectures-container-loading">
                  <CircularProgress />
                </div>
              )}
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
              module={module}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default LectureCreationPage;
