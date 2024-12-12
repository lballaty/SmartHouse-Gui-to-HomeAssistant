import React from 'react';

export type SortOption = 'name' | 'domain' | 'state' | 'last_updated';

interface SortControlsProps {
  sortBy: SortOption;
  sortAsc: boolean;
  onSortChange: (option: SortOption) => void;
  onDirectionChange: () => void;
}

export const SortControls: React.FC<SortControlsProps> = ({
  sortBy,
  sortAsc,
  onSortChange,
  onDirectionChange,
}) => {
  const options: Array<{ value: SortOption; label: string }> = [
    { value: 'name', label: 'Name' },
    { value: 'domain', label: 'Domain' },
    { value: 'state', label: 'State' },
    { value: 'last_updated', label: 'Last Updated' },
  ];

  return (
    <div className="flex items-center gap-2">
      <label className="text-sm text-gray-600">Sort by:</label>
      <select
        value={sortBy}
        onChange={(e) => onSortChange(e.target.value as SortOption)}
        className="px-2 py-1 rounded border border-gray-300 text-sm"
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      <button
        onClick={onDirectionChange}
        className="p-1 rounded hover:bg-gray-100"
        aria-label={sortAsc ? 'Sort descending' : 'Sort ascending'}
      >
        {sortAsc ? '↑' : '↓'}
      </button>
    </div>
  );
}