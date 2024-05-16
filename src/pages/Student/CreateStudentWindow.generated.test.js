import renderer from 'react-test-renderer';
import React, { useState } from "react";

import axios from "axios";
import Designer from "../../assets/Images/Designer.jpeg";
import { useNavigate } from "react-router-dom";
import InputField from "../../components/textfields/InputBox/InputField";
import { IoMdCloseCircleOutline } from "react-icons/io";
import CreateStudentWindow from "./CreateStudentWindow";

jest.mock("./Student.css");
jest.mock("axios");
jest.mock("../../assets/Images/Designer.jpeg");
jest.mock("react-router-dom");
jest.mock("../../components/textfields/InputBox/InputField");
jest.mock("react-icons/io");

const renderTree = tree => renderer.create(tree);
describe('<CreateStudentWindow>', () => {
  it('should render component', () => {
    expect(renderTree(<CreateStudentWindow 
    />).toJSON()).toMatchSnapshot();
  });
  
});