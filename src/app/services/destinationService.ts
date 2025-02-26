import api from './api';
import { Destination } from '../models/destination'; // Ensure Destination is correctly imported from the correct file
import { handleServiceError } from '../utils/serviceHelpers'; // Import the error handling function

export const destinationService = {
  getAllDestinations: async (): Promise<Destination[]> => {
    try {
      const response = await api.get('/api/destinations/');
      if (response.status !== 200) throw new Error('Failed to fetch destinations');
      return response.data;
    } catch (error) {
      handleServiceError(error, 'Failed to fetch destinations');
      return []; // Return an empty array in case of error, to prevent crashing the app
    }
  },

  getDestinationDetails: async (id: number): Promise<Destination> => {
    try {
      const response = await api.get(`/api/destinations/${id}/`);
      if (response.status !== 200) throw new Error('Failed to fetch destination details');
      return response.data;
    } catch (error) {
      handleServiceError(error, 'Failed to fetch destination details');
      throw error; // Re-throw the error after logging it
    }
  }
};
