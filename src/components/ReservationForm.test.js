// src/components/ReservationForm.test.js
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { initializeTimes, updateTimes } from './Reservations';
import ReservationForm from './ReservationForm';

describe('ReservationForm', () => {
  const mockTimes = ['17:00', '18:00', '19:00', '20:00'];
  const mockDispatch = jest.fn();
  const mockSubmit = jest.fn();

  const renderForm = () => {
    return render(
      <ReservationForm
        availableTimes={mockTimes}
        dispatchOnDateChange={mockDispatch}
        submitForm={mockSubmit}
      />
    );
  };

  // ──────────────────────────────────────────────
  // Step 1: Test HTML5 validation attributes (all pass)
  // ──────────────────────────────────────────────

  test('First Name input has correct HTML5 validation', () => {
    renderForm();
    const input = screen.getByLabelText(/First Name/i);

    expect(input).toHaveAttribute('required');
    expect(input).toHaveAttribute('minLength', '2');
    expect(input).toHaveAttribute('pattern', '[A-Za-z\\s]+');
    expect(input).toHaveAttribute('title', expect.stringContaining('letters'));
  });

  test('Last Name input has correct HTML5 validation', () => {
    renderForm();
    const input = screen.getByLabelText(/Last Name/i);

    expect(input).toHaveAttribute('required');
    expect(input).toHaveAttribute('minLength', '2');
    expect(input).toHaveAttribute('pattern', '[A-Za-z\\s]+');
    expect(input).toHaveAttribute('title', expect.stringContaining('letters'));
  });

  test('Email input has correct HTML5 validation', () => {
    renderForm();
    const input = screen.getByLabelText(/Email/i);

    expect(input).toHaveAttribute('type', 'email');
    expect(input).toHaveAttribute('required');
  });

  test('Phone input has correct HTML5 validation', () => {
    renderForm();
    const input = screen.getByLabelText(/Phone/i);

    expect(input).toHaveAttribute('type', 'tel');
    expect(input).toHaveAttribute('required');
    expect(input).toHaveAttribute('pattern', '[0-9]{3}[- ]?[0-9]{3}[- ]?[0-9]{4}');
    expect(input).toHaveAttribute('title', expect.stringContaining('10 digits'));
  });

  test('Adults select has correct HTML5 validation', () => {
    renderForm();
    const select = screen.getByLabelText(/Adults/i);

    expect(select).toHaveAttribute('required');
    expect(select).toHaveAttribute('min', '1');
  });

  // ──────────────────────────────────────────────
  // Step 2: Test JavaScript validation (valid and invalid states)
  // ──────────────────────────────────────────────

  test('JavaScript validation passes when form is completely valid', async () => {
    renderForm();

    await userEvent.type(screen.getByLabelText(/First Name/i), 'Amrit');
    await userEvent.type(screen.getByLabelText(/Last Name/i), 'Sooklal');
    await userEvent.type(screen.getByLabelText(/Email/i), 'amrit@example.com');
    await userEvent.type(screen.getByLabelText(/Phone/i), '4168365130');

    // Select first time button (partial match)
    const timeButtons = screen.getAllByRole('button', { name: /Select /i });
    await userEvent.click(timeButtons[0]);

    await waitFor(() => {
      expect(screen.queryByText(/required/i)).not.toBeInTheDocument();
      expect(screen.queryByText(/invalid/i)).not.toBeInTheDocument();
      expect(screen.queryByText(/2 characters/i)).not.toBeInTheDocument();
      expect(screen.queryByText(/10 digits/i)).not.toBeInTheDocument();
    });
  });

  test('JavaScript validation shows errors for invalid/empty required fields after interaction', async () => {
    renderForm();

    // Fill invalid values and blur each
    await userEvent.type(screen.getByLabelText(/First Name/i), 'A'); // too short
    await userEvent.tab();

    await userEvent.type(screen.getByLabelText(/Last Name/i), ''); // empty
    await userEvent.tab();

    await userEvent.type(screen.getByLabelText(/Email/i), 'invalid'); // bad email
    await userEvent.tab();

    await userEvent.type(screen.getByLabelText(/Phone/i), '123'); // too short
    await userEvent.tab();

    await waitFor(() => {
      // Use specific error text to avoid "multiple required" issue
      expect(screen.getByText(/2 characters/i)).toBeInTheDocument(); // first name
      expect(screen.getByText(/Last name required/i)).toBeInTheDocument(); // specific
      expect(screen.getByText(/Invalid/i)).toBeInTheDocument(); // email
      expect(screen.getByText(/10 digits/i)).toBeInTheDocument(); // phone
    });
  });

  // Reducer tests (unchanged)
  test('initializeTimes returns a non-empty array of times', () => {
    const result = initializeTimes();
    expect(Array.isArray(result)).toBe(true);
    expect(result.length).toBeGreaterThan(0);
    expect(result.every(time => typeof time === 'string' && /^\d{2}:\d{2}$/.test(time))).toBe(true);
  });

  test('updateTimes returns a non-empty array when dispatched with a date', () => {
    const initialState = [];
    const testDate = new Date(2026, 1, 6);
    const action = { type: 'UPDATE_TIMES', payload: testDate };
    const result = updateTimes(initialState, action);

    expect(Array.isArray(result)).toBe(true);
    expect(result.length).toBeGreaterThan(0);
    expect(result.every(time => typeof time === 'string' && /^\d{2}:\d{2}$/.test(time))).toBe(true);
  });
});