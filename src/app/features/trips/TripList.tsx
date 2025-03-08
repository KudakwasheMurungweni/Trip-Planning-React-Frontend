import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { tripService } from '../../services/tripService';
import { Trip } from '../../models/trip';
import './TripList.css';

export const TripList = () => {
  const [trips, setTrips] = useState<Trip[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchTrips = async () => {
      try {
        const data = await tripService.getAllTrips();
        setTrips(data);
        setError(null);
      } catch (error) {
        setError(error instanceof Error ? error.message : 'Failed to load trips');
      } finally {
        setLoading(false);
      }
    };

    fetchTrips();
  }, []);

  if (loading) return <p>Loading trips...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="trips-container">
      <h2 className="page-title">Available Trips</h2>
      {trips.length === 0 ? (
        <p className="no-trips">No trips available at the moment.</p>
      ) : (
        <div className="trip-grid">
          {trips.map((trip) => (
            <div key={trip.id} className="trip-card">
              {trip.image && (
                <div className="trip-image-container">
                  <img src={trip.image} alt={trip.title} className="trip-image" />
                </div>
              )}
              <h3>{trip.title}</h3>
              <p className="trip-description">{trip.description}</p>
              <p className="trip-dates">
                From: {new Date(trip.start_date).toLocaleDateString()} 
                <br />
                To: {new Date(trip.end_date).toLocaleDateString()}
              </p>
              <div className="trip-actions">
                <Link to={`/book-trip/${trip.id}`} className="book-btn">Book This Trip</Link>
                <Link to={`/review-trip/${trip.id}`} className="review-btn">Write a Review</Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};