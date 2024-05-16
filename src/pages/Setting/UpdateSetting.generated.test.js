import renderer from 'react-test-renderer';
import React, { useState } from "react";

import eventCreationImage from "../../assets/Images/signin/Signin.jpeg";
import { IoMdCloseCircleOutline } from "react-icons/io";
import UpdateSetting from "./UpdateSetting";

jest.mock("./Setting.css");
jest.mock("../../assets/Images/signin/Signin.jpeg");
jest.mock("react-icons/io");

const renderTree = tree => renderer.create(tree);
describe('<UpdateSetting>', () => {
  it('should render component', () => {
    expect(renderTree(<UpdateSetting 
    />).toJSON()).toMatchSnapshot();
  });
  
});