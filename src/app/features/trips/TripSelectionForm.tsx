import { useEffect, useState } from "react";
import { tripService } from "../../services/tripService";

// Define the types for the trip and onSelectTrip props
interface Trip {
  id: number;
  title: string;
}

interface TripSelectionFormProps {
  onSelectTrip: (tripId: number) => void; // onSelectTrip now expects a number as the trip ID
}

const TripSelectionForm = ({ onSelectTrip }: TripSelectionFormProps) => {
  const [trips, setTrips] = useState<Trip[]>([]); // Use TypeScript type for trips
  const [loading, setLoading] = useState<boolean>(true); // Track loading state
  const [error, setError] = useState<string | null>(null); // Track error state

  useEffect(() => {
    const fetchTrips = async () => {
      try {
        const tripsData = await tripService.getAllTrips(); // Fetch trips from the service
        setTrips(tripsData);
        setLoading(false); // Stop loading once trips are fetched
      } catch (error) {
        setError("Error fetching trips: " + error);
        setLoading(false); // Stop loading in case of error
      }
    };
    fetchTrips();
  }, []);

  if (loading) {
    return <p>Loading trips...</p>; // Show loading message while trips are being fetched
  }

  if (error) {
    return <p>{error}</p>; // Show error message if there's an error
  }

  return (
    <select onChange={(e) => onSelectTrip(Number(e.target.value))}>
      <option value="">Select a Trip</option>
      {trips.map((trip) => (
        <option key={trip.id} value={trip.id}>
          {trip.title}
        </option>
      ))}
    </select>
  );
};

export default TripSelectionForm;
