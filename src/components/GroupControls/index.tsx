import React from 'react';
import { HAEntity } from '../../types/homeAssistant';

interface GroupControlsProps {
  groupBy: string | null;
  onGroupChange: (option: string | null) => void;
  expandedGroups: string[];
  onToggleGroup: (groupId: string) => void;
}

export const GroupControls: React.FC<GroupControlsProps> = ({
  groupBy,
  onGroupChange,
  expandedGroups,
  onToggleGroup,
}) => {
  const groupOptions = [
    { value: null, label: 'No Grouping' },
    { value: 'domain', label: 'By Domain' },
    { value: 'state', label: 'By State' },
    { value: 'custom', label: 'Custom Groups' },
  ];

  return (
    <div className="flex items-center gap-2">
      <label className="text-sm text-gray-600">Group by:</label>
      <select
        value={groupBy || ''}
        onChange={(e) => onGroupChange(e.target.value || null)}
        className="px-2 py-1 rounded border border-gray-300 text-sm"
      >
        {groupOptions.map((option) => (
          <option key={option.value || 'none'} value={option.value || ''}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
}