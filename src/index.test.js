import React from "react";
import { render } from "@testing-library/react";
import { createMemoryHistory } from "history";
import { Router } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./redux/app/store";
import App from "./App";
import reportWebVitals from "./reportWebVitals";

test("renders without crashing", () => {
  const history = createMemoryHistory({
    initialEntries: ["/"],
    // Add a default location object to the history object
    initialIndex: 0,
    // Add any other necessary configurations
  });
  const { getByTestId } = render(
    <Provider store={store}>
      <Router history={history}>
        <App />
      </Router>
    </Provider>
  );

  expect(getByTestId("app")).toBeInTheDocument();
});

test("renders the necessary providers", () => {
  const history = createMemoryHistory({
    initialEntries: ["/"],
    // Add a default location object to the history object
    initialIndex: 0,
    // Add any other necessary configurations
  });
  const { container } = render(
    <Provider store={store}>
      <Router history={history}>
        <App />
      </Router>
    </Provider>
  );

  expect(container.querySelector("Provider")).toBeInTheDocument();
  expect(container.querySelector("Router")).toBeInTheDocument();
});

test("calls reportWebVitals", () => {
  const mockReportWebVitals = jest.fn();
  reportWebVitals(mockReportWebVitals);

  expect(mockReportWebVitals).toHaveBeenCalled();
});