import React from 'react';
import './app-content-card.css';

const AppContentCard = ({ children, hasTopContents, hasBottomContents }) => {
  return (
    <div
      className={
        'row m-2 app-content-card-container' + (hasBottomContents ? ' has-bottom-buttons' : '')
      }
    >
      <div className="col p-2">{children}</div>
    </div>
  );
};

export default AppContentCard;
