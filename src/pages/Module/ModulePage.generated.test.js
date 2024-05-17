import renderer from 'react-test-renderer';
import React, { useState, useEffect } from "react";
import NormalButton from "../../components/layout/AdminDashboardComponent/NormalButton";
import { MdCreateNewFolder } from "react-icons/md";
import ModuleTable from "./ModuleTable";
import ModuleService from "../../api/services/ModuleService";
import { useSelector } from "react-redux";
import { selectUser } from "../../redux/features/userSlice";
import ModuleUpdate from "./ModuleUpdate";
import { RiDeleteBin5Fill } from "react-icons/ri";

import ModuleCreate from "./ModuleCreate";
import ModulePage from "./ModulePage";

jest.mock("../../components/layout/AdminDashboardComponent/NormalButton");
jest.mock("react-icons/md");
jest.mock("./ModuleTable");
jest.mock("../../api/services/ModuleService");
jest.mock("react-redux");
jest.mock("../../redux/features/userSlice");
jest.mock("./ModuleUpdate");
jest.mock("react-icons/ri");
jest.mock("./ModulePage.css");
jest.mock("./ModuleCreate");

const renderTree = tree => renderer.create(tree);
describe('<ModulePage>', () => {
  it('should render component', () => {
    expect(renderTree(<ModulePage 
    />).toJSON()).toMatchSnapshot();
  });
  
});