import React from 'react';
import { EntityCard } from '../EntityList/EntityCard';
import { HAEntity } from '../../types/homeAssistant';

interface EntityGroupProps {
  title: string;
  entities: HAEntity[];
  isExpanded: boolean;
  onToggle: () => void;
}

export const EntityGroup: React.FC<EntityGroupProps> = ({
  title,
  entities,
  isExpanded,
  onToggle,
}) => {
  return (
    <div className="bg-white rounded-lg shadow-sm overflow-hidden">
      <button
        onClick={onToggle}
        className="w-full px-4 py-2 flex items-center justify-between bg-gray-50 hover:bg-gray-100"
      >
        <span className="font-medium">
          {title} ({entities.length})
        </span>
        <span className="text-gray-500">{isExpanded ? '▼' : '▶'}</span>
      </button>
      
      {isExpanded && (
        <div className="p-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {entities.map((entity) => (
            <EntityCard key={entity.entity_id} entity={entity} />
          ))}
        </div>
      )}
    </div>
  );
}