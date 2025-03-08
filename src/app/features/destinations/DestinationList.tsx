import { useDestinations } from '../../hooks/useDestinations'; // Use the shared hook
import type { Destination } from '../../models';
import './DestinationList.css';

export const DestinationList = () => {
  // Get all needed state from the hook
  const { destinations, loading, error } = useDestinations();

  if (loading) return <div className="loading">Loading destinations...</div>;
  if (error) return <div className="error-alert">{error}</div>;

  return (
    <div className="destination-grid">
      {destinations.map((destination) => (
        <div key={destination.id} className="destination-card">
          {destination.image && (
            <img 
              src={destination.image} 
              alt={destination.name}
              className="destination-image"
            />
          )}
          <h3>{destination.name}</h3>
          <p className="description">{destination.description}</p>
          <div className="location">
            <span>📍 {destination.location}</span>
          </div>
          
          {destination.attractions?.length > 0 && (
            <div className="attractions-section">
              <h4>Main Attractions:</h4>
              <ul>
                {destination.attractions.map((attraction, index) => (
                  <li key={index}>{attraction}</li>
                ))}
              </ul>
            </div>
          )}

      {/* Activities Section */}
{destination.activities && destination.activities.length > 0 && (
  <div className="activities-section">
    <h4>Popular Activities:</h4>
    <ul>
      {destination.activities.map((activity, index) => (
        <li key={`activity-${index}`}>{activity}</li>
      ))}
    </ul>
  </div>
)}
          
        </div>
      ))}
    </div>
  );
};