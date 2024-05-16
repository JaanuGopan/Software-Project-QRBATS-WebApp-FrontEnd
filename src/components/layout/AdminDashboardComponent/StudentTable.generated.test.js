import renderer from 'react-test-renderer';
import React, { useState, useEffect } from "react";

import { FaEdit } from "react-icons/fa";
import GetAllStudentsService from "../../../api/services/GetAllStudentService";
import StudentTable from "./StudentTable";

jest.mock("../../../pages/AdminDashboard/AdminDashboard.css");
jest.mock("react-icons/fa");
jest.mock("../../../api/services/GetAllStudentService");

const renderTree = tree => renderer.create(tree);
describe('<StudentTable>', () => {
  it('should render component', () => {
    expect(renderTree(<StudentTable 
    />).toJSON()).toMatchSnapshot();
  });
  
});