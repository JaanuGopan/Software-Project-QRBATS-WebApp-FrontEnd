import renderer from 'react-test-renderer';
import React, { useState } from "react";

import { PiListDashesFill } from "react-icons/pi";
import StaffNavBar from "../../components/layout/StaffDashboardComponents/StaffNavBar";
import StaffSideBar from "../../components/layout/StaffDashboardComponents/StaffSideBar";
import StaffMainNavigation from "./StaffMainNavigation";

jest.mock("./StaffMainNavigation.css");
jest.mock("react-icons/pi");
jest.mock("../../components/layout/StaffDashboardComponents/StaffNavBar");
jest.mock("../../components/layout/StaffDashboardComponents/StaffSideBar");

const renderTree = tree => renderer.create(tree);
describe('<StaffMainNavigation>', () => {
  it('should render component', () => {
    expect(renderTree(<StaffMainNavigation 
    />).toJSON()).toMatchSnapshot();
  });
  
});