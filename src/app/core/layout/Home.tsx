export const Home = () => {
    return (
      <section className="hero-section">
        <h1>Welcome to Zimbabwe Trip Planner</h1>
        <p>Discover amazing destinations and plan your perfect Zimbabwe adventure</p>
        <div className="cta-buttons">
          <a href="/login" className="btn-primary">Get Started</a>
          <a href="/destinations" className="btn-secondary">Browse Destinations</a>
        </div>
      </section>
    );
  };