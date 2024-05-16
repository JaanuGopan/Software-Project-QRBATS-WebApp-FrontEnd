import renderer from 'react-test-renderer';
import React, { useState, useEffect } from "react";

import LectureTable from "./LectureTable";
import TotalCount from "../../components/layout/AdminDashboardComponent/TotalCount";
import Select from 'react-select'
import { FaSchool } from "react-icons/fa6";
import { IoNewspaperSharp } from "react-icons/io5";
import NormalButton from "../../components/layout/AdminDashboardComponent/NormalButton";
import { MdCreateNewFolder } from "react-icons/md";
import { RiDeleteBin5Fill } from "react-icons/ri";
import LectureCreation from "./LectureCreation";
import DeleteEventService from "../../api/services/DeleteEventService";
import EventService from "../../api/services/EventService";
import { useSelector } from "react-redux";
import { selectUser } from "../../redux/features/userSlice";
import AdminUpdateEvent from "../Event/AdminUpdateEvent";
import LecturerDashboard from "./LecturerDashboard";

jest.mock("../AdminDashboard/AdminDashboard.css");
jest.mock("./LectureTable");
jest.mock("../../components/layout/AdminDashboardComponent/TotalCount");
jest.mock('react-select');
jest.mock("react-icons/fa6");
jest.mock("react-icons/io5");
jest.mock("../../components/layout/AdminDashboardComponent/NormalButton");
jest.mock("react-icons/md");
jest.mock("react-icons/ri");
jest.mock("./LectureCreation");
jest.mock("../../api/services/DeleteEventService");
jest.mock("../../api/services/EventService");
jest.mock("react-redux");
jest.mock("../../redux/features/userSlice");
jest.mock("../Event/AdminUpdateEvent");

const renderTree = tree => renderer.create(tree);
describe('<LecturerDashboard>', () => {
  it('should render component', () => {
    expect(renderTree(<LecturerDashboard 
    />).toJSON()).toMatchSnapshot();
  });
  
});