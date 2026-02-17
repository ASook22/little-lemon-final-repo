// src/components/Nav.jsx
import { useState } from 'react';
import { Link } from 'react-router-dom';
import logo from "../assets/Logo.svg";

// Navigation bar with responsive mobile menu
export default function Nav() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);
  const closeMenu = () => setIsOpen(false);

  return (
    <nav className="nav" aria-label="Main navigation">
      <div className="nav-bar">
        {/* Hamburger toggle button */}
        <button 
          className={`hamburger ${isOpen ? 'open' : ''}`} 
          onClick={toggleMenu}
          aria-label="Toggle menu"
          aria-expanded={isOpen}
        >
          <span className="hamburger-line"></span>
          <span className="hamburger-line"></span>
          <span className="hamburger-line"></span>
        </button>

        {/* Centered logo – links to home */}
        <Link to="/" className="nav-logo" onClick={closeMenu}>
          <img src={logo} alt="Little Lemon Logo Nav" />
        </Link>

        {/* Spacer for balance */}
        <div className="nav-right-spacer"></div>
      </div>

      {/* Mobile dropdown menu */}
      <ul className={`nav-list ${isOpen ? 'open' : ''}`}>
        <li><Link to="/" onClick={closeMenu}>Home</Link></li>
        <li><a href="/#menu" onClick={closeMenu}>Specials</a></li>
        <li><a href="/#about" onClick={closeMenu}>About us</a></li>
        <li><a href="/#testimonials" onClick={closeMenu}>Reviews</a></li>
        <li><Link to="/reservations" onClick={closeMenu}>Reservations</Link></li>
      </ul>
    </nav>
  );
}