export interface UserPreferences {
  sortBy: string;
  sortAsc: boolean;
  selectedDomain: string;
  groupBy: string | null;
  customGroups: Record<string, string[]>;
  expandedGroups: string[];
  columnCount: number;
}

export const DEFAULT_PREFERENCES: UserPreferences = {
  sortBy: 'name',
  sortAsc: true,
  selectedDomain: '',
  groupBy: null,
  customGroups: {},
  expandedGroups: [],
  columnCount: 3,
};