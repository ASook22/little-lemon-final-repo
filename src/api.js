// src/api.js

/**
 * Seeded random number generator for consistent but pseudo-random results
 * based on the date (used to simulate varying available times).
 */
const seededRandom = function (seed) {
  var m = 2**35 - 31;
  var a = 185852;
  var s = seed % m;
  return function () {
    return (s = s * a % m) / m;
  };
};

/**
 * Fetches available reservation times for a given date.
 * Returns an array of time strings (e.g. "17:00", "17:30") between 5 PM and 11 PM.
 * Uses seeded random to simulate realistic availability.
 * @param {Date} date - The date to fetch times for
 * @returns {string[]} Array of available times in 24-hour format
 */
export function fetchAPI(date) {
  let result = [];
  let random = seededRandom(date.getDate());

  for (let i = 17; i <= 23; i++) {
    if (random() < 0.5) {
      result.push(i + ':00');
    }
    if (random() < 0.5) {
      result.push(i + ':30');
    }
  }
  return result;
}

/**
 * Submits a reservation to "storage" (localStorage).
 * Adds the form data to an array of bookings and saves it.
 * Always returns true (simulates successful API call).
 * @param {Object} formData - The reservation details from the form
 * @returns {boolean} Always true (success)
 */
export function submitAPI(formData) {
  // Retrieve existing bookings or start with empty array
  const existingBookings = JSON.parse(localStorage.getItem("littleLemonBookings") || "[]");
  
  // Add the new booking
  existingBookings.push(formData);
  
  // Save back to localStorage
  localStorage.setItem("littleLemonBookings", JSON.stringify(existingBookings));
  
  return true;
}