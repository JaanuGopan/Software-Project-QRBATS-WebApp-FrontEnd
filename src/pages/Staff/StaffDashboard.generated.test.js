import renderer from 'react-test-renderer';
import React, { useState, useEffect } from "react";

import NormalButton from "../../components/layout/AdminDashboardComponent/NormalButton";
import { MdCreateNewFolder } from "react-icons/md";
import { RiDeleteBin5Fill } from "react-icons/ri";
import CreateStaff from "./CreateStaff";
import UpdateStaff from "./UpdateStaff";
import StaffTable from "../../components/layout/AdminDashboardComponent/StaffTable";
import FetchStaffService from "../../api/services/FetchStaffService";
import DeleteStaffService from "../../api/services/DeleteStaffService";
import StaffDashboard from "./StaffDashboard";

jest.mock("./StaffA.css");
jest.mock("../../components/layout/AdminDashboardComponent/NormalButton");
jest.mock("react-icons/md");
jest.mock("react-icons/ri");
jest.mock("./CreateStaff");
jest.mock("./UpdateStaff");
jest.mock("../../components/layout/AdminDashboardComponent/StaffTable");
jest.mock("../../api/services/FetchStaffService");
jest.mock("../../api/services/DeleteStaffService");

const renderTree = tree => renderer.create(tree);
describe('<StaffDashboard>', () => {
  it('should render component', () => {
    expect(renderTree(<StaffDashboard 
    />).toJSON()).toMatchSnapshot();
  });
  
});