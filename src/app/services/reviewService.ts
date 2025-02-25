import api from './api';
import type { Review, ReviewCreate } from '../models';

export const reviewService = {
  getTripReviews: async (tripId: number): Promise<Review[]> => {
    try {
      const response = await api.get(`/api/trips/${tripId}/reviews/`);
      return response.data;
    } catch (error) {
      handleServiceError(error, 'Failed to fetch reviews');
    }
  },

  createReview: async (reviewData: ReviewCreate): Promise<Review> => {
    try {
      const response = await api.post('/api/reviews/', reviewData);
      return response.data;
    } catch (error) {
      handleServiceError(error, 'Failed to submit review');
    }
  }
};

// Add to your existing models/review.ts
export interface ReviewCreate extends Omit<Review, 'id' | 'user' | 'trip'> {
  user: number;  // User ID
  trip: number;   // Trip ID
}