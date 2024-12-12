import React from 'react';
import { getDomainFromEntityId } from '../../utils/entityHelpers';
import { HAEntity } from '../../types/homeAssistant';

interface DomainFilterProps {
  entities: HAEntity[];
  selectedDomain: string;
  onDomainChange: (domain: string) => void;
}

export const DomainFilter: React.FC<DomainFilterProps> = ({
  entities,
  selectedDomain,
  onDomainChange,
}) => {
  // Get unique domains and their counts
  const domainCounts = entities.reduce((acc, entity) => {
    const domain = getDomainFromEntityId(entity.entity_id);
    acc[domain] = (acc[domain] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const domains = Object.entries(domainCounts)
    .sort(([a], [b]) => a.localeCompare(b));

  return (
    <div className="flex flex-wrap gap-2">
      <button
        onClick={() => onDomainChange('')}
        className={`px-3 py-1 rounded-full text-sm ${
          selectedDomain === ''
            ? 'bg-blue-500 text-white'
            : 'bg-gray-100 hover:bg-gray-200'
        }`}
      >
        All ({entities.length})
      </button>
      {domains.map(([domain, count]) => (
        <button
          key={domain}
          onClick={() => onDomainChange(domain)}
          className={`px-3 py-1 rounded-full text-sm ${
            selectedDomain === domain
              ? 'bg-blue-500 text-white'
              : 'bg-gray-100 hover:bg-gray-200'
          }`}
        >
          {domain} ({count})
        </button>
      ))}
    </div>
  );
}