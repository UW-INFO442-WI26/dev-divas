import { Link } from 'react-router-dom';
import '../css/Navigation.css';

function Navigation() {
  return (
    <nav className="navbar">
      <div className="nav-left">
        <img src="/draft heart logo.jpeg" alt="Logo" className="logo" />
      </div>
      <div className="nav-right">
        <Link to="/" className="nav-link">Home</Link>
        <Link to="/find-school" className="nav-link">Find School</Link>
        <Link to="/mission" className="nav-link">Mission</Link>
        <Link to="/contact" className="nav-link">Contact</Link>
        <Link to="/qualifications" className="nav-link"> Profile</Link>
        <Link to="/log-in" className="nav-link">Log In</Link>
        <Link to="/interest-form" className="volunteer-button">Volunteer Now</Link>
      </div>
    </nav>
  );
}

export default Navigation;
