import { Link } from 'react-router-dom';

function Nav() {
  return (
    <nav className="nav" aria-label="Main navigation">
      <ul className="nav-list">
        <li>
          <Link to="/" style={{ color: 'white', textDecoration: 'none' }}>
            Home
          </Link>
        </li>

        <li><a href="#menu">Menu</a></li>

        <li>
          <Link to="/reservations" style={{ color: 'white', textDecoration: 'none' }}>
            Reservations
          </Link>
        </li>
      </ul>
    </nav>
  );
}

export default Nav;
