import api from './api';
import { handleServiceError } from './api';
import { Booking, BookingCreate } from '../models/booking';
import { Trip } from '../models/trip';

export const bookingService = {
  getUserBookings: async (): Promise<Booking[]> => {
    try {
      const response = await api.get('/bookings/');
      return response.data;
    } catch (err) {
      handleServiceError(err);
      throw err;
    }
  },

  getAvailableTrips: async (): Promise<Trip[]> => {
    try {
      const response = await api.get('/trips');
      return response.data;
    } catch (err) {
      handleServiceError(err);
      throw err;
    }
  },

  getAllBookings: async (): Promise<Booking[]> => {
    try {
      const response = await api.get('/bookings/all');
      return response.data;
    } catch (err) {
      handleServiceError(err);
      throw err;
    }
  },

  createBooking: async (bookingData: BookingCreate): Promise<Booking> => {
    try {
      const response = await api.post('/bookings/', bookingData);
      return response.data;
    } catch (err) {
      handleServiceError(err);
      throw err;
    }
  }
};