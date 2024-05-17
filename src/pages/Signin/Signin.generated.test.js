import renderer from 'react-test-renderer';
import React from "react";

import LoginForm from "../../components/layout/LoginLayout/LoginForm";
import Designer from "../../assets/Images/Designer.jpeg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import Signin from "./Signin";

jest.mock("./Signin.css");
jest.mock("../../components/layout/LoginLayout/LoginForm");
jest.mock("../../assets/Images/Designer.jpeg");
jest.mock("@fortawesome/react-fontawesome");
jest.mock("@fortawesome/free-solid-svg-icons");
jest.mock("react-router-dom");

const renderTree = tree => renderer.create(tree);
describe('<Signin>', () => {
  it('should render component', () => {
    expect(renderTree(<Signin 
    />).toJSON()).toMatchSnapshot();
  });
  
});