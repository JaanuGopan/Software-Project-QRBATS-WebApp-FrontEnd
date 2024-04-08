import React, { useState } from "react";
import "../../../pages/StaffMainNavigation/StaffMainNavigation.css";

const Sidebarbutton = ({
  title,
  titlewithiconicon,
  handleSidebarMenu,
  isOpen,
}) => {
  return (
    <div
      className={`SideBarButton ${isOpen ? "active" : ""}`}
      onClick={handleSidebarMenu}
    >
      {titlewithiconicon}
      <p className="SideBarLabel">{title}</p>
    </div>
  );
};

export default Sidebarbutton;
