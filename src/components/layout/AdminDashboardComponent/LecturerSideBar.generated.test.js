import renderer from 'react-test-renderer';
import React, { useState } from "react";
import { IoMdCloseCircleOutline } from "react-icons/io";
import { IoSettings } from "react-icons/io5";
import { MdOutlineEventNote } from "react-icons/md";
import { IoLogOut } from "react-icons/io5";

import logo from "../../../assets/Images/logo/logo_white.png";
import Sidebarbutton from "../StaffDashboardComponents/Sidebarbutton";
import { AiFillDashboard } from "react-icons/ai";
import Logout from "../../../api/services/logoutService";
import { useDispatch } from "react-redux";
import { TbReport } from "react-icons/tb";
import { MdAssignmentAdd } from "react-icons/md";
import LecturerSideBar from "./LecturerSideBar";

jest.mock("react-icons/io");
jest.mock("react-icons/io5");
jest.mock("react-icons/md");
jest.mock("react-icons/io5");
jest.mock("../../../pages/StaffMainNavigation/StaffMainNavigation.css");
jest.mock("../../../assets/Images/logo/logo_white.png");
jest.mock("../StaffDashboardComponents/Sidebarbutton");
jest.mock("react-icons/ai");
jest.mock("../../../api/services/logoutService");
jest.mock("react-redux");
jest.mock("react-icons/tb");
jest.mock("react-icons/md");

const renderTree = tree => renderer.create(tree);
describe('<LecturerSideBar>', () => {
  it('should render component', () => {
    expect(renderTree(<LecturerSideBar 
    />).toJSON()).toMatchSnapshot();
  });
  
});