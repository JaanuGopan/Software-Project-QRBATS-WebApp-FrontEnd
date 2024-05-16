import renderer from 'react-test-renderer';
import React from "react";

import NormalButton from "./NormalButton";

jest.mock("../../../pages/AdminDashboard/AdminDashboard.css");

const renderTree = tree => renderer.create(tree);
describe('<NormalButton>', () => {
  it('should render component', () => {
    expect(renderTree(<NormalButton 
    />).toJSON()).toMatchSnapshot();
  });
  
});