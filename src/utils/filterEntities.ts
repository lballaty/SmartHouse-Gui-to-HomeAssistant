import { HAEntity } from '../types/homeAssistant';

export function filterEntities(entities: HAEntity[], searchTerm: string): HAEntity[] {
  if (!searchTerm) return entities;
  
  const normalizedSearch = searchTerm.toLowerCase();
  
  return entities.filter((entity) => {
    const entityId = entity.entity_id.toLowerCase();
    const friendlyName = (entity.attributes.friendly_name || '').toLowerCase();
    const domain = entity.entity_id.split('.')[0].toLowerCase();
    
    return (
      entityId.includes(normalizedSearch) ||
      friendlyName.includes(normalizedSearch) ||
      domain.includes(normalizedSearch)
    );
  });
}