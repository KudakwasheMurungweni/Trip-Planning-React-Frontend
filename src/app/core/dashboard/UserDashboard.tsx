import "./UserDashboard.css";
import { BookingManager } from "../../features/bookings/BookingManager";
// In UserDashboard.tsx
import TripSelectionForm from "../../features/trips/TripSelectionForm"; // Correct default import
import { useAuth } from "../../context/AuthContext";

export const UserDashboard = () => {
  const { user } = useAuth();

  const handleSelectTrip = (tripId: number) => {
    console.log("Selected trip:", tripId);
  };

  return (
    <div className="dashboard-container">
      <h1>Welcome, {user?.username}</h1>
      <section className="dashboard-section">
        <h2>Create New Trip</h2>
        <TripSelectionForm onSelectTrip={handleSelectTrip} />
      </section>
      <section className="dashboard-section">
        <h2>My Bookings</h2>
        <BookingManager />
      </section>
    </div>
  );
};

