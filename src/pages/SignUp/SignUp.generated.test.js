import renderer from 'react-test-renderer';
import React, { useState } from "react";

import axios from "axios";
import logo from "../../assets/Images/signin/Signin.jpeg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { FaUser } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { faCircleArrowLeft } from "@fortawesome/free-solid-svg-icons";
import InputField from "../../components/textfields/InputBox/InputField";
import SignUp from "./SignUp";

jest.mock("./SignUp.css");
jest.mock("axios");
jest.mock("../../assets/Images/signin/Signin.jpeg");
jest.mock("@fortawesome/react-fontawesome");
jest.mock("react-icons/fa");
jest.mock("react-router-dom");
jest.mock("@fortawesome/free-solid-svg-icons");
jest.mock("../../components/textfields/InputBox/InputField");

const renderTree = tree => renderer.create(tree);
describe('<SignUp>', () => {
  it('should render component', () => {
    expect(renderTree(<SignUp 
    />).toJSON()).toMatchSnapshot();
  });
  
});