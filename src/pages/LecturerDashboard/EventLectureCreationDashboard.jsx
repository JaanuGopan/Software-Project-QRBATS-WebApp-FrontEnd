import React from 'react';
import './LectureDashboard.css';
import EventLectureCreation from './EventLectureCreation';
const EventLectureCreationDashboard = () => {
  return (
    <div className="row m-5 lecture-creation-dashboard">
      <EventLectureCreation
        handleCloseCreateLectureWindow={() => null}
        reloadLectureList={() => null}
        hideCloseButton={true}
        showImage={true}
      />
    </div>
  );
};

export default EventLectureCreationDashboard;
