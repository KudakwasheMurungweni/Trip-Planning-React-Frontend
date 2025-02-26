import { useEffect, useState } from 'react';
import { destinationService } from '../services/destinationService';
import { Destination } from '../models/destination';  // Corrected import path

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
