// src/components/ConfirmedBooking.jsx
import { useLocation } from 'react-router-dom';

// Confirmation page – displays booking details or fallback message
export default function ConfirmedBooking() {
  const location = useLocation();
  const formData = location.state;

  if (!formData) {
    return (
      <div className="reservation-success" role="alert">
        <h3>Reservation Status</h3>
        <p>No booking details found. Please book a table via the form.</p>
      </div>
    );
  }

  // Derive display values from form data
  const nameText = `${formData.title} ${formData.firstName} ${formData.lastName}`;
  const totalGuests = formData.adults + formData.children;
  const guestText = totalGuests === 1 ? 'guest' : 'guests';

  // Format date
  const dateStr = new Date(formData.date).toLocaleDateString('en-US', {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
  });

  // Format time (24h → 12h)
  const [hours, minutes] = formData.time.split(':');
  const dummyDate = new Date();
  dummyDate.setHours(parseInt(hours), parseInt(minutes));
  const timeStr = dummyDate.toLocaleTimeString('en-US', {
    hour: 'numeric',
    minute: '2-digit',
    hour12: true,
  });

  return (
    <section className="confirmation-section" aria-live="polite">
      <div className="reservation-success">
        <h3>Reservation Confirmed!</h3>
        <br />
        <p className="confirmation-message">
          Thank you for your confirmation, <strong>{nameText}</strong>.<br />
          We look forward to having your party of <strong>{totalGuests} {guestText}</strong> on
          <strong> {dateStr} at {timeStr}</strong> at Little Lemon Chicago.
        </p>
        <br />
        <p className="confirmation-message">
          A confirmation email has been sent to <strong>{formData.email}</strong>.
        </p>
      </div>
    </section>
  );
}