import api from './api';
import type { Review, ReviewCreate } from '../models/review';
import { handleServiceError } from '../utils/serviceHelpers';  // Optional: error handling utility

export const reviewService = {
  // Fetch reviews for a specific trip
  getTripReviews: async (tripId: number): Promise<Review[]> => {
    try {
      const response = await api.get(`/api/reviews/?trip=${tripId}`);
      return response.data;
    } catch (error) {
      handleServiceError(error, 'Failed to fetch reviews');
      throw error;  // Re-throw the error to be handled by the caller
    }
  },

  // Create a new review
  createReview: async (reviewData: ReviewCreate): Promise<Review> => {
    try {
      const response = await api.post('/api/reviews/', reviewData);
      return response.data;
    } catch (error) {
      handleServiceError(error, 'Failed to create review');
      throw error;  // Re-throw the error to be handled by the caller
    }
  }
};
