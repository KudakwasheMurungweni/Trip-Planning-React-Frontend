import api, { handleServiceError } from './api';
import type { Trip, TripCreate } from '../models/trip';

interface ResultsContainer {
  results: any[];
}

export const tripService = {
  getAllTrips: async (): Promise<Trip[]> => {
    try {
      console.log('About to fetch trips from the API');
      const response = await api.get<Trip[]>('api/trips/');
      console.log('Raw API Response:', response);
      console.log('Response data type:', typeof response.data);
      console.log('API Response data:', response.data);
      
      if (!Array.isArray(response.data)) {
        console.warn('Response is not an array!', response.data);
        
        // Safely check if response.data has a 'results' property
        const responseObj = response.data as unknown;
        
        if (responseObj && 
            typeof responseObj === 'object' && 
            responseObj !== null && 
            'results' in responseObj) {
          const resultsContainer = responseObj as ResultsContainer;
          return Array.isArray(resultsContainer.results) ? resultsContainer.results : [];
        }
        
        return [];
      }
      
      return response.data;
    } catch (error) {
      console.error('Error fetching trips:', error);
      handleServiceError(error);
      throw error;
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
      return response.data;
    } catch (error) {
      handleServiceError(error);
      throw error;
    }
  }
};