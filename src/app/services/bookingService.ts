import api from './api'; // Use axios instance from api.ts
import { handleServiceError } from './api'; // Ensure correct error handling
import type { Booking, BookingCreate } from '../models/booking';

export const bookingService = {
  getAllBookings: async (): Promise<Booking[]> => {
    try {
      const response = await api.get('/api/bookings/');
      return response.data; // Axios automatically parses JSON
    } catch (error) {
      handleServiceError(error, 'Failed to fetch bookings');
      throw error;  // Re-throwing the error so it can be handled by the calling function
    }
  },

  createBooking: async (bookingData: BookingCreate): Promise<Booking> => {
    try {
      const response = await api.post('/api/bookings/', bookingData);
      return response.data;
    } catch (error) {
      handleServiceError(error, 'Failed to create booking');
      throw error;  // Re-throwing the error for proper error handling
    }
  },

  cancelBooking: async (bookingId: number): Promise<void> => {
    try {
      await api.delete(`/api/bookings/${bookingId}/`);
    } catch (error) {
      handleServiceError(error, 'Failed to cancel booking');
      throw error;  // Re-throwing the error to propagate it
    }
  }
};
