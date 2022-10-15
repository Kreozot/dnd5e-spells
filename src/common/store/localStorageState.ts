import { FiltersSlice } from 'common/store/filtersSlice';
import { ChosenSpellsSlice } from 'common/store/chosenSpellsSlice';

export enum StorageKey {
  FILTERS_STORAGE_KEY = 'dnd_filters',
  CHOSEN_SPELLS_STORAGE_KEY = 'dnd_chosen_spells'
}

export const loadState = <T>(key: StorageKey) => {
  try {
    const serializedState = localStorage.getItem(key);
    if (!serializedState) return undefined;
    return JSON.parse(serializedState) as T;
  } catch (e) {
    return undefined;
  }
};

export const saveState = <T>(key: StorageKey, state: T) => {
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem(key, serializedState);
  } catch (e) {
    // Ignore
  }
};

export const loadFilters = () => loadState<FiltersSlice>(StorageKey.FILTERS_STORAGE_KEY);
export const loadChosenSpells = () => loadState<ChosenSpellsSlice>(StorageKey.CHOSEN_SPELLS_STORAGE_KEY);
export const saveFilters = (state: FiltersSlice) => saveState<FiltersSlice>(StorageKey.FILTERS_STORAGE_KEY, state);
export const saveChosenSpells = (state: ChosenSpellsSlice) => saveState<ChosenSpellsSlice>(
  StorageKey.CHOSEN_SPELLS_STORAGE_KEY,
  state
);
