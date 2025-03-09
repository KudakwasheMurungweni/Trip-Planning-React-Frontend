// src/app/core/dashboard/UserDashboard.tsx
import { useEffect, useState } from 'react';
import { useAuth } from '../../context/AuthContext';
// Fix the import for BookingManager
import BookingManager from '../../features/bookings/BookingManager';
import TripSelectionForm from '../../features/trips/TripSelectionForm';
import { dashboardService } from '../../services/dashboardService';
import { Trip } from '../../models/trip';
import { DashboardBooking } from '../../models/booking';
import './UserDashboard.css';

interface DashboardData {
  upcoming_trips: Trip[];
  recent_bookings: DashboardBooking[];
  available_trips: Trip[];
}

export const UserDashboard = () => {
  const { user } = useAuth();
  const [dashboardData, setDashboardData] = useState<DashboardData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [selectedTrip, setSelectedTrip] = useState<number | null>(null);

  useEffect(() => {
    const loadDashboardData = async () => {
      try {
        const data = await dashboardService.getDashboardData();
        setDashboardData(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load dashboard data');
      } finally {
        setLoading(false);
      }
    };

    loadDashboardData();
  }, []);

  const handleSelectTrip = (tripId: number) => {
    setSelectedTrip(tripId);
    console.log("Selected trip:", tripId);
    // Implement booking logic here
  };

  if (loading) return <div className="loading">Loading dashboard...</div>;
  if (error) return <div className="error-alert">{error}</div>;

  return (
    <div className="dashboard-container">
      <h1>Welcome back, {user?.username}</h1>
      
      <section className="dashboard-section">
        <h2>Quick Actions</h2>
        <div className="action-cards">
          <button className="action-card">
            <span>✈️</span>
            <h3>Book New Trip</h3>
          </button>
          <button className="action-card">
            <span>📝</span>
            <h3>Write Review</h3>
          </button>
        </div>
      </section>

      <section className="dashboard-section">
        <h2>Upcoming Trips</h2>
        <div className="trip-cards">
          {dashboardData?.upcoming_trips.map(trip => (
            <div key={trip.id} className="trip-card">
              <h4>{trip.title}</h4>
              <p>{trip.destinations.length > 0 ? trip.destinations[0].name : 'No destination'}</p>
              <p>📅 {new Date(trip.start_date).toLocaleDateString()}</p>
            </div>
          ))}
          {!dashboardData?.upcoming_trips.length && (
            <p>No upcoming trips scheduled</p>
          )}
        </div>
      </section>

      <section className="dashboard-section">
        <h2>Recent Bookings</h2>
        <BookingManager 
          bookings={dashboardData?.recent_bookings || []}
          showAvailableTrips={false}
        />
      </section>

      <section className="dashboard-section">
        <h2>Available Trips</h2>
        {dashboardData?.available_trips.length ? (
          <div className="available-trips-section">
            <TripSelectionForm onSelectTrip={handleSelectTrip} />
            {selectedTrip && (
              <div className="booking-actions">
                <button 
                  className="book-now-button"
                  onClick={() => {
                    // Navigate to booking form or open booking modal
                    window.location.href = `/booking/new?tripId=${selectedTrip}`;
                  }}
                >
                  Book This Trip
                </button>
              </div>
            )}
          </div>
        ) : (
          <p className="no-trips-message">No trips available at the moment</p>
        )}
      </section>
    </div>
  );
};