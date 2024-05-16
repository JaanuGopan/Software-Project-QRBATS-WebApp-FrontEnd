import renderer from 'react-test-renderer';
import React, { useState, useEffect } from "react";

import { CiViewList } from "react-icons/ci";
import axios from "axios";
import FetchAttendanceByEventIdService from "../../../api/services/FetchAttendanceByEventIdService";
import EventReportTable from "./EventReportTable";

jest.mock("../../../pages/AdminDashboard/AdminDashboard.css");
jest.mock("react-icons/ci");
jest.mock("axios");
jest.mock("../../../api/services/FetchAttendanceByEventIdService");

const renderTree = tree => renderer.create(tree);
describe('<EventReportTable>', () => {
  it('should render component', () => {
    expect(renderTree(<EventReportTable 
    />).toJSON()).toMatchSnapshot();
  });
  
});