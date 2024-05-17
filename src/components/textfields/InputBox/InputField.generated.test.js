import renderer from 'react-test-renderer';
import React from "react";

import InputField from "./InputField";

jest.mock("../../../pages/Event/EventCreation/EventCreation.css");

const renderTree = tree => renderer.create(tree);
describe('<InputField>', () => {
  it('should render component', () => {
    expect(renderTree(<InputField 
    />).toJSON()).toMatchSnapshot();
  });
  
});