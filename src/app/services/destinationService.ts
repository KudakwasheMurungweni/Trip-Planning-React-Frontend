import api from './api';
import type { Destination } from '../models';

export const destinationService = {
  getAllDestinations: async (): Promise<Destination[]> => {
    try {
      const response = await api.get('/api/destinations/');
      return response.data;
    } catch (error) {
      handleServiceError(error, 'Failed to fetch destinations');
    }
  },

  getDestinationDetails: async (id: number): Promise<Destination> => {
    try {
      const response = await api.get(`/api/destinations/${id}/`);
      return response.data;
    } catch (error) {
      handleServiceError(error, 'Failed to fetch destination details');
    }
  }
};