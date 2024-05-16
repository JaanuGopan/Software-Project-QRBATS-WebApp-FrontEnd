import renderer from 'react-test-renderer';
import React, { useState, useEffect } from "react";

import { FaEdit } from "react-icons/fa";
import StaffTable from "./StaffTable";

jest.mock("../../../pages/AdminDashboard/AdminDashboard.css");
jest.mock("react-icons/fa");

const renderTree = tree => renderer.create(tree);
describe('<StaffTable>', () => {
  it('should render component', () => {
    expect(renderTree(<StaffTable 
    />).toJSON()).toMatchSnapshot();
  });
  
});