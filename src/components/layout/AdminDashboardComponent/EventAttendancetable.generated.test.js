import renderer from 'react-test-renderer';
import React, { useState, useEffect } from "react";

import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import EventAttendancetable from "./EventAttendancetable";

jest.mock("../../../pages/AdminDashboard/AdminDashboard.css");
jest.mock("html2canvas");
jest.mock("jspdf");

const renderTree = tree => renderer.create(tree);
describe('<EventAttendancetable>', () => {
  it('should render component', () => {
    expect(renderTree(<EventAttendancetable 
    />).toJSON()).toMatchSnapshot();
  });
  
});