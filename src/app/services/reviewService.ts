// reviewService.ts
import api, { handleServiceError } from './api';
import type { Review, ReviewCreate } from '../models/review';

export const reviewService = {
  getUserReviews: async (): Promise<Review[]> => {
    try {
      const response = await api.get<Review[]>('/reviews/');
      return response.data;
    } catch (error) {
      handleServiceError(error);
    }
  },
  
  createReview: async (reviewData: ReviewCreate): Promise<Review> => {
    try {
      const response = await api.post<Review>('/reviews/', reviewData);
      return response.data;
    } catch (error) {
      handleServiceError(error);
    }
  }
};