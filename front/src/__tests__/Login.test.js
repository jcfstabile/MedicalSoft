import { render, screen } from '@testing-library/react';
import userEvent  from '@testing-library/user-event';
import Login from '../Login';

test('renders login component', () => {
  render(<Login />);
  expect(screen.getByText('INGRESAR')).toBeInTheDocument();

});

