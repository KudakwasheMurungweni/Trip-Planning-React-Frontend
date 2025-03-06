import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { bookingService } from '../../services/bookingService';
import type { Booking } from '../../models/booking';
import type { Trip } from '../../models/trip';
import { useAuth } from '../../context/AuthContext';
import './BookingManager.css';

export const BookingManager = () => {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [availableTrips, setAvailableTrips] = useState<Trip[]>([]);
  const { user } = useAuth();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchBookingsAndTrips = async () => {
      if (user) {
        try {
          const bookingsData = await bookingService.getUserBookings();
          setBookings(bookingsData);

          const tripsData = await bookingService.getAvailableTrips();
          setAvailableTrips(tripsData);
        } catch (err) {
          setError(err instanceof Error ? err.message : 'Failed to load data');
        } finally {
          setLoading(false);
        }
      }
    };
    fetchBookingsAndTrips();
  }, [user]);

  if (loading) return <p>Loading your bookings...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="bookings-container">
      <h2>My Bookings</h2>

      {bookings.length === 0 ? (
        <div className="no-bookings">
          <p>You don't have any bookings yet.</p>
          <Link to="/trips" className="book-trip-btn">Browse Available Trips</Link>
        </div>
      ) : (
        <div className="bookings-list">
          {bookings.map(booking => (
            <div key={booking.id} className="booking-card">
              {booking.trip && typeof booking.trip !== 'number' ? (
                <>
                  <h3>{booking.trip.title}</h3>
                  <p>
                    <strong>Dates:</strong> {new Date(booking.trip.start_date).toLocaleDateString()} to {new Date(booking.trip.end_date).toLocaleDateString()}
                  </p>
                  <div className="booking-details">
                    <p><strong>Booking Type:</strong> {booking.booking_type}</p>
                    {booking.details && (
                      <p><strong>Special Requests:</strong> {booking.details}</p>
                    )}
                  </div>
                  <div className="booking-actions">
                    <Link to={`/review-trip/${booking.trip.id}`} className="review-btn">Write a Review</Link>
                  </div>
                </>
              ) : (
                <p>Trip details unavailable</p>
              )}
            </div>
          ))}
        </div>
      )}

      <h2>Available Trips</h2>
      {availableTrips.length === 0 ? (
        <p>No trips available to book at the moment.</p>
      ) : (
        <div className="available-trips-list">
          {availableTrips.map(trip => (
            <div key={trip.id} className="trip-card">
              <h3>{trip.title}</h3>
              <p><strong>Dates:</strong> {new Date(trip.start_date).toLocaleDateString()} to {new Date(trip.end_date).toLocaleDateString()}</p>
              <Link to={`/book-trip/${trip.id}`} className="book-trip-btn">Book This Trip</Link>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};