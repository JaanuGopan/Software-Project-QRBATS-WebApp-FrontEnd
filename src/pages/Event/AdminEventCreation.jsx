import React from 'react';
import EventCreation from '../dashboard/LecturerDashboard/event-creation';

const AdminEventCreation = ({ handleCloseCreateEventWindow, reloadEventList, showCloseButton }) => {
  return (
    <EventCreation
      reloadLectureList={reloadEventList}
      hideCloseButton={false}
      handleCloseCreateLectureWindow={handleCloseCreateEventWindow}
    />
  );
};

export default AdminEventCreation;
