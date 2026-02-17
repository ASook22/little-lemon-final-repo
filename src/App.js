// src/App.js
import { Routes, Route, useNavigate } from 'react-router-dom'; // grouped imports
import Header from './components/Header';
import Nav from './components/Nav';
import Hero from './components/Hero';
import Main from './components/Main';
import Specials from './components/Specials';
import Testimonials from './components/Testimonials';
import Reservations from './components/Reservations';
import About from './components/About';
import Footer from './components/Footer';
import ConfirmedBooking from './components/ConfirmedBooking';
import { submitAPI } from './api';

// Main app component with routing and booking submission logic
export default function App() {
  const navigate = useNavigate();

  // Handles form submission → calls API → navigates on success
  const submitForm = (formData) => {
    const success = submitAPI(formData);
    if (success) {
      navigate('/confirmed', { state: formData });
    } else {
      // Optional: add error handling (not required but good practice)
      alert('Failed to submit reservation. Please try again.');
    }
  };

  return (
    <div className="app-wrapper">
      <Header />
      <Nav />

      {/* Main content landmark – improves accessibility */}
      <main role="main">
        <Routes>
          {/* Home route */}
          <Route
            path="/"
            element={
              <Main>
                <Hero />
                <Specials />
                <About />
                <Testimonials />
              </Main>
            }
          />

          {/* Reservations route – passes submit handler */}
          <Route
            path="/reservations"
            element={<Reservations submitForm={submitForm} />}
          />

          {/* Confirmation route */}
          <Route path="/confirmed" element={<ConfirmedBooking />} />
        </Routes>
      </main>

      <Footer />
    </div>
  );
}