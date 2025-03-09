// src/app/features/bookings/BookingManager.tsx
import React from 'react';
import { DashboardBooking } from '../../models/booking';
import './BookingManager.css';

interface BookingManagerProps {
  bookings: DashboardBooking[];
  showAvailableTrips?: boolean;
}

const BookingManager: React.FC<BookingManagerProps> = ({ 
  bookings, 
  showAvailableTrips = true 
}) => {
  return (
    <div className="booking-manager">
      {bookings.length > 0 ? (
        <div className="booking-list">
          {bookings.map(booking => (
            <div key={booking.id} className="booking-item">
              <div className="booking-info">
                <h4>{booking.trip_title}</h4>
                <p>Booked on: {new Date(booking.booking_date).toLocaleDateString()}</p>
                <span className={`status-badge status-${booking.status.toLowerCase()}`}>
                  {booking.status}
                </span>
              </div>
              <div className="booking-actions">
                <button className="action-button">View Details</button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="no-bookings">No bookings found</p>
      )}
    </div>
  );
};

export default BookingManager;