import { useEffect, useState } from 'react';
import { destinationService } from '../services/destinationService';
import { Destination } from '../models/destination';
import { handleServiceError } from '../utils/serviceHelpers';

export const useDestinations = () => {
  const [destinations, setDestinations] = useState<Destination[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true; // Flag to prevent state updates on unmounted component
    
    const fetchDestinations = async () => {
      try {
        const data = await destinationService.getAllDestinations();
        
        if (!isMounted) return; // Prevent state update if component unmounted
        
        // Ensure data is always an array
        const safeData = Array.isArray(data) ? data : [];
        setDestinations(safeData);
        setError(null);

      } catch (error) {
        if (!isMounted) return;
        
        const message = error instanceof Error ? error.message : 'Failed to load destinations';
        setError(message);
        handleServiceError(error, 'Failed to load destinations');
        setDestinations([]); // Reset to empty array on error
        
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    fetchDestinations();

    return () => {
      isMounted = false; // Cleanup function
    };
  }, []);

  return { 
    destinations,
    loading,
    error,
    // Optional: Add count for better UX
    count: destinations.length 
  };
};