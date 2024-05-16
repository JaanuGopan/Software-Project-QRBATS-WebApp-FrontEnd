import renderer from 'react-test-renderer';

import eventCreationImage from "../../assets/Images/signin/Signin.jpeg";
import React, { useState, useRef } from "react";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import { IoMdCloseCircleOutline } from "react-icons/io";
import toast, { Toaster } from "react-hot-toast";
import { useSelector } from "react-redux";
import { selectUser } from "../../redux/features/userSlice";
import QRCode from "qrcode.react";
import SaveEventService from "../../api/services/SaveEventService";
import AdminEventCreation from "./AdminEventCreation";

jest.mock("./EventCreation/EventCreation.css");
jest.mock("../../assets/Images/signin/Signin.jpeg");
jest.mock("html2canvas");
jest.mock("jspdf");
jest.mock("react-icons/io");
jest.mock("react-hot-toast");
jest.mock("react-redux");
jest.mock("../../redux/features/userSlice");
jest.mock("qrcode.react");
jest.mock("../../api/services/SaveEventService");

const renderTree = tree => renderer.create(tree);
describe('<AdminEventCreation>', () => {
  it('should render component', () => {
    expect(renderTree(<AdminEventCreation 
    />).toJSON()).toMatchSnapshot();
  });
  
});