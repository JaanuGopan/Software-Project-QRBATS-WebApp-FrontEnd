import renderer from 'react-test-renderer';
import React, { useEffect, useState } from "react";

import { FaEdit } from "react-icons/fa";
import LectureTable from "./LectureTable";

jest.mock("../AdminDashboard/AdminDashboard.css");
jest.mock("react-icons/fa");

const renderTree = tree => renderer.create(tree);
describe('<LectureTable>', () => {
  it('should render component', () => {
    expect(renderTree(<LectureTable 
    />).toJSON()).toMatchSnapshot();
  });
  
});