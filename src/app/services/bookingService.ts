import api from './api';
import type { Booking, BookingCreate } from '../models';

export const bookingService = {
  getAllBookings: async (): Promise<Booking[]> => {
    try {
      const response = await api.get('/api/bookings/');
      return response.data;
    } catch (error) {
      handleServiceError(error, 'Failed to fetch bookings');
    }
  },

  createBooking: async (bookingData: BookingCreate): Promise<Booking> => {
    try {
      const response = await api.post('/api/bookings/', bookingData);
      return response.data;
    } catch (error) {
      handleServiceError(error, 'Failed to create booking');
    }
  },

  cancelBooking: async (bookingId: number): Promise<void> => {
    try {
      await api.delete(`/api/bookings/${bookingId}/`);
    } catch (error) {
      handleServiceError(error, 'Failed to cancel booking');
    }
  }
};

// Add to your existing models/booking.ts
export interface BookingCreate extends Omit<Booking, 'id' | 'user' | 'trip'> {
  user: number;  // User ID
  trip: number;   // Trip ID
}