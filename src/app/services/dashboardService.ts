// src/app/services/dashboardService.ts
import api from './api';

export const dashboardService = {
  getDashboardData: async () => {
    try {
      const response = await api.get('/trips/api/dashboard/');
      return response.data;
    } catch (error) {
      console.error('Dashboard data error:', error);
      throw error;
    }
  }
};