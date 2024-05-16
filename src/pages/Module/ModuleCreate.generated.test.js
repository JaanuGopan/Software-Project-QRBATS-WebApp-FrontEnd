import renderer from 'react-test-renderer';
import React, { useState } from "react";

import Designer from "../../assets/Images/Designer.jpeg";
import InputField from "../../components/textfields/InputBox/InputField";
import { IoMdCloseCircleOutline } from "react-icons/io";
import CreateUserService from "../../api/services/CreateUserService";
import InputList from "../../components/textfields/InputList/InputList";
import ModuleCreate from "./ModuleCreate";

jest.mock("./ModulePage.css");
jest.mock("../../assets/Images/Designer.jpeg");
jest.mock("../../components/textfields/InputBox/InputField");
jest.mock("react-icons/io");
jest.mock("../../api/services/CreateUserService");
jest.mock("../../components/textfields/InputList/InputList");

const renderTree = tree => renderer.create(tree);
describe('<ModuleCreate>', () => {
  it('should render component', () => {
    expect(renderTree(<ModuleCreate 
    />).toJSON()).toMatchSnapshot();
  });
  
});