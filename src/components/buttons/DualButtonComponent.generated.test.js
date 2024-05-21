import renderer from 'react-test-renderer';
import React, { useState } from "react";
import DualButtonComponent from "./DualButtonComponent";

const renderTree = tree => renderer.create(tree);
describe('<DualButtonComponent>', () => {
  it('should render component', () => {
    expect(renderTree(<DualButtonComponent 
    />).toJSON()).toMatchSnapshot();
  });
  
});