import renderer from 'react-test-renderer';
import React, { Component } from "react";
import { RiUserLine } from "react-icons/ri";

import { FaUsers, FaEdit, FaTrashAlt, FaPlus } from "react-icons/fa";
import Staff from "./Staff";

jest.mock("react-icons/ri");
jest.mock("./Staff.css");
jest.mock("react-icons/fa");

const renderTree = tree => renderer.create(tree);
describe('<Staff>', () => {
  it('should render component', () => {
    expect(renderTree(<Staff 
    />).toJSON()).toMatchSnapshot();
  });
  
});