import { FiltersSlice } from 'common/store/filtersSlice';
import { ChosenSpellsSlice } from 'common/store/chosenSpellsSlice';

export enum StorageKey {
  FILTERS_STORAGE_KEY = 'dnd_filters',
  CHOSEN_SPELLS_STORAGE_KEY = 'dnd_chosen_spells'
}
const FILTERS_URL = '/.netlify/functions/filters';
const CHOSEN_SPELLS = '/.netlify/functions/chosen-spells';

export const loadFilters = async () => {
  const response = await fetch(FILTERS_URL, {
    body: null,
    method: 'GET',
  });
  const json = await response.json();
  return json as FiltersSlice;
};

export const saveFilters = async (state: FiltersSlice) => {
  await fetch(FILTERS_URL, {
    body: JSON.stringify(state),
    method: 'POST',
  });
};

export const loadChosenSpells = async () => {
  const response = await fetch(CHOSEN_SPELLS, {
    body: null,
    method: 'GET',
  });
  const json = await response.json();
  return json as ChosenSpellsSlice;
};

export const saveChosenSpells = async (state: ChosenSpellsSlice) => {
  await fetch(CHOSEN_SPELLS, {
    body: JSON.stringify(state),
    method: 'POST',
  });
};
