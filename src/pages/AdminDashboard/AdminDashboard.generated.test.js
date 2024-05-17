import renderer from 'react-test-renderer';
import React, { useState, useEffect } from "react";

import Table from "../../components/layout/AdminDashboardComponent/Table";
import TotalCount from "../../components/layout/AdminDashboardComponent/TotalCount";
import { FaUsers } from "react-icons/fa";
import { PiUsersFourFill } from "react-icons/pi";
import { FaSchool } from "react-icons/fa6";
import { IoNewspaperSharp } from "react-icons/io5";
import NormalButton from "../../components/layout/AdminDashboardComponent/NormalButton";
import { MdCreateNewFolder } from "react-icons/md";
import { RiDeleteBin5Fill } from "react-icons/ri";
import AdminUpdateEvent from "../Event/AdminUpdateEvent";
import AdminEventCreation from "../Event/AdminEventCreation";
import DeleteEventService from "../../api/services/DeleteEventService";
import FetchEventsService from "../../api/services/FetchEventsService";
import AdminDashboard from "./AdminDashboard";

jest.mock("./AdminDashboard.css");
jest.mock("../../components/layout/AdminDashboardComponent/Table");
jest.mock("../../components/layout/AdminDashboardComponent/TotalCount");
jest.mock("react-icons/fa");
jest.mock("react-icons/pi");
jest.mock("react-icons/fa6");
jest.mock("react-icons/io5");
jest.mock("../../components/layout/AdminDashboardComponent/NormalButton");
jest.mock("react-icons/md");
jest.mock("react-icons/ri");
jest.mock("../Event/AdminUpdateEvent");
jest.mock("../Event/AdminEventCreation");
jest.mock("../../api/services/DeleteEventService");
jest.mock("../../api/services/FetchEventsService");

const renderTree = tree => renderer.create(tree);
describe('<AdminDashboard>', () => {
  it('should render component', () => {
    expect(renderTree(<AdminDashboard 
    />).toJSON()).toMatchSnapshot();
  });
  
});