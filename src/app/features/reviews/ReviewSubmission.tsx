import { useState } from 'react';
import { reviewService } from '../../services/reviewService';
import type { ReviewCreate } from '../../models/review';  // Fixed import
import { useAuth } from '../../context/AuthContext';

export const ReviewSubmission = ({ tripId }: { tripId: number }) => {
  const [review, setReview] = useState<ReviewCreate>({
    rating: 5,
    comment: '',
    user: 0, // Will be set from auth
    trip: tripId,
  });
  const { user } = useAuth();
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;
    
    setSubmitting(true);
    try {
      await reviewService.createReview({
        ...review,
        user: user.id,
      });
      // Clear form after submission
      setReview(prev => ({ ...prev, comment: '', rating: 5 }));
    } catch (error) {
      console.error('Review submission failed:', error);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="review-form">
      <h3>Write a Review</h3>
      <form onSubmit={handleSubmit}>
        <div className="rating-input">
          <label>Rating:</label>
          <select
            value={review.rating}
            onChange={(e) => setReview({ ...review, rating: Number(e.target.value) })}
          >
            {[5,4,3,2,1].map(num => (
              <option key={num} value={num}>{num} Stars</option>
            ))}
          </select>
        </div>
        <textarea
          value={review.comment}
          onChange={(e) => setReview({ ...review, comment: e.target.value })}
          placeholder="Share your experience..."
          minLength={10}
          required
        />
        <button type="submit" disabled={submitting}>
          {submitting ? 'Submitting...' : 'Submit Review'}
        </button>
      </form>
    </div>
  );
};