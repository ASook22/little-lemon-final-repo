// src/App.test.js
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import App from './App';

describe('App', () => {
  test('renders without crashing and shows header', () => {
    render(
      <MemoryRouter initialEntries={['/']}>
        <App />
      </MemoryRouter>
    );

    expect(screen.getByRole('banner')).toBeInTheDocument(); // header
    expect(screen.getByRole('navigation')).toBeInTheDocument(); // nav
    expect(screen.getByRole('main')).toBeInTheDocument(); // main landmark
  });

  test('navigates to reservations page', () => {
    render(
      <MemoryRouter initialEntries={['/reservations']}>
        <App />
      </MemoryRouter>
    );

    expect(screen.getByText(/Confirm Reservation/i)).toBeInTheDocument();
  });
});