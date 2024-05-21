import React from "react";
import LectureCreation from "./LectureCreation";

const LectureCreationDashboard = () => {
  return (
    <div className="row m-3">
      <LectureCreation
        handleCloseCreateLectureWindow={() => null}
        reloadLectureList={() => null}
        hideCloseButton={true}
      />
    </div>
  );
};

export default LectureCreationDashboard;
