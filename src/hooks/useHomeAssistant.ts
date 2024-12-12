import { useQuery, useMutation } from '@tanstack/react-query';
import { HomeAssistantService } from '../services/homeAssistant';
import type { HAEntity } from '../types/homeAssistant';

/**
 * Hook for fetching Home Assistant entities
 */
export function useEntities() {
  return useQuery({
    queryKey: ['entities'],
    queryFn: HomeAssistantService.getEntities,
    refetchInterval: 5000, // Refresh every 5 seconds
  });
}

/**
 * Hook for fetching Home Assistant configuration
 */
export function useConfig() {
  return useQuery({
    queryKey: ['config'],
    queryFn: HomeAssistantService.getConfig,
  });
}

/**
 * Hook for updating entity states
 */
export function useUpdateEntity() {
  return useMutation({
    mutationFn: ({
      entityId,
      state,
      attributes,
    }: {
      entityId: string;
      state: string;
      attributes?: Record<string, any>;
    }) => HomeAssistantService.updateEntityState(entityId, state, attributes),
  });
}