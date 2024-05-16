import renderer from 'react-test-renderer';
import React from "react";

import TotalCount from "./TotalCount";

jest.mock("../../../pages/AdminDashboard/AdminDashboard.css");

const renderTree = tree => renderer.create(tree);
describe('<TotalCount>', () => {
  it('should render component', () => {
    expect(renderTree(<TotalCount 
    />).toJSON()).toMatchSnapshot();
  });
  
});