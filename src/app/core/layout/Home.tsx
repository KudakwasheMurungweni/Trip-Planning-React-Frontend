import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import './Home.css';

export const Home = () => {
  const { user } = useAuth();

  return (
    <div className="home-container">
      <section className="hero-section">
        <div className="hero-content">
          <h1 className="hero-title">Explore the Wonders of Zimbabwe</h1>
          <p className="hero-subtitle">Discover breathtaking landscapes, rich culture, and unforgettable adventures</p>
          
          <div className="cta-container">
            {user ? (
              // Show when user is logged in
              <Link to="/trips" className="cta-button primary">Plan Your Journey</Link>
            ) : (
              // Show when user is not logged in
              <Link to="/register" className="cta-button primary">Sign Up to Plan Your Trip</Link>
            )}
            <Link to="/destinations" className="cta-button secondary">Discover Destinations</Link>
          </div>
        </div>
      </section>
    </div>
  );
};