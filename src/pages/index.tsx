import React, { FC, useEffect, useState } from 'react';
import throttle from 'lodash/throttle';

import Spells from 'components/Spells';
import { loadState, saveState, StorageKey } from 'common/store/localStorageState';
import filtersSlice, { FiltersSlice } from 'common/store/filtersSlice';
import chosenSpellsSlice, { ChosenSpellsSlice } from 'common/store/chosenSpellsSlice';
import { store } from 'common/store';
import Loader from 'components/Loader';

const IndexPage: FC = () => {
  const [isLoaded, setLoaded] = useState(false);

  useEffect(() => {
    const filtersSavedState = loadState<FiltersSlice>(StorageKey.FILTERS_STORAGE_KEY);
    if (filtersSavedState) {
      store.dispatch(filtersSlice.actions.replaceState(filtersSavedState));
    }
    const chosenSpellsSavedState = loadState<ChosenSpellsSlice>(StorageKey.CHOSEN_SPELLS_STORAGE_KEY);
    if (chosenSpellsSavedState) {
      store.dispatch(chosenSpellsSlice.actions.replaceState(chosenSpellsSavedState));
    }

    store.subscribe(throttle(() => {
      const { filters, chosenSpells } = store.getState();
      saveState(StorageKey.FILTERS_STORAGE_KEY, filters);
      saveState(StorageKey.CHOSEN_SPELLS_STORAGE_KEY, chosenSpells);
    }, 1000));
    setLoaded(true);
  }, []);

  if (!isLoaded) {
    return <Loader />;
  }

  return <Spells />;
};

export default IndexPage;
