import { useState, useEffect } from 'react';
import { reviewService } from '../../services/reviewService';
import { useAuth } from '../../context/AuthContext';
import type { Review } from '../../models/review';
import './ReviewList.css'; // Create this CSS file for styling

export const ReviewList = () => {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { user } = useAuth();

  useEffect(() => {
    const fetchReviews = async () => {
      if (!user) return;
      
      try {
        const data = await reviewService.getUserReviews();
        setReviews(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load reviews');
      } finally {
        setLoading(false);
      }
    };

    fetchReviews();
  }, [user]);

  if (loading) return <p>Loading your reviews...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="reviews-container">
      <h2>My Reviews</h2>
      
      {reviews.length === 0 ? (
        <p className="no-reviews">You haven't submitted any reviews yet.</p>
      ) : (
        <div className="reviews-list">
          {reviews.map((review) => (
            <div key={review.id} className="review-card">
              <div className="review-header">
                <h3>{review.trip.title}</h3>
                <div className="rating">
                  {[...Array(5)].map((_, i) => (
                    <span key={i} className={i < review.rating ? "star filled" : "star"}>★</span>
                  ))}
                </div>
              </div>
              <p className="review-comment">{review.comment}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};