import React, { useState } from "react";
import "./LectureCreation.css";
import LeftContainerLectureCreation from "./LeftContainerLectureCreation";
import RightContainerLectureCreation from "./RightContainerLectureCreation";
import { useSelector } from "react-redux";
import { selectUser } from "../../redux/features/userSlice";
import { IoMdCloseCircleOutline } from "react-icons/io";
import LectureQRCodeWindow from "./LectureQRCodeWindow";
const LectureCreationPage = ({
  handleCloseCreateLectureWindow,
  handleReloadLectureList,
  hideCloseButton = true,
}) => {
  const user = useSelector(selectUser);
  const { userId, departmentId } = user || {};
  const [dayList, setDayList] = useState([]);
  const [moduleCode, setModuleCode] = useState("");
  const [showRightSideWindow, setShowRightSideWindow] = useState(false);
  const [showQRCodeWindow, setShowQRCodeWindow] = useState(false);

  return (
    <div className="lecture-creation-main-container">
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
            getModuleCode={(e) => setModuleCode(e)}
            showRightSideWindow={() => setShowRightSideWindow(true)}
          />
        </div>
        <div className="lecture-creation-container-right">
          {showRightSideWindow && (
            <RightContainerLectureCreation
              dayList={dayList}
              moduleCode={moduleCode}
              userId={userId}
            />
          )}
        </div>
        {showQRCodeWindow && (
          <div className="lecture-creation-qrCode-popup">
            <LectureQRCodeWindow
              lectureDetails={""}
              handleCloseQrCodeWindow={() => {}}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default LectureCreationPage;
