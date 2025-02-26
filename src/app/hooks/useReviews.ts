
import { useEffect, useState } from 'react';
import { reviewService, Review } from '../services/reviewService';

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