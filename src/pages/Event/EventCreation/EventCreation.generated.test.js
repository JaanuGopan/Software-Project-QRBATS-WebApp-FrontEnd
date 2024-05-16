import renderer from 'react-test-renderer';

import eventCreationImage from "../../../assets/Images/signin/Signin.jpeg";
import React, { useState, useRef } from "react";
import QRCode from "react-qr-code";
import axios from "axios";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import toast, { Toaster } from "react-hot-toast";
import EventCreation from "./EventCreation";

jest.mock("./EventCreation.css");
jest.mock("../../../assets/Images/signin/Signin.jpeg");
jest.mock("react-qr-code");
jest.mock("axios");
jest.mock("html2canvas");
jest.mock("jspdf");
jest.mock("react-hot-toast");

const renderTree = tree => renderer.create(tree);
describe('<EventCreation>', () => {
  it('should render component', () => {
    expect(renderTree(<EventCreation 
    />).toJSON()).toMatchSnapshot();
  });
  
});