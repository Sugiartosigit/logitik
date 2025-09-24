import api from './api';

export const profileService = {
  // Get public profile (no authentication required)
  async getPublicProfile() {
    try {
      const response = await api.get('/profile');
      return response.data;
    } catch (error) {
      throw error;
    }
  }
};