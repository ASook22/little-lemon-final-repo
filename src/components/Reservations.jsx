// src/components/Reservations.jsx
import { useReducer } from 'react';
import ReservationForm from './ReservationForm';
import { fetchAPI } from '../api';

// Reducer initializer – fetches initial available times for today
export const initializeTimes = () => {
  return fetchAPI(new Date());
};

// Reducer – updates available times when date changes
export const updateTimes = (state, action) => {
  switch (action.type) {
    case 'UPDATE_TIMES':
      return fetchAPI(action.payload);
    default:
      return state;
  }
};

// Reservations page – main container for the booking form
export default function Reservations({ submitForm }) {
  const [availableTimes, dispatch] = useReducer(
    updateTimes,
    [],
    initializeTimes
  );

  return (
    <section className="reservations-section">
      <ReservationForm
        availableTimes={availableTimes}
        dispatchOnDateChange={dispatch}
        submitForm={submitForm}
      />
    </section>
  );
}