// Configuration for the Home Assistant API
export const API_CONFIG = {
  // Default to localhost during development
  baseUrl: import.meta.env.VITE_HA_URL || 'http://localhost:8123',
  // Access token should be provided in environment variables
  accessToken: import.meta.env.VITE_HA_ACCESS_TOKEN || '',
};