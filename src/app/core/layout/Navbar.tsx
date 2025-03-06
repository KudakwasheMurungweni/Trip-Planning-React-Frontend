import { Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import "./Navbar.css";

export const Navbar = () => {
  const { user, logout } = useAuth();

  return (
    <nav className="navbar">
      <div className="navbar-logo">ZimTripPlanner</div>
      <ul className="navbar-links">
        <li><Link to="/">Home</Link></li>
        <li><Link to="/destinations">Destinations</Link></li>
        
        {user ? (
          // Show these links only when user is logged in
          <>
            <li><Link to="/trips">Browse Trips</Link></li>
            <li><Link to="/bookings">My Bookings</Link></li>
            <li><Link to="/reviews">My Reviews</Link></li>
            <li><button onClick={logout} className="logout-btn">Logout</button></li>
          </>
        ) : (
          // Show these links when user is NOT logged in
          <>
            <li><Link to="/login">Login</Link></li>
            <li><Link to="/register">Register</Link></li>
          </>
        )}
      </ul>
    </nav>
  );
};