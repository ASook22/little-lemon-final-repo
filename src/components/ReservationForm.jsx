// src/components/ReservationForm.jsx
import { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

export default function ReservationForm() {
  const [formData, setFormData] = useState({
    date: new Date(),
    time: '',
    adults: 2,
    children: 0,
    notes: '',
    title: 'Mr.',
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
  });

  const [submitted, setSubmitted] = useState(false);

  const availableTimes = [
    '17:00', '17:30', '18:00', '18:30', '19:00', '19:30',
    '20:00', '20:30', '21:00', '21:30', '22:00',
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleDateChange = (date) => {
    setFormData((prev) => ({
      ...prev,
      date,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.time) {
      alert('Please select a time');
      return;
    }
    console.log('Reservation submitted:', formData);
    setSubmitted(true);
  };

  if (submitted) {
    const dateStr = formData.date.toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });

    const totalGuests = formData.adults + formData.children;
    const guestText = totalGuests === 1 ? 'guest' : 'guests';
    const nameText = `${formData.title.toUpperCase()} ${formData.firstName.toUpperCase()} ${formData.lastName.toUpperCase()}`;

    return (
      <div className="reservation-success">
        <h3>Reservation Confirmed!</h3>
        <p>Thank you! We look forward to seeing you.</p>
        <p className="confirmation-message">
          Thank you for your confirmation, <strong>{nameText}</strong> we look forward to having your party of <strong>{totalGuests} {guestText}</strong> on <strong>{dateStr}</strong> at <strong>{formData.time}</strong> at Little Lemon Chicago.
        </p>
      </div>
    );
  }

  return (
    <form className="reservation-form" onSubmit={handleSubmit}>
      {/* Guests */}
      <div className="form-section guests-section">
        <h2>GUESTS</h2>
        <div className="guests-row">
          <div className="form-group">
            <label>Adults</label>
            <select name="adults" value={formData.adults} onChange={handleChange}>
              {[...Array(10)].map((_, i) => (
                <option key={i} value={i + 1}>
                  {i + 1}
                </option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <label>Children</label>
            <select name="children" value={formData.children} onChange={handleChange}>
              {[...Array(6)].map((_, i) => (
                <option key={i} value={i}>
                  {i}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

     {/* Date + Time – side by side */}
<div className="date-time-row">
  {/* Date */}
  <div className="form-section date-section">
    <h2>DATE</h2>
    <DatePicker
      selected={formData.date}
      onChange={handleDateChange}
      dateFormat="MMMM d, yyyy"
      minDate={new Date()}
      placeholderText="Select date"
      className="form-input calendar-input"
      calendarClassName="big-calendar"
      required
      inline
      showFullMonthYearPicker={false}      // prevents showing adjacent months
      fixedHeight={false}                  // removes the forced 6-week height
    />
  </div>

  {/* Time */}
  <div className="form-section time-section">
    <h2>TIME</h2>
    <div className="time-buttons">
      {availableTimes.map((t) => (
        <button
          key={t}
          type="button"
          className={`time-btn ${formData.time === t ? 'selected' : ''}`}
          onClick={() => setFormData((prev) => ({ ...prev, time: t }))}
        >
          {t}
        </button>
      ))}
    </div>
  </div>
</div>

      {/* Notes */}
      <div className="form-section">
        <h2>NOTES/REQUESTS</h2>
        <textarea
          name="notes"
          value={formData.notes}
          onChange={handleChange}
          placeholder="My son is allergic to seafood."
          className="form-input textarea"
        />
      </div>

      {/* Contact */}
      <div className="form-section contact-section">
        <h2>CONTACT</h2>

        <div className="contact-row">
          <div className="form-group small">
            <label>Title</label>
            <select name="title" value={formData.title} onChange={handleChange}>
              <option>Mr.</option>
              <option>Mrs.</option>
              <option>Ms.</option>
              <option>Dr.</option>
            </select>
          </div>

          <div className="form-group">
            <label>First Name</label>
            <input
              type="text"
              name="firstName"
              placeholder="John"
              value={formData.firstName}
              onChange={handleChange}
              required
              className="form-input"
            />
          </div>

          <div className="form-group">
            <label>Last Name</label>
            <input
              type="text"
              name="lastName"
              placeholder="Doe"
              value={formData.lastName}
              onChange={handleChange}
              required
              className="form-input"
            />
          </div>
        </div>

        <div className="form-group">
          <label>Email</label>
          <input
            type="email"
            name="email"
            placeholder="johndoe@gmail.com"
            value={formData.email}
            onChange={handleChange}
            required
            className="form-input"
          />
        </div>

        <div className="form-group">
          <label>Phone</label>
          <input
            type="tel"
            name="phone"
            placeholder="123-456-7890"
            value={formData.phone}
            onChange={handleChange}
            required
            className="form-input"
          />
        </div>
      </div>

      {/* Submit */}
      <button type="submit" className="confirm-btn">
        Confirm Reservation
      </button>
    </form>
  );
}