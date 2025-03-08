// destinationService.ts
import api from './api';
import { Destination } from '../models';
import { handleServiceError } from '../utils/serviceHelpers';
import axios from 'axios';

const DJANGO_BASE_URL = 'http://localhost:8000'; // Hardcoded Django URL

const formatImageUrl = (imagePath: string) => {
  if (!imagePath) return '';
  if (imagePath.startsWith('http')) return imagePath;
  return `${DJANGO_BASE_URL}${imagePath.startsWith('/') ? '' : '/'}${imagePath}`;
};

export const destinationService = {
  getAllDestinations: async (): Promise<Destination[]> => {
    try {
      console.log('[API] Fetching destinations from:', `${DJANGO_BASE_URL}/api/destinations/`);
      
      const response = await api.get('/api/destinations/');
      console.log('[API] Received response:', response);

      if (!Array.isArray(response.data)) {
        throw new Error('Invalid response format: Expected array');
      }

      return response.data.map(d => ({
        id: d.id,
        name: d.name || 'Unknown',
        description: d.description || '',
        location: d.location || 'Unknown',
        attractions: d.attractions?.split(',')?.map((a: string) => a.trim()) || [],
        activities: d.activities?.split(',')?.map((a: string) => a.trim()) || [],
        image: d.image ? formatImageUrl(d.image) : undefined  
      }));
      
    } catch (error) {
      console.error('[API] Failed to fetch destinations:', {
        error,
        config: axios.isAxiosError(error) ? error.config : undefined,
        response: axios.isAxiosError(error) ? error.response?.data : undefined
      });
      
      handleServiceError(
        error instanceof Error ? error : new Error('Failed to load destinations'),
        'Destination service error'
      );
      return [];
    }
  }
};