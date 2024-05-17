import renderer from 'react-test-renderer';
import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { selectUser } from "../../redux/features/userSlice";
import ModuleService from "../../api/services/ModuleService";
import { CiViewList } from "react-icons/ci";

import { BiEdit } from "react-icons/bi";
import ModuleTable from "./ModuleTable";

jest.mock("react-redux");
jest.mock("../../redux/features/userSlice");
jest.mock("../../api/services/ModuleService");
jest.mock("react-icons/ci");
jest.mock("../AdminDashboard/AdminDashboard.css");
jest.mock("react-icons/bi");

const renderTree = tree => renderer.create(tree);
describe('<ModuleTable>', () => {
  it('should render component', () => {
    expect(renderTree(<ModuleTable 
    />).toJSON()).toMatchSnapshot();
  });
  
});