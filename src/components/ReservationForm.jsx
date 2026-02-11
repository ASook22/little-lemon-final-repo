// src/components/ReservationForm.jsx
import { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

export default function ReservationForm({ availableTimes, dispatchOnDateChange, submitForm }) {
  const [formData, setFormData] = useState({
    date: null,
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

  const [formErrors, setFormErrors] = useState({});
  const [touched, setTouched] = useState({});

  const validateField = (name, value) => {
    switch (name) {
      case 'adults':
        return value < 1 ? 'At least 1 adult required' : '';
      case 'firstName':
        if (!value?.trim()) return 'First name required';
        if (value.length < 2) return 'At least 2 characters';
        if (!/^[A-Za-z\s'-]+$/.test(value)) return 'Only letters, spaces, hyphens, and apostrophes allowed';
        return '';
      case 'lastName':
        if (!value?.trim()) return 'Last name required';
        if (value.length < 2) return 'At least 2 characters';
        if (!/^[A-Za-z\s'-]+$/.test(value)) return 'Only letters, spaces, hyphens, and apostrophes allowed';
        return '';
      case 'email':
        if (!value) return 'Email required';
        if (!/\S+@\S+\.\S+/.test(value)) return 'Invalid email';
        return '';
      case 'phone': {
        const digits = (value || '').replace(/\D/g, '');
        if (!value?.trim()) return 'Phone required';
        if (digits.length !== 10) return 'Exactly 10 digits required';
        return '';
      }
      case 'time':
        return !value ? 'Please select a time' : '';
      case 'date':
        return !value ? 'Please select a date' : '';
      default:
        return '';
    }
  };

  const validateForm = () => {
    const errors = {};
    Object.keys(formData).forEach(key => {
      const error = validateField(key, formData[key]);
      if (error && touched[key]) {
        errors[key] = error;
      }
    });
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    let updatedValue = value;

    if (name === 'phone') {
      updatedValue = value.replace(/[^0-9\s-]/g, '').slice(0, 14);
    } else if (name === 'adults' || name === 'children') {
      updatedValue = parseInt(value, 10) || 0;
    }

    setFormData(prev => {
      const newData = { ...prev, [name]: updatedValue };
      setTouched(prev => ({ ...prev, [name]: true }));
      const error = validateField(name, updatedValue);
      setFormErrors(prev => ({ ...prev, [name]: error }));
      return newData;
    });
  };

  const handleDateChange = (date) => {
    const dateOnly = date ? new Date(date.getFullYear(), date.getMonth(), date.getDate()) : null;
    setFormData(prev => ({ ...prev, date: dateOnly }));
    setTouched(prev => ({ ...prev, date: true }));
    if (dateOnly) dispatchOnDateChange({ type: 'UPDATE_TIMES', payload: dateOnly });

    const error = validateField('date', dateOnly);
    setFormErrors(prev => ({ ...prev, date: error }));
  };

  const handleTimeSelect = (time24h) => {
    const [h, m] = time24h.split(':');
    const d = new Date();
    d.setHours(parseInt(h, 10), parseInt(m, 10));
    const time12h = d.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true });

    setFormData(prev => ({ ...prev, time: time12h }));
    setTouched(prev => ({ ...prev, time: true }));

    const error = validateField('time', time12h);
    setFormErrors(prev => ({ ...prev, time: error }));
  };

  const handleBlur = (e) => {
    const { name } = e.target;
    setTouched(prev => ({ ...prev, [name]: true }));
    validateForm();
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const allFields = ['adults', 'firstName', 'lastName', 'email', 'phone', 'time', 'date'];
    const newTouched = {};
    allFields.forEach(f => newTouched[f] = true);
    setTouched(prev => ({ ...prev, ...newTouched }));

    if (!validateForm()) {
      alert('Please fix the errors in the form');
      return;
    }

    let phoneFormatted = formData.phone;
    const digits = phoneFormatted.replace(/\D/g, '');
    if (digits.length === 10 && !phoneFormatted.includes('-')) {
      phoneFormatted = `${digits.slice(0,3)}-${digits.slice(3,6)}-${digits.slice(6)}`;
    }

    const submissionTime = new Date().toLocaleString('en-US', {
      weekday: 'short',
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: true,
    });

    const bookedDate = formData.date?.toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    }) || 'Not selected';

    console.group('🍋 Little Lemon Booking Confirmation');
    console.log('Submitted At:', submissionTime);
    console.log('Booked Date:', bookedDate);
    console.log('Booked Time:', formData.time || 'Not selected');
    console.log('Guests:', `${formData.adults} adults + ${formData.children} children`);
    console.log('Name:', `${formData.title} ${formData.firstName} ${formData.lastName}`);
    console.log('Email:', formData.email);
    console.log('Phone:', phoneFormatted);
    console.log('Notes:', formData.notes || '(none)');
    console.groupEnd();

    submitForm(formData);
  };

  const isFormValid = Object.keys(formErrors).length === 0 && formData.time && formData.date;

  return (
    <section aria-labelledby="reservation-form-heading">
      <h1 id="reservation-form-heading" className="sr-only">Make a Reservation</h1>

      <form className="reservation-form" onSubmit={handleSubmit} noValidate>
        {/* Guests */}
        <fieldset>
          <legend className="sr-only">Guest Information</legend>
          <div className="form-section guests-section">
            <h2>GUESTS</h2>
            <div className="guests-row">
              <div className="form-group">
                <label htmlFor="adults">Adults</label>
                <select
                  id="adults"
                  name="adults"
                  value={formData.adults}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  required
                  min="1"
                  aria-required="true"
                  aria-invalid={touched.adults && !!formErrors.adults}
                  aria-describedby={touched.adults && formErrors.adults ? 'adults-error' : undefined}
                  className={`form-input ${touched.adults && formErrors.adults ? 'invalid' : ''}`}
                >
                  {[...Array(10)].map((_, i) => (
                    <option key={i} value={i + 1}>{i + 1}</option>
                  ))}
                </select>
                {touched.adults && formErrors.adults && (
                  <p id="adults-error" className="error-message">
                    {formErrors.adults}
                  </p>
                )}
              </div>

              <div className="form-group">
                <label htmlFor="children">Children</label>
                <select
                  id="children"
                  name="children"
                  value={formData.children}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  aria-invalid={touched.children && !!formErrors.children}
                  aria-describedby={touched.children && formErrors.children ? 'children-error' : undefined}
                  className={`form-input ${touched.children && formErrors.children ? 'invalid' : ''}`}
                >
                  {[...Array(6)].map((_, i) => (
                    <option key={i} value={i}>{i}</option>
                  ))}
                </select>
                {touched.children && formErrors.children && (
                  <p id="children-error" className="error-message">
                    {formErrors.children}
                  </p>
                )}
              </div>
            </div>
          </div>
        </fieldset>

        {/* Date + Time */}
        <fieldset>
          <legend className="sr-only">Date and Time Selection</legend>
          <div className="date-time-row">
            <div className="form-section date-section">
              <h2>DATE</h2>
              <DatePicker
                selected={formData.date}
                onChange={handleDateChange}
                onBlur={() => setTouched(prev => ({ ...prev, date: true }))}
                dateFormat="MMMM d, yyyy"
                minDate={new Date()}
                placeholderText="Select date"
                className={`form-input calendar-input ${touched.date && formErrors.date ? 'invalid' : ''}`}
                calendarClassName="big-calendar"
                required
                inline
                aria-labelledby="date-heading"
                aria-required="true"
                aria-invalid={touched.date && !!formErrors.date}
                aria-describedby={touched.date && formErrors.date ? 'date-error' : undefined}
              />
              <h3 id="date-heading" className="sr-only">Reservation Date</h3>
              {touched.date && formErrors.date && (
                <p id="date-error" className="error-message">
                  {formErrors.date}
                </p>
              )}
            </div>

            <div className="form-section time-section">
              <h2>TIME</h2>
              <div className="time-buttons" role="radiogroup" aria-labelledby="time-heading">
                <h3 id="time-heading" className="sr-only">Reservation Time</h3>
                {availableTimes.map((t) => {
                  const [h, m] = t.split(':');
                  const d = new Date();
                  d.setHours(parseInt(h, 10), parseInt(m, 10));
                  const displayTime = d.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true });

                  return (
                    <button
                      key={t}
                      type="button"
                      className={`time-btn ${formData.time === displayTime ? 'selected' : ''} ${touched.time && formErrors.time ? 'invalid' : ''}`}
                      onClick={() => handleTimeSelect(t)}
                      aria-pressed={formData.time === displayTime}
                      aria-label={`Select ${displayTime}`}
                    >
                      {displayTime}
                    </button>
                  );
                })}
              </div>
              {touched.time && formErrors.time && (
                <p id="time-error" className="error-message">
                  {formErrors.time}
                </p>
              )}
            </div>
          </div>
        </fieldset>

        {/* Notes */}
        <fieldset>
          <legend className="sr-only">Special Requests</legend>
          <div className="form-section">
            <h2>NOTES/REQUESTS</h2>
            <textarea
              name="notes"
              value={formData.notes}
              onChange={handleChange}
              onBlur={handleBlur}
              placeholder="Allergies, Special Occasions etc."
              className="form-input textarea"
              aria-describedby="notes-desc"
            />
            <p id="notes-desc" className="sr-only">Optional field for allergies or special requests</p>
          </div>
        </fieldset>

        {/* Contact */}
        <fieldset>
          <legend className="sr-only">Contact Details</legend>
          <div className="form-section contact-section">
            <h2>CONTACT</h2>

            <div className="contact-row">
              <div className="form-group small">
                <label htmlFor="title">Title</label>
                <select
                  id="title"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  required
                  aria-required="true"
                >
                  <option>Mr.</option>
                  <option>Mrs.</option>
                  <option>Ms.</option>
                  <option>Dr.</option>
                </select>
              </div>

              <div className="form-group">
                <label htmlFor="firstName">First Name</label>
                <input
                  id="firstName"
                  type="text"
                  name="firstName"
                  placeholder="John"
                  value={formData.firstName}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  required
                  minLength={2}
                  pattern="[A-Za-z\s']+"
                  title="Only letters, spaces, hyphens, apostrophes allowed"
                  aria-required="true"
                  aria-invalid={touched.firstName && !!formErrors.firstName}
                  aria-describedby={touched.firstName && formErrors.firstName ? 'firstName-error' : undefined}
                  className={`form-input ${touched.firstName && formErrors.firstName ? 'invalid' : ''}`}
                />
                {touched.firstName && formErrors.firstName && (
                  <p id="firstName-error" className="error-message">
                    {formErrors.firstName}
                  </p>
                )}
              </div>

              <div className="form-group">
                <label htmlFor="lastName">Last Name</label>
                <input
                  id="lastName"
                  type="text"
                  name="lastName"
                  placeholder="Doe"
                  value={formData.lastName}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  required
                  minLength={2}
                  pattern="[A-Za-z\s']+"
                  title="Only letters, spaces, hyphens, apostrophes allowed"
                  aria-required="true"
                  aria-invalid={touched.lastName && !!formErrors.lastName}
                  aria-describedby={touched.lastName && formErrors.lastName ? 'lastName-error' : undefined}
                  className={`form-input ${touched.lastName && formErrors.lastName ? 'invalid' : ''}`}
                />
                {touched.lastName && formErrors.lastName && (
                  <p id="lastName-error" className="error-message">
                    {formErrors.lastName}
                  </p>
                )}
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input
                id="email"
                type="email"
                name="email"
                placeholder="johndoe@gmail.com"
                value={formData.email}
                onChange={handleChange}
                onBlur={handleBlur}
                required
                aria-required="true"
                aria-invalid={touched.email && !!formErrors.email}
                aria-describedby={touched.email && formErrors.email ? 'email-error' : undefined}
                className={`form-input ${touched.email && formErrors.email ? 'invalid' : ''}`}
              />
              {touched.email && formErrors.email && (
                <p id="email-error" className="error-message">
                  {formErrors.email}
                </p>
              )}
            </div>

            <div className="form-group">
              <label htmlFor="phone">Phone</label>
              <input
                id="phone"
                type="tel"
                name="phone"
                placeholder="416-836-5130 or 4168365130"
                value={formData.phone}
                onChange={handleChange}
                onBlur={handleBlur}
                required
                pattern="[0-9]{3}[-]?[0-9]{3}[-]?[0-9]{4}"
                title="Enter 10 digits (hyphens optional)"
                aria-required="true"
                aria-invalid={touched.phone && !!formErrors.phone}
                aria-describedby={touched.phone && formErrors.phone ? 'phone-error' : undefined}
                className={`form-input ${touched.phone && formErrors.phone ? 'invalid' : ''}`}
              />
              {touched.phone && formErrors.phone && (
                <p id="phone-error" className="error-message">
                  {formErrors.phone}
                </p>
              )}
            </div>
          </div>
        </fieldset>

        <button
          type="submit"
          className="confirm-btn"
          aria-label="Confirm your reservation details"
          disabled={!isFormValid}
        >
          Confirm Reservation
        </button>
      </form>
    </section>
  );
}