import { HAEntity } from '../types/homeAssistant';
import { getDomainFromEntityId } from './entityHelpers';

export function groupEntities(
  entities: HAEntity[],
  groupBy: string | null,
  customGroups: Record<string, string[]>
): Record<string, HAEntity[]> {
  if (!groupBy) {
    return { 'All Entities': entities };
  }

  const groups: Record<string, HAEntity[]> = {};

  switch (groupBy) {
    case 'domain':
      entities.forEach((entity) => {
        const domain = getDomainFromEntityId(entity.entity_id);
        if (!groups[domain]) groups[domain] = [];
        groups[domain].push(entity);
      });
      break;

    case 'state':
      entities.forEach((entity) => {
        const state = entity.state;
        if (!groups[state]) groups[state] = [];
        groups[state].push(entity);
      });
      break;

    case 'custom':
      // First, create groups for custom groupings
      Object.entries(customGroups).forEach(([groupName, entityIds]) => {
        groups[groupName] = entities.filter(entity => 
          entityIds.includes(entity.entity_id)
        );
      });
      // Add ungrouped entities
      const groupedIds = new Set(
        Object.values(customGroups).flat()
      );
      const ungrouped = entities.filter(
        entity => !groupedIds.has(entity.entity_id)
      );
      if (ungrouped.length > 0) {
        groups['Ungrouped'] = ungrouped;
      }
      break;

    default:
      groups['All Entities'] = entities;
  }

  return groups;
}