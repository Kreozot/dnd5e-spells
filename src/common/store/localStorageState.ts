export enum StorageKey {
  FILTERS_STORAGE_KEY = 'dnd_filters',
  CHOSEN_SPELLS_STORAGE_KEY = 'dnd_chosen_spells'
}

export function loadState<T>(key: StorageKey) {
  try {
    const serializedState = localStorage.getItem(key);
    if (!serializedState) return undefined;
    return JSON.parse(serializedState) as T;
  } catch (e) {
    return undefined;
  }
}

export function saveState<T>(key: StorageKey, state: T) {
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem(key, serializedState);
  } catch (e) {
    // Ignore
  }
}
