import { useEffect, useState } from 'react';
import { bookingService } from '../../services/bookingService';
import type { Booking } from '../../models';
import { useAuth } from '../../context/AuthContext';

export const BookingManager = () => {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const { user } = useAuth();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBookings = async () => {
      if (user) {
        try {
          const data = await bookingService.getAllBookings();
          setBookings(data.filter(b => b.user.id === user.id));
        } catch (error) {
          console.error('Failed to load bookings:', error);
        } finally {
          setLoading(false);
        }
      }
    };
    fetchBookings();
  }, [user]);

  return (
    <div className="booking-container">
      <h2>My Bookings</h2>
      {bookings.map(booking => (
        <div key={booking.id} className="booking-card">
          <h3>{booking.trip.title}</h3>
          <p>Type: {booking.booking_type}</p>
          <p>Details: {booking.details}</p>
        </div>
      ))}
    </div>
  );
};