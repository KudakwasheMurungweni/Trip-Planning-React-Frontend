import { useState } from 'react';
import { tripService } from '../../services/tripService';
import type { TripCreate } from '../../models/trip'; // Fixed import path
import { useAuth } from '../../context/AuthContext';
import styles from '../../shared/styles/forms.module.css';

export const TripCreationForm = () => {
  const { user } = useAuth();
  const [tripData, setTripData] = useState<TripCreate>({
    title: '',
    description: '',
    start_date: '',
    end_date: '',
    user: user?.id || 0,
    destinations: [],
    activities: '',
  });
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;
    
    setSubmitting(true);
    try {
      await tripService.createTrip({
        ...tripData,
        user: user.id // Ensure we have valid user ID
      });
      // Reset form on success
      setTripData({
        title: '',
        description: '',
        start_date: '',
        end_date: '',
        user: user.id,
        destinations: [],
        activities: ''
      });
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to create trip');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <div className={styles.inputGroup}>
        <label className={styles.label}>Title</label>
        <input
          className={styles.input}
          value={tripData.title}
          onChange={(e) => setTripData({ ...tripData, title: e.target.value })}
          required
        />
      </div>

      <div className={styles.inputGroup}>
        <label className={styles.label}>Description</label>
        <textarea
          className={styles.input}
          value={tripData.description}
          onChange={(e) => setTripData({ ...tripData, description: e.target.value })}
          required
        />
      </div>

      <div className={styles.inputGroup}>
        <label className={styles.label}>Start Date</label>
        <input
          type="date"
          className={styles.input}
          value={tripData.start_date}
          onChange={(e) => setTripData({ ...tripData, start_date: e.target.value })}
          required
        />
      </div>

      <div className={styles.inputGroup}>
        <label className={styles.label}>End Date</label>
        <input
          type="date"
          className={styles.input}
          value={tripData.end_date}
          onChange={(e) => setTripData({ ...tripData, end_date: e.target.value })}
          required
        />
      </div>

      {error && <div className={styles.error}>{error}</div>}
      
      <button 
        className={styles.button} 
        type="submit" 
        disabled={submitting}
      >
        {submitting ? 'Creating...' : 'Create Trip'}
      </button>
    </form>
  );
};