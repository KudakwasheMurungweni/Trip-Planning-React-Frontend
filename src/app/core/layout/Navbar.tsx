// Navbar.tsx
import { Link } from "react-router-dom";
import "./Navbar.css";

export const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="navbar-logo">ZimTripPlanner</div>
      <ul className="navbar-links">
        
       
        <li><Link to="/dashboard">Dashboard</Link></li>
        <li><Link to="/create-trip">Create Trip</Link></li>
        <li><Link to="/bookings">Bookings</Link></li>
        <li><Link to="/login">Login</Link></li>
      </ul>
    </nav>
  );
};
