// src/components/Nav.js
function Nav() {
  return (
    <nav className="nav" aria-label="Main navigation">
      <ul className="nav-list">
        <li><a href="#home">Home</a></li>
        <li><a href="#menu">Menu</a></li>
        <li><a href="#reservations">Reservations</a></li>
        <li><a href="#about">About</a></li>
      </ul>
    </nav>
  );
}

export default Nav;