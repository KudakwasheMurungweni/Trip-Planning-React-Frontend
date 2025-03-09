import { useEffect, useState } from "react";
import { Trip } from "../../models/trip";
import { bookingService } from "../../services/bookingService";

interface TripSelectionFormProps {
  onSelectTrip: (tripId: number) => void;
}

const TripSelectionForm = ({ onSelectTrip }: TripSelectionFormProps) => {
  const [trips, setTrips] = useState<Trip[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchTrips = async () => {
      try {
        const data = await bookingService.getAvailableTrips();
        setTrips(data);
      } catch (err) {
        setError("Failed to load trips");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchTrips();
  }, []);

  const handleSelection = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const tripId = Number(e.target.value);
    if (tripId) onSelectTrip(tripId);
  };

  if (loading) return <div>Loading trips...</div>;
  if (error) return <div className="error-message">{error}</div>;

  return (
    <div className="trip-selector">
      <label htmlFor="trip-select">Choose a trip:</label>
      <select 
        id="trip-select"
        onChange={handleSelection}
        defaultValue=""
        className="trip-dropdown"
      >
        <option value="" disabled>Select a Trip</option>
        {trips.map((trip) => (
          <option 
            key={trip.id} 
            value={trip.id}
            className="trip-option"
          >
            {trip.title} ({new Date(trip.start_date).toLocaleDateString()})
          </option>
        ))}
      </select>
    </div>
  );
};

export default TripSelectionForm;