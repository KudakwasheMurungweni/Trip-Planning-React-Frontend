import api from './api';
import { handleServiceError } from './api'; // Make sure to import handleServiceError
import type { Trip, TripCreate } from '../models/trip';

// Service to interact with trips API
export const tripService = {
  // Fetch all trips
  getAllTrips: async (): Promise<Trip[]> => {
    try {
      const response = await api.get('/api/trips/');
      return response.data;
    } catch (error) {
      handleServiceError(error, 'Failed to fetch trips');
      throw error;  // Ensure the error is thrown for further handling in the hook
    }
  },

  // Method to fetch a single trip by ID
  getTripDetails: async (id: number): Promise<Trip> => {
    try {
      const response = await api.get(`/api/trips/${id}/`);
      return response.data;
    } catch (error) {
      handleServiceError(error, 'Failed to fetch trip details');
      throw error;  // Ensure the error is thrown for further handling
    }
  },

  // Method to create a new trip
  createTrip: async (tripData: TripCreate): Promise<Trip> => {
    try {
      const response = await api.post('/api/trips/', tripData);
      return response.data;
    } catch (error) {
      handleServiceError(error, 'Failed to create trip');
      throw error;  // Ensure the error is thrown for further handling
    }
  },

  // Alias for getAllTrips, used in TripList
  listTrips: async (): Promise<Trip[]> => {
    return tripService.getAllTrips(); // Reuse getAllTrips for listTrips
  }
};
