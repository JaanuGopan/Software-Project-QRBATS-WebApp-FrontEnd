import React from 'react';
import AdminEventCreation from './AdminEventCreation';

const AdminEventCreationDashboard = ({ locationList }) => {
  return (
    <div className="row m-3">
      <AdminEventCreation
        handlecloseCreateEventWindow={() => null}
        locationList={locationList}
        reloadEventList={() => null}
        showCloseButton={false}
      />
    </div>
  );
};

export default AdminEventCreationDashboard;
