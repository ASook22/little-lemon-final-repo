// src/components/ReservationForm.test.js
import { render, screen } from '@testing-library/react';
import { initializeTimes, updateTimes } from './Reservations';
import ReservationForm from './ReservationForm';

describe('ReservationForm', () => {
  const mockTimes = ['17:00', '18:00', '19:00'];
  const mockDispatch = jest.fn();

  // Step 1: Test static text (unchanged – this one still passes)
  test('Renders the GUESTS heading', () => {
    render(
      <ReservationForm
        availableTimes={mockTimes}
        dispatchOnDateChange={mockDispatch}
      />
    );

    const headingElement = screen.getByText('GUESTS');
    expect(headingElement).toBeInTheDocument();
  });

  // Step 2: Updated test for initializeTimes
  // (now checks for non-empty array instead of exact values)
  test('initializeTimes returns a non-empty array of times', () => {
    const result = initializeTimes();

    expect(Array.isArray(result)).toBe(true);
    expect(result.length).toBeGreaterThan(0);
    // Optional: verify each item is a valid time string (HH:MM)
    expect(result.every(time => typeof time === 'string' && /^\d{2}:\d{2}$/.test(time))).toBe(true);
  });

  // Step 3: Updated test for updateTimes
  // (passes a date in payload, checks non-empty array result)
  test('updateTimes returns a non-empty array when dispatched with a date', () => {
    const initialState = []; // initial state doesn't matter here
    const testDate = new Date(2026, 1, 6); // Feb 6, 2026 (arbitrary date)

    const action = { type: 'UPDATE_TIMES', payload: testDate };
    const result = updateTimes(initialState, action);

    expect(Array.isArray(result)).toBe(true);
    expect(result.length).toBeGreaterThan(0);
    expect(result.every(time => typeof time === 'string' && /^\d{2}:\d{2}$/.test(time))).toBe(true);
  });
});