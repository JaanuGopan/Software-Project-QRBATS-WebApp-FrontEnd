import React from 'react';
import 'src/pages/dashboard/AdminDashboard/AdminDashboard.jsx';

const TotalCount = ({ total, countIcon, countTitle }) => {
  return (
    <div className="inform">
      <div className="inform1">
        <p
          style={{
            color: 'white',
            fontSize: 'large',
            fontWeight: 'bold',
            padding: '5%',
          }}
        >
          {total}
        </p>
        {countIcon}
      </div>
      <p
        className="informationText"
        style={{
          color: 'white',
          fontWeight: 'bold',
          padding: '5%',
        }}
      >
        {countTitle}
      </p>
    </div>
  );
};

export default TotalCount;
