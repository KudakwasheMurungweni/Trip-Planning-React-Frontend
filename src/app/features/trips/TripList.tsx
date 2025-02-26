import { useEffect, useState } from 'react';
import { tripService } from '../../services/tripService'; // Make sure listTrips is available here
import { Trip } from '../../models/trip';

export const TripList = () => {
  const [trips, setTrips] = useState<Trip[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchTrips = async () => {
      try {
        // Fetch trips from API (use getAllTrips or listTrips based on your service definition)
        const data = await tripService.getAllTrips(); // Make sure you're using the correct method here
        setTrips(data);
        setError(null); // Clear any previous errors
      } catch (error) {
        // Set the error message if fetch fails
        setError(error instanceof Error ? error.message : 'Failed to load trips');
      } finally {
        setLoading(false);
      }
    };

    fetchTrips();
  }, []); // Empty dependency array to run only once on mount

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div>
      <h2>Available Trips</h2>
      {trips.length === 0 ? (
        <p>No trips available.</p>
      ) : (
        <ul>
          {trips.map((trip) => (
            <li key={trip.id}>
              <h3>{trip.title}</h3>
              <p>{trip.description}</p>
              <p>
                From {trip.start_date} to {trip.end_date}
              </p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};
