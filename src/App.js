import { Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Nav from './components/Nav';
import Hero from './components/Hero';
import Main from './components/Main';
import Specials from './components/Specials';
import Testimonials from './components/Testimonials';
import Reservations from './components/Reservations';
import Footer from './components/Footer';

function App() {
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
              <Hero />
              <Main>
                <Specials />
                <Testimonials />
              </Main>
            </>
          }
        />

        {/* RESERVATIONS */}
        <Route
          path="/reservations"
          element={<Reservations />}
        />
      </Routes>

      <Footer />
    </div>
  );
}

export default App;
