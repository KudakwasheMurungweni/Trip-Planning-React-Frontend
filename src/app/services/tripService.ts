import api from './api';
import { handleServiceError } from './api';  // Make sure to import handleServiceError
import type { Trip, TripCreate } from '../models/trip';

// Service to interact with trips API
export const tripService = {
  getAllTrips: async (): Promise<Trip[]> => {
    try {
      const response = await api.get('/api/trips/');
      return response.data;
    } catch (error) {
      handleServiceError(error, 'Failed to fetch trips');  // Use handleServiceError
      throw error;  // Ensure the error is thrown for further handling in the hook
    }
  },

  getTripDetails: async (id: number): Promise<Trip> => {
    try {
      const response = await api.get(`/api/trips/${id}/`);
      return response.data;
    } catch (error) {
      handleServiceError(error, 'Failed to fetch trip details');
      throw error;  // Ensure the error is thrown for further handling
    }
  },

  createTrip: async (tripData: TripCreate): Promise<Trip> => {
    try {
      const response = await api.post('/api/trips/', tripData);
      return response.data;
    } catch (error) {
      handleServiceError(error, 'Failed to create trip');
      throw error;  // Ensure the error is thrown for further handling
    }
  }
};
