import axios from 'axios';
import { API_CONFIG } from '../config/api';
import type { HAEntity, HAConfig } from '../types/homeAssistant';

// Create an axios instance with default configuration
const api = axios.create({
  baseURL: API_CONFIG.baseUrl,
  headers: {
    Authorization: `Bearer ${API_CONFIG.accessToken}`,
    'Content-Type': 'application/json',
  },
});

/**
 * Service class for Home Assistant API interactions
 */
export class HomeAssistantService {
  /**
   * Fetch all entities from Home Assistant
   * @returns Promise<HAEntity[]>
   */
  static async getEntities(): Promise<HAEntity[]> {
    try {
      const response = await api.get('/api/states');
      return response.data;
    } catch (error) {
      console.error('Error fetching entities:', error);
      throw error;
    }
  }

  /**
   * Fetch Home Assistant configuration
   * @returns Promise<HAConfig>
   */
  static async getConfig(): Promise<HAConfig> {
    try {
      const response = await api.get('/api/config');
      return response.data;
    } catch (error) {
      console.error('Error fetching config:', error);
      throw error;
    }
  }

  /**
   * Update an entity state
   * @param entityId - The ID of the entity to update
   * @param state - The new state
   * @param attributes - Optional attributes to update
   */
  static async updateEntityState(
    entityId: string,
    state: string,
    attributes?: Record<string, any>
  ) {
    try {
      await api.post(`/api/states/${entityId}`, {
        state,
        attributes,
      });
    } catch (error) {
      console.error('Error updating entity state:', error);
      throw error;
    }
  }
}