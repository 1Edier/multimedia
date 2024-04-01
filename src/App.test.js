import { render, screen } from '@testing-library/react';
import App from './App';

test('renders learn react link', () => {
  render(<App />);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});
/*
import gon from './assents/img/gon.jpeg';
import killua from './assents/img/killua.png';
*/ 