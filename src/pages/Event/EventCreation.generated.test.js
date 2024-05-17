import renderer from 'react-test-renderer';

import eventCreationImage from "../../assets/Images/signin/Signin.jpeg";
import React, { useState, useRef } from "react";
import { IoMdCloseCircleOutline } from "react-icons/io";
import toast, { Toaster } from "react-hot-toast";
import { useSelector } from "react-redux";
import { selectUser } from "../../redux/features/userSlice";
import QRCode from "qrcode.react";
import InputList from "../../components/textfields/InputList/InputList";
import InputField from "../../components/textfields/InputBox/InputField";
import EventService from "../../api/services/EventService";
import EventCreationComponent from "./EventCreation";

jest.mock("./EventCreation/EventCreation.css");
jest.mock("../../assets/Images/signin/Signin.jpeg");
jest.mock("react-icons/io");
jest.mock("react-hot-toast");
jest.mock("react-redux");
jest.mock("../../redux/features/userSlice");
jest.mock("qrcode.react");
jest.mock("../../components/textfields/InputList/InputList");
jest.mock("../../components/textfields/InputBox/InputField");
jest.mock("../../api/services/EventService");

const renderTree = tree => renderer.create(tree);
describe('<EventCreationComponent>', () => {
  it('should render component', () => {
    expect(renderTree(<EventCreationComponent 
    />).toJSON()).toMatchSnapshot();
  });
  
});