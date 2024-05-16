import renderer from 'react-test-renderer';
import React, { useState, useEffect } from "react";

import EventReportTable from "../../components/layout/AdminDashboardComponent/EventReportTable";
import EventAttendancetable from "../../components/layout/AdminDashboardComponent/EventAttendancetable";
import NormalButton from "../../components/layout/AdminDashboardComponent/NormalButton";
import { MdArrowBack } from "react-icons/md";
import { BiSolidPrinter } from "react-icons/bi";
import FetchEventsService from "../../api/services/FetchEventsService";
import FetchAttendanceByEventIdService from "../../api/services/FetchAttendanceByEventIdService";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import EventReport from "./EventReport";

jest.mock("../Staff/StaffA.css");
jest.mock("../../components/layout/AdminDashboardComponent/EventReportTable");
jest.mock("../../components/layout/AdminDashboardComponent/EventAttendancetable");
jest.mock("../../components/layout/AdminDashboardComponent/NormalButton");
jest.mock("react-icons/md");
jest.mock("react-icons/bi");
jest.mock("../../api/services/FetchEventsService");
jest.mock("../../api/services/FetchAttendanceByEventIdService");
jest.mock("html2canvas");
jest.mock("jspdf");

const renderTree = tree => renderer.create(tree);
describe('<EventReport>', () => {
  it('should render component', () => {
    expect(renderTree(<EventReport 
    />).toJSON()).toMatchSnapshot();
  });
  
});