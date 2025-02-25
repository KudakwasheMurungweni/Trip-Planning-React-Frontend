import { useEffect, useState } from 'react';
import { tripService, Trip } from '../services/tripService';

export const useTrips = () => {
    const [trips, setTrips] = useState<Trip[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
  
    useEffect(() => {
      const fetchTrips = async () => {
        try {
          const data = await tripService.getTrips();
          setTrips(data);
          setError(null);
        } catch (error) {
          setError(error instanceof Error ? error.message : 'Failed to load trips');
        } finally {
          setLoading(false);
        }
      };
      
      fetchTrips();
    }, []);
  
    return { trips, loading, error };
  };