import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import store from './redux/app/store'; // Import your Redux store
import App from './App';

test('renders welcome message', () => {
  render(
    <Provider store={store}>
      <App />
    </Provider>
  );

  const welcomeMessage = screen.getByText(/WELCOME TO SKYTICKER/i);
  expect(welcomeMessage).toBeInTheDocument();
});
