import api from './api';
import { Profile, ProfileUpdate } from '../models/profile'; // Make sure this path is correct
import { handleServiceError } from '../utils/serviceHelpers'; // Import error handler

export const profileService = {
  getMyProfile: async (): Promise<Profile> => {
    try {
      const response = await api.get('/api/profile/');
      if (response.status !== 200) throw new Error('Failed to fetch profile');
      return response.data;
    } catch (error) {
      handleServiceError(error, 'Failed to fetch profile');
      throw error; // Re-throw the error so it can be handled by the caller
    }
  },

  updateProfile: async (profileData: ProfileUpdate): Promise<Profile> => {
    try {
      const response = await api.put('/api/profile/', profileData);
      if (response.status !== 200) throw new Error('Failed to update profile');
      return response.data;
    } catch (error) {
      handleServiceError(error, 'Failed to update profile');
      throw error; // Re-throw the error for further handling
    }
  }
};
