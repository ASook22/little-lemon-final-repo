// src/components/ReservationForm.jsx
import { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

export default function ReservationForm({ availableTimes, dispatchOnDateChange,submitForm}) {
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

  const handleChange = (e) => {
    const { name, value } = e.target;
    const updatedValue = (name === 'adults' || name === 'children') ? parseInt(value, 10) : value;

    setFormData((prev) => ({
      ...prev,
      [name]: updatedValue,
    }));

  };

  const handleDateChange = (date) => {
    // ... (this function is fine) ...
    const dateOnly = new Date(date.getFullYear(), date.getMonth(), date.getDate());

    setFormData((prev) => ({
      ...prev,
      date: dateOnly,
    }));

    dispatchOnDateChange({ type: 'UPDATE_TIMES', payload: dateOnly });
  };

const handleSubmit = (e) => {
  e.preventDefault();
  
  if (!formData.time) {
    alert('Please select a time');
    return;
  }

  // 1. Convert the 24-hour time string (e.g., "17:00") to 12-hour format (e.g., "5:00 PM")
  const [hours, minutes] = formData.time.split(':');
  const dummyDate = new Date();
  dummyDate.setHours(parseInt(hours, 10), parseInt(minutes, 10));
  
  const formattedTime = dummyDate.toLocaleTimeString('en-US', {
    hour: 'numeric',
    minute: '2-digit',
    hour12: true,
  });

  // 2. Prepare the final data object with the formatted time
  const finalFormData = {
    ...formData,
    time: formattedTime,
  };

  const submissionTime = new Date().toLocaleString();
  const bookedDate = formData.date.toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  console.group('🍋 Little Lemon Booking Confirmation');
  console.log('Submitted At:', submissionTime);
  console.log('Booked Date:', bookedDate);
  console.log('Booked Time:', formattedTime); // Log the pretty version
  console.log('Guests:', `${formData.adults} adults + ${formData.children} children`);
  console.log('Name:', `${formData.title} ${formData.firstName} ${formData.lastName}`);
  console.log('Email:', formData.email);
  console.log('Phone:', formData.phone);
  console.log('Notes:', formData.notes || '(none)');
  console.groupEnd();

  // 3. Submit the updated data so the ConfirmedBooking page receives the 12-hour format
  submitForm(finalFormData);
};

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
            showFullMonthYearPicker={false}
            fixedHeight={false}
            aria-labelledby="date-label"
          />
        </div>

      {/* Time */}
      <div className="form-section time-section">
        <h2>TIME</h2>
        <div className="time-buttons">
          {availableTimes.map((t) => {
            // Convert "17:00" to "5:00 PM" for the button label
            const [hours, minutes] = t.split(':');
            const timeObj = new Date();
            timeObj.setHours(parseInt(hours, 10), parseInt(minutes, 10));
            
            const displayTime = timeObj.toLocaleTimeString('en-US', {
              hour: 'numeric',
              minute: '2-digit',
              hour12: true,
            });

            return (
              <button
                key={t}
                type="button"
                className={`time-btn ${formData.time === t ? 'selected' : ''}`}
                // We still store the 24h format in state for easy tracking
                onClick={() => setFormData((prev) => ({ ...prev, time: t }))}
                aria-pressed={formData.time === t}
                aria-label={`Select time ${displayTime}`}
              >
                {displayTime}
              </button>
            );
          })}
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
      <button
          type="submit"
          className="confirm-btn"
          aria-label="Confirm your reservation details"
        >
          Confirm Reservation
        </button>
    </form>
  );
}