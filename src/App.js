// src/App.js
import Header from './components/Header';
import Nav from './components/Nav';
import Hero from './components/Hero';
import Main from './components/Main';
import Specials from './components/Specials';
import Testimonials from './components/Testimonials';
import Footer from './components/Footer';

import './App.css';

function App() {
  return (
    <div className="app-wrapper">
      <Header />
      <Nav />
      <Hero />
      <Main>
        <Specials />
        <Testimonials />
      </Main>
      <Footer />
    </div>
  );
}

export default App;