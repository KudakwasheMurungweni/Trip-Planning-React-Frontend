import { useEffect, useState } from 'react';
import { destinationService } from '../../services/destinationService';
import type { Destination } from '../../models';

export const DestinationList = () => {
  const [destinations, setDestinations] = useState<Destination[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchDestinations = async () => {
      try {
        const data = await destinationService.getAllDestinations();
        setDestinations(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load destinations');
      } finally {
        setLoading(false);
      }
    };
    fetchDestinations();
  }, []);

 
  return (
    <div className="destination-grid">
      {destinations.map((destination) => (
        <div key={destination.id} className="destination-card">
          {destination.image && (
            <img src={destination.image} alt={destination.name} />
          )}
          <h3>{destination.name}</h3>
          <p>{destination.description}</p>
          <div className="location">
            <span>📍 {destination.location}</span>
          </div>
        </div>
      ))}
    </div>
  );
};