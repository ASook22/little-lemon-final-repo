//src/App.js

import { Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Nav from './components/Nav';
import Hero from './components/Hero';
import Main from './components/Main';
import Specials from './components/Specials';
import Testimonials from './components/Testimonials';
import Reservations from './components/Reservations';
import About from './components/About';
import Footer from './components/Footer';
import ConfirmedBooking from "./components/ConfirmedBooking";
import { useNavigate } from "react-router-dom";
import { submitAPI } from './api';   

export default function App() {
  const navigate = useNavigate();

 const submitForm = (formData) => {
  const success = submitAPI(formData);
  if (success) {
    navigate("/confirmed", { state: formData });
  }
};

  return (
    <div className="app-wrapper">
      <Header />
      <Nav />

      <Routes>
        {/* HOME */}
        <Route
          path="/"
          element={
            <>
              <Main>
                <Hero />
                <Specials />
                <About />
                <Testimonials />
              </Main>
            </>
          }
        />

        {/* RESERVATIONS */}
        <Route
          path="/reservations"
          element={
            <>
              <Reservations submitForm={submitForm}/>
            </>
          }
        />
        <Route 
          path="/confirmed" 
          element={<ConfirmedBooking/>} 
        />

      </Routes>
      <Footer />
    </div>
  );
}
