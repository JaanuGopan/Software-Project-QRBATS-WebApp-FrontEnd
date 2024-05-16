import renderer from 'react-test-renderer';
import React, { useState } from "react";

import NormalButton from "../../components/layout/AdminDashboardComponent/NormalButton";
import { MdCreateNewFolder } from "react-icons/md";
import { RiDeleteBin5Fill } from "react-icons/ri";
import StudentTable from "../../components/layout/AdminDashboardComponent/StudentTable";
import CreateStudentWindow from "./CreateStudentWindow";
import UpdateStudentWindow from "./UpdateStudentWindow";
import StudentDashboard from "./StudentDashboard";

jest.mock("./Student.css");
jest.mock("../../components/layout/AdminDashboardComponent/NormalButton");
jest.mock("react-icons/md");
jest.mock("react-icons/ri");
jest.mock("../../components/layout/AdminDashboardComponent/StudentTable");
jest.mock("./CreateStudentWindow");
jest.mock("./UpdateStudentWindow");

const renderTree = tree => renderer.create(tree);
describe('<StudentDashboard>', () => {
  it('should render component', () => {
    expect(renderTree(<StudentDashboard 
    />).toJSON()).toMatchSnapshot();
  });
  
});