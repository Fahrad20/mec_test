import axios from 'axios';

export const apiClient = axios.create({
  baseURL: process.env.EXPO_PUBLIC_API_BASE_URL || 'https://k8s.mectest.ru/test-app',
  timeout: 10000,
  headers: {
    Authorization: 'Bearer 550e8400-e29b-41d4-a716-446655440000',
  },
});
