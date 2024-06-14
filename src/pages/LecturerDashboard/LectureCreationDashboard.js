import React from "react";
import LectureCreation from "./LectureCreation";
import "./LectureDashboard.css";
const LectureCreationDashboard = () => {
  return (
    <div className="row m-5 lecture-creation-dashboard">
      <LectureCreation
        handleCloseCreateLectureWindow={() => null}
        reloadLectureList={() => null}
        hideCloseButton={true}
        showImage={true}
      />
    </div>
  );
};

export default LectureCreationDashboard;
