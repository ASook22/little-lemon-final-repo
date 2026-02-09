// src/components/Reservations.jsx
import { useReducer } from 'react';
import ReservationForm from './ReservationForm';
import { fetchAPI} from '../api';  // adjust path if needed

export const initializeTimes = () => {
  return fetchAPI(new Date());
};

export const updateTimes = (state, action) => {
  switch (action.type) {
    case 'UPDATE_TIMES':
      return fetchAPI(action.payload);
    default:
      return state;
  }
};

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