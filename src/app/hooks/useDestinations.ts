import { useEffect, useState } from 'react';
import { destinationService, Destination } from '../services/destinationService';

export const useDestinations = () => {
  const [destinations, setDestinations] = useState<Destination[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchDestinations = async () => {
      try {
        const data = await destinationService.getAllDestinations();
        setDestinations(data);
        setError(null);
      } catch (error) {
        setError(error instanceof Error ? error.message : 'Failed to load destinations');
      } finally {
        setLoading(false);
      }
    };
    
    fetchDestinations();
  }, []);

  return { destinations, loading, error };
};