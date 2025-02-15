import React from 'react';
import './LectureDashboard.css';
import EventCreation from './event-creation';
const EventCreationDashboard = () => {
  return (
    <div className="row m-5 lecture-creation-dashboard">
      <EventCreation
        handleCloseCreateLectureWindow={() => null}
        reloadLectureList={() => null}
        hideCloseButton={true}
        showImage={true}
      />
    </div>
  );
};

export default EventCreationDashboard;
