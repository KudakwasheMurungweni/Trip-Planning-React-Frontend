import api, { handleServiceError } from './api';
import type { Trip, TripCreate } from '../models/trip';

export const tripService = {
  getAllTrips: async (): Promise<Trip[]> => {
    try {
      const response = await api.get<Trip[]>('api/trips/');
      return response.data;
    } catch (error) {
      handleServiceError(error);
      throw error;  // Throwing the error after logging it so it can be caught in the calling component
    }
  },
  
  getTripById: async (tripId: number): Promise<Trip> => {
    try {
      const response = await api.get<Trip>(`api/trips/${tripId}/`);
      return response.data;
    } catch (error) {
      handleServiceError(error);
      throw error;
    }
  },

  createTrip: async (tripData: TripCreate): Promise<Trip> => {
    try {
      const response = await api.post<Trip>('api/trips/', tripData);
      return response.data;  // Corrected the case from 'response. Data' to 'response.data'
    } catch (error) {
      handleServiceError(error);
      throw error;
    }
  }
};
