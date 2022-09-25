import React, { FC, useEffect } from 'react';

import Spells from 'components/Spells';
import { loadState, StorageKey } from 'common/store/localStorageState';
import filtersSlice, { FiltersSlice } from 'common/store/filtersSlice';
import chosenSpellsSlice, { ChosenSpellsSlice } from 'common/store/chosenSpellsSlice';
import { store } from 'common/store';

const IndexPage: FC = () => {
  useEffect(() => {
    const filtersSavedState = loadState<FiltersSlice>(StorageKey.FILTERS_STORAGE_KEY);
    if (filtersSavedState) {
      store.dispatch(filtersSlice.actions.replaceState(filtersSavedState));
    }
    const chosenSpellsSavedState = loadState<ChosenSpellsSlice>(StorageKey.CHOSEN_SPELLS_STORAGE_KEY);
    if (chosenSpellsSavedState) {
      store.dispatch(chosenSpellsSlice.actions.replaceState(chosenSpellsSavedState));
    }
  }, []);

  return (
    <Spells />
  );
};

export default IndexPage;
