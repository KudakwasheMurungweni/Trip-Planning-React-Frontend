import { useEffect, useState } from 'react';
import { reviewService } from '../services/reviewService';  // No need to import 'Review' here
import { Review } from '../models/review';  // Corrected import path for 'Review'

export const useReviews = (tripId: number) => {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const data = await reviewService.getTripReviews(tripId);
        setReviews(data);
        setError(null);
      } catch (error) {
        setError(error instanceof Error ? error.message : 'Failed to load reviews');
      } finally {
        setLoading(false);
      }
    };
    
    if (tripId) fetchReviews();
  }, [tripId]);

  return { reviews, loading, error };
};
