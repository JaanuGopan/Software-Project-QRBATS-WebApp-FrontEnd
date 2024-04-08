import React from "react";
import "../../../pages/AdminDashboard/AdminDashboard.css";

const NormalButton = ({ title, titlewithiconicon, handleClick }) => {
  return (
    <div className="NormalButton" onClick={handleClick}>
      {titlewithiconicon}
      <p className="NormalButtonLabel">{title}</p>
    </div>
  );
};

export default NormalButton;
