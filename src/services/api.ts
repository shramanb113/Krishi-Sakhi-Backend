import axios from 'axios';
import { Farmer, Activity, Message } from '../types';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000/api/v1';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Farmer API
export const farmerAPI = {
  create: (farmer: Omit<Farmer, 'id' | 'farmerId' | 'createdAt' | 'updatedAt'>) =>
    api.post<{ success: boolean; data: Farmer }>('/farmers', farmer),
  
  get: (farmerId: string) =>
    api.get<{ success: boolean; data: Farmer }>(`/farmers/${farmerId}`),
  
  update: (farmerId: string, data: Partial<Farmer>) =>
    api.put<{ success: boolean; data: Farmer }>(`/farmers/${farmerId}`, data),
  
  delete: (farmerId: string) =>
    api.delete<{ success: boolean }>(`/farmers/${farmerId}`),
  
  getAll: (params?: any) =>
    api.get<{ success: boolean; data: Farmer[] }>('/farmers', { params }),
  
  search: (query: string, limit?: number) =>
    api.get<{ success: boolean; data: Farmer[] }>('/farmers/search', {
      params: { q: query, limit }
    }),
};

// Activity API
export const activityAPI = {
  create: (activity: Omit<Activity, 'id' | 'createdAt' | 'updatedAt'>) =>
    api.post<{ success: boolean; data: Activity }>('/activities', activity),
  
  getByFarmer: (farmerId: string) =>
    api.get<{ success: boolean; data: Activity[] }>(`/activities/farmer/${farmerId}`),
  
  getRecent: (limit?: number) =>
    api.get<{ success: boolean; data: Activity[] }>('/activities', {
      params: { limit }
    }),
  
  delete: (activityId: string) =>
    api.delete<{ success: boolean }>(`/activities/${activityId}`),
  
  getByType: (farmerId: string, type: string) =>
    api.get<{ success: boolean; data: Activity[] }>(`/activities/farmer/${farmerId}/type/${type}`),
  
  getByDateRange: (farmerId: string, startDate: string, endDate: string) =>
    api.get<{ success: boolean; data: Activity[] }>(`/activities/farmer/${farmerId}`, {
      params: { startDate, endDate }
    }),
};

// Chat API
export const chatAPI = {
  sendMessage: (userId: string, message: string) =>
    api.post<{ success: boolean; data: { reply: string; userId: string; timestamp: string } }>(`/chat/${userId}`, { message }),
  
  getHistory: (userId: string, limit?: number) =>
    api.get<{ success: boolean; data: Message[] }>(`/chat/${userId}/history`, {
      params: { limit }
    }),
  
  clearHistory: (userId: string) =>
    api.delete<{ success: boolean }>(`/chat/${userId}/history`),
};

// Health API
export const healthAPI = {
  check: () => api.get('/health'),
  readiness: () => api.get('/health/ready'),
  liveness: () => api.get('/health/live'),
};

export default api;