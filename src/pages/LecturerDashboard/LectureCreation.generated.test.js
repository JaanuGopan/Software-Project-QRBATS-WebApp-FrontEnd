import renderer from 'react-test-renderer';
import React, { useState, useEffect, useRef } from "react";
import EventService from "../../api/services/EventService";
import QRCode from "qrcode.react";
import { IoMdCloseCircleOutline } from "react-icons/io";
import toast, { Toaster } from "react-hot-toast";

import eventCreationImage from "../../assets/Images/signin/Signin.jpeg";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import { useSelector } from "react-redux";
import { selectUser } from "../../redux/features/userSlice";
import DualButtonComponent from "../../components/buttons/DualButtonComponent";
import LectureCreation from "./LectureCreation";

jest.mock("../../api/services/EventService");
jest.mock("qrcode.react");
jest.mock("react-icons/io");
jest.mock("react-hot-toast");
jest.mock("../Event/EventCreation/EventCreation.css");
jest.mock("../../assets/Images/signin/Signin.jpeg");
jest.mock("html2canvas");
jest.mock("jspdf");
jest.mock("react-redux");
jest.mock("../../redux/features/userSlice");
jest.mock("../../components/buttons/DualButtonComponent");

const renderTree = tree => renderer.create(tree);
describe('<LectureCreation>', () => {
  it('should render component', () => {
    expect(renderTree(<LectureCreation 
    />).toJSON()).toMatchSnapshot();
  });
  
});