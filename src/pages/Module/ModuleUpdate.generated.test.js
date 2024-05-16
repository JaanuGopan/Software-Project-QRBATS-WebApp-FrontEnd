import renderer from 'react-test-renderer';
import React from "react";
import ModuleUpdate from "./ModuleUpdate";

const renderTree = tree => renderer.create(tree);
describe('<ModuleUpdate>', () => {
  it('should render component', () => {
    expect(renderTree(<ModuleUpdate 
    />).toJSON()).toMatchSnapshot();
  });
  
});