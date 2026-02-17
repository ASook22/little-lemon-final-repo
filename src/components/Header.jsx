// src/components/Header.jsx
import logo from "../assets/Logo.svg";

// Header with centered logo
export default function Header() {
  return (
    <header className="header">
      <div className="container">
        <img 
          src={logo}
          alt="Little Lemon Logo Header" 
          className="header-logo"
        />
      </div>
    </header>
  );
}