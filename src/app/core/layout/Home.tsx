// Home.tsx

import React from 'react';
import './Home.css';

export const Home = () => {
  return (
    <div className="home-container">
      <section className="hero-section">
        <div className="hero-content">
          <h1 className="hero-title">Explore the Wonders of Zimbabwe</h1>
          <p className="hero-subtitle">Discover breathtaking landscapes, rich culture, and unforgettable adventures</p>
          
          <div className="cta-container">
            <a href="/login" className="cta-button primary">Plan Your Journey</a>
            <a href="/destinations" className="cta-button secondary">Discover Destinations</a>
          </div>
        </div>
      </section>
    </div>
  );
};