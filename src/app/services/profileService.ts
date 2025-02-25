import api from './api';
import type { Profile, ProfileUpdate } from '../models';

export const profileService = {
  getMyProfile: async (): Promise<Profile> => {
    try {
      const response = await api.get('/api/profile/');
      return response.data;
    } catch (error) {
      handleServiceError(error, 'Failed to fetch profile');
    }
  },

  updateProfile: async (profileData: ProfileUpdate): Promise<Profile> => {
    try {
      const response = await api.put('/api/profile/', profileData);
      return response.data;
    } catch (error) {
      handleServiceError(error, 'Failed to update profile');
    }
  }
};

// Add to your existing models/profile.ts
export interface ProfileUpdate extends Partial<Omit<Profile, 'id' | 'user'>> {
  phone_number?: string;
  address?: string;
}