import { useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import "./Navbar.css";

export const Navbar = () => {
  const { user, logout } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleLogout = () => {
    logout();
    setIsMenuOpen(false);
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-logo">
          ZimTripPlanner
        </Link>

        {/* Mobile menu button */}
        <button className="navbar-toggle" onClick={toggleMenu} aria-label="Toggle menu">
          {isMenuOpen ? "✕" : "☰"}
        </button>

        {/* Navigation links */}
        <ul className={`navbar-links ${isMenuOpen ? "active" : ""}`}>
          <li>
            <Link to="/" onClick={() => setIsMenuOpen(false)}>Home</Link>
          </li>
          <li>
            <Link to="/destinations" onClick={() => setIsMenuOpen(false)}>Destinations</Link>
          </li>
          
          {user ? (
            <>
              <li>
                <Link to="/trips" onClick={() => setIsMenuOpen(false)}>Browse Trips</Link>
              </li>
              <li className="dropdown">
                <button className="dropdown-toggle">
                  <span>My Account</span>
                  <span className="dropdown-caret">▼</span>
                </button>
                <ul className="dropdown-menu">
                  <li>
                    <Link to="/profile" onClick={() => setIsMenuOpen(false)}>Profile</Link>
                  </li>
                  <li>
                    <Link to="/bookings" onClick={() => setIsMenuOpen(false)}>My Bookings</Link>
                  </li>
                  <li>
                    <Link to="/reviews" onClick={() => setIsMenuOpen(false)}>My Reviews</Link>
                  </li>
                  <li>
                    <button onClick={handleLogout} className="logout-btn">
                      Logout
                    </button>
                  </li>
                </ul>
              </li>
            </>
          ) : (
            <li className="auth-buttons">
              <Link to="/login" className="login-btn" onClick={() => setIsMenuOpen(false)}>Login</Link>
              <Link to="/register" className="register-btn" onClick={() => setIsMenuOpen(false)}>Register</Link>
            </li>
          )}
        </ul>
      </div>
    </nav>
  );
};