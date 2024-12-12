import { useState, useEffect } from 'react';
import { UserPreferences, DEFAULT_PREFERENCES } from '../types/preferences';

const STORAGE_KEY = 'ha-config-preferences';

export function usePreferences() {
  const [preferences, setPreferences] = useState<UserPreferences>(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? JSON.parse(stored) : DEFAULT_PREFERENCES;
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(preferences));
  }, [preferences]);

  const updatePreferences = (updates: Partial<UserPreferences>) => {
    setPreferences(prev => ({ ...prev, ...updates }));
  };

  return { preferences, updatePreferences };
}