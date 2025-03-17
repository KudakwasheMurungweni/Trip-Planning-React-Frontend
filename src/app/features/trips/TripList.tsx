import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { tripService } from '../../services/tripService';
import { Trip } from '../../models/trip';
import './TripList.css';

export const TripList = () => {
  const [trips, setTrips] = useState<Trip[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchTrips = async () => {
      try {
        console.log('TripList component is fetching trips');
        const data: Trip[] = await tripService.getAllTrips();
        console.log('TripList received data:', data);
        
        if (!Array.isArray(data)) {
          throw new Error('Invalid data format - data is not an array');
        }

        setTrips(data);
        setError(null);
      } catch (err) {
        console.error('Error in TripList component:', err);
        setError(err instanceof Error ? err.message : 'Failed to load trips');
      } finally {
        setLoading(false);
      }
    };

    fetchTrips();
  }, []);

  if (loading) return <p className="status-message">Loading trips...</p>;
  if (error) return <p className="status-message">Error: {error}</p>;

  return (
    <div>
      <h2>Available Trips</h2>
      {trips.length === 0 ? (
        <p className="status-message">No trips available at the moment.</p>
      ) : (
        <div className="trip-container">
          {trips.map((trip) => (
            <div key={trip.id} className="trip-card">
              {trip.image && <img src={trip.image} alt={trip.title} />}
              <h3>{trip.title}</h3>
              <p>{trip.description}</p>
              <p>
                From: {new Date(trip.start_date).toLocaleDateString()} - To: {new Date(trip.end_date).toLocaleDateString()}
              </p>
              <div className="button-group">
                <Link to={`/bookings/${trip.id}`} className="book-now">Book This Trip</Link>
                <Link to={`/reviews/${trip.id}`}>Write a Review</Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};