import renderer from 'react-test-renderer';
import React, { useState, useEffect } from "react";


import AdminDashboard from "../AdminDashboard/AdminDashboard";
import { PiListDashesFill } from "react-icons/pi";
import StaffNavBar from "../../components/layout/StaffDashboardComponents/StaffNavBar";
import AdminSideBar from "../../components/layout/AdminDashboardComponent/AdminSideBar";
import EventCreateDashboard from "../Event/EventCreateDashboard";
import StudentDashboard from "../Student/StudentDashboard";
import Setting from "../Setting/Setting";
import StaffDashboard from "../Staff/StaffDashboard";
import EventReport from "../Event/EventReport";
import { useDispatch, useSelector } from "react-redux";
import { login, selectUser } from "../../redux/features/userSlice";
import { useNavigate } from "react-router-dom";
import LecturerSideBar from "../../components/layout/AdminDashboardComponent/LecturerSideBar";
import LecturerDashboard from "../LecturerDashboard/LecturerDashboard";
import ModulePage from "../Module/ModulePage";
import MainNavigationPage from "./MainNavigation";

jest.mock("./MainNavigation.css");
jest.mock("../StaffMainNavigation/StaffMainNavigation.css");
jest.mock("../AdminDashboard/AdminDashboard");
jest.mock("react-icons/pi");
jest.mock("../../components/layout/StaffDashboardComponents/StaffNavBar");
jest.mock("../../components/layout/AdminDashboardComponent/AdminSideBar");
jest.mock("../Event/EventCreateDashboard");
jest.mock("../Student/StudentDashboard");
jest.mock("../Setting/Setting");
jest.mock("../Staff/StaffDashboard");
jest.mock("../Event/EventReport");
jest.mock("react-redux");
jest.mock("../../redux/features/userSlice");
jest.mock("react-router-dom");
jest.mock("../../components/layout/AdminDashboardComponent/LecturerSideBar");
jest.mock("../LecturerDashboard/LecturerDashboard");
jest.mock("../Module/ModulePage");

const renderTree = tree => renderer.create(tree);
describe('<MainNavigationPage>', () => {
  it('should render component', () => {
    expect(renderTree(<MainNavigationPage 
    />).toJSON()).toMatchSnapshot();
  });
  
});