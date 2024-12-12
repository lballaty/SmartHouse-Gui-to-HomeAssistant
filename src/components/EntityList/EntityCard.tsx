import React from 'react';
import { HAEntity } from '../../types/homeAssistant';

interface EntityCardProps {
  entity: HAEntity;
  onStateChange?: (entityId: string, newState: string) => void;
}

/**
 * Component for displaying a single Home Assistant entity
 */
export const EntityCard: React.FC<EntityCardProps> = ({ entity, onStateChange }) => {
  const { entity_id, state, attributes } = entity;

  return (
    <div className="p-4 bg-white rounded-lg shadow-md">
      <h3 className="text-lg font-semibold">{attributes.friendly_name || entity_id}</h3>
      <div className="mt-2">
        <p className="text-gray-600">State: {state}</p>
        {attributes.unit_of_measurement && (
          <p className="text-sm text-gray-500">
            Unit: {attributes.unit_of_measurement}
          </p>
        )}
      </div>
    </div>
  );
}