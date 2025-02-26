import "./UserDashboard.css";
import { BookingManager } from "../../features/bookings/BookingManager";
import { TripCreationForm } from "../../features/trips/TripCreationForm";
import { useAuth } from "../../context/AuthContext";

export const UserDashboard = () => {
  const { user } = useAuth();

  return (
    <div className="dashboard-container">
      <h1>Welcome, {user?.username}</h1>
      <section className="dashboard-section">
        <h2>Create New Trip</h2>
        <TripCreationForm />
      </section>
      <section className="dashboard-section">
        <h2>My Bookings</h2>
        <BookingManager />
      </section>
    </div>
  );
};