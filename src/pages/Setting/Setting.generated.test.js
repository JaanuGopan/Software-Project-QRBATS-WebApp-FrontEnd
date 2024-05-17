import renderer from 'react-test-renderer';

import eventCreationImage from "../../assets/Images/signin/Signin.jpeg";
import React, { useState } from "react";
import UpdateSetting from "./UpdateSetting";
import Setting from "./Setting";

jest.mock("./Setting.css");
jest.mock("../../assets/Images/signin/Signin.jpeg");
jest.mock("./UpdateSetting");

const renderTree = tree => renderer.create(tree);
describe('<Setting>', () => {
  it('should render component', () => {
    expect(renderTree(<Setting 
    />).toJSON()).toMatchSnapshot();
  });
  
});