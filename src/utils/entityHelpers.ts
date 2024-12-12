import { HAEntity } from '../types/homeAssistant';
import type { SortOption } from '../components/SortControls';

export function getDomainFromEntityId(entityId: string): string {
  return entityId.split('.')[0];
}

export function filterByDomain(entities: HAEntity[], domain: string): HAEntity[] {
  if (!domain) return entities;
  return entities.filter(
    (entity) => getDomainFromEntityId(entity.entity_id) === domain
  );
}

export function sortEntities(
  entities: HAEntity[],
  sortBy: SortOption,
  sortAsc: boolean
): HAEntity[] {
  return [...entities].sort((a, b) => {
    let compareResult = 0;
    
    switch (sortBy) {
      case 'name':
        compareResult = (a.attributes.friendly_name || a.entity_id).localeCompare(
          b.attributes.friendly_name || b.entity_id
        );
        break;
      case 'domain':
        compareResult = getDomainFromEntityId(a.entity_id).localeCompare(
          getDomainFromEntityId(b.entity_id)
        );
        break;
      case 'state':
        compareResult = a.state.localeCompare(b.state);
        break;
      case 'last_updated':
        compareResult = new Date(b.last_updated).getTime() - 
                       new Date(a.last_updated).getTime();
        break;
    }

    return sortAsc ? compareResult : -compareResult;
  });
}