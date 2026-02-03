import { Routes, Route } from 'react-router-dom';
import { useState, useEffect } from 'react'; // ← add these imports

import Header from './components/Header';
import Nav from './components/Nav';
import Hero from './components/Hero';
import Main from './components/Main';
import Specials from './components/Specials';
import Testimonials from './components/Testimonials';
import Reservations from './components/Reservations';
import About from './components/About';
import Footer from './components/Footer';

function App() {
  const [showBackToTop, setShowBackToTop] = useState(false);

  // Show button after scrolling down 300px
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 300) {
        setShowBackToTop(true);
      } else {
        setShowBackToTop(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

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
              <Reservations />
            </>
          }
        />
      </Routes>

      <Footer />

      {/* Back to Top Button */}
      <button
        className={`back-to-top ${showBackToTop ? 'visible' : ''}`}
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        aria-label="Back to top"
      >
        ↑
      </button>
    </div>
  );
}

export default App;