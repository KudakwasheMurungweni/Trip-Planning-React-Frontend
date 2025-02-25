import api from './api';  // Changed from axios to our custom instance
import { Trip } from '../models/trip';  // Fixed typo in import path

export const tripService = {
  getTrips: async (): Promise<Trip[]> => {
    const response = await api.get('/api/trips/');
    return response.data;
  },
  createTrip: async (tripData: Omit<Trip, 'id'>) => {
    const response = await api.post('/api/trips/', tripData);
    return response.data;
  },
  // Add other trip-related API calls as needed
};