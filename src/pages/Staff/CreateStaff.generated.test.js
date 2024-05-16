import renderer from 'react-test-renderer';
import React, { useState } from "react";

import axios from "axios";
import Designer from "../../assets/Images/Designer.jpeg";
import InputField from "../../components/textfields/InputBox/InputField";
import { IoMdCloseCircleOutline } from "react-icons/io";
import CreateUserService from "../../api/services/CreateUserService";
import CreateStaff from "./CreateStaff";

jest.mock("./StaffA.css");
jest.mock("axios");
jest.mock("../../assets/Images/Designer.jpeg");
jest.mock("../../components/textfields/InputBox/InputField");
jest.mock("react-icons/io");
jest.mock("../../api/services/CreateUserService");

const renderTree = tree => renderer.create(tree);
describe('<CreateStaff>', () => {
  it('should render component', () => {
    expect(renderTree(<CreateStaff 
    />).toJSON()).toMatchSnapshot();
  });
  
});