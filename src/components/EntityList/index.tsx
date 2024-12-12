import React from 'react';
import { useEntities } from '../../hooks/useHomeAssistant';
import { usePreferences } from '../../hooks/usePreferences';
import { Search } from '../Search';
import { DomainFilter } from '../DomainFilter';
import { SortControls } from '../SortControls';
import { GroupControls } from '../GroupControls';
import { EntityGroup } from '../EntityGroup';
import { filterEntities } from '../../utils/filterEntities';
import { filterByDomain, sortEntities } from '../../utils/entityHelpers';
import { groupEntities } from '../../utils/groupEntities';

export const EntityList: React.FC = () => {
  const { data: entities, isLoading, error } = useEntities();
  const { preferences, updatePreferences } = usePreferences();
  const [searchTerm, setSearchTerm] = React.useState('');

  // Handle loading and error states...
  if (isLoading || error || !entities?.length) {
    // ... (keep existing error handling)
    return null;
  }

  // Apply filters and sorting
  let filteredEntities = filterEntities(entities, searchTerm);
  filteredEntities = filterByDomain(filteredEntities, preferences.selectedDomain);
  filteredEntities = sortEntities(
    filteredEntities,
    preferences.sortBy,
    preferences.sortAsc
  );

  // Group entities
  const groups = groupEntities(
    filteredEntities,
    preferences.groupBy,
    preferences.customGroups
  );

  const toggleGroup = (groupId: string) => {
    const expanded = new Set(preferences.expandedGroups);
    if (expanded.has(groupId)) {
      expanded.delete(groupId);
    } else {
      expanded.add(groupId);
    }
    updatePreferences({ expandedGroups: Array.from(expanded) });
  };

  return (
    <div className="space-y-6">
      {/* Connection status */}
      <div className="mb-4 p-4 bg-green-50 rounded-lg">
        <p className="text-green-700">
          ✓ Connected to Home Assistant - Found {entities.length} entities
        </p>
      </div>
      
      {/* Controls */}
      <div className="space-y-4">
        <div className="max-w-2xl mx-auto">
          <Search onSearch={setSearchTerm} />
        </div>

        <div className="flex flex-wrap gap-4">
          <DomainFilter
            entities={entities}
            selectedDomain={preferences.selectedDomain}
            onDomainChange={(domain) => 
              updatePreferences({ selectedDomain: domain })
            }
          />
          
          <div className="flex flex-wrap gap-4 ml-auto">
            <GroupControls
              groupBy={preferences.groupBy}
              onGroupChange={(groupBy) => 
                updatePreferences({ groupBy })
              }
              expandedGroups={preferences.expandedGroups}
              onToggleGroup={toggleGroup}
            />
            
            <SortControls
              sortBy={preferences.sortBy}
              sortAsc={preferences.sortAsc}
              onSortChange={(sortBy) => 
                updatePreferences({ sortBy })
              }
              onDirectionChange={() => 
                updatePreferences({ sortAsc: !preferences.sortAsc })
              }
            />
          </div>
        </div>
      </div>
      
      {/* Filter status */}
      {(searchTerm || preferences.selectedDomain) && (
        <div className="text-sm text-gray-600 text-center">
          Found {filteredEntities.length} matching entities
          {preferences.selectedDomain && 
            ` in domain "${preferences.selectedDomain}"`}
          {searchTerm && ` matching "${searchTerm}"`}
        </div>
      )}
      
      {/* Entity groups */}
      <div className="space-y-4">
        {Object.entries(groups).map(([groupName, groupEntities]) => (
          <EntityGroup
            key={groupName}
            title={groupName}
            entities={groupEntities}
            isExpanded={preferences.expandedGroups.includes(groupName)}
            onToggle={() => toggleGroup(groupName)}
          />
        ))}
      </div>
    </div>
  );
}