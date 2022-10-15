import React, { FC, useEffect, useState } from 'react';
import throttle from 'lodash/throttle';

import Spells from 'components/Spells';
import {
  loadChosenSpells,
  loadFilters,
  saveChosenSpells,
  saveFilters,
} from 'common/store/apiState';
import filtersSlice from 'common/store/filtersSlice';
import chosenSpellsSlice from 'common/store/chosenSpellsSlice';
import { store } from 'common/store';
import Loader from 'components/Loader';

const IndexPage: FC = () => {
  const [isLoaded, setLoaded] = useState(false);

  useEffect(() => {
    const loadState = async () => {
      const filtersSavedState = await loadFilters();
      if (filtersSavedState) {
        store.dispatch(filtersSlice.actions.replaceState(filtersSavedState));
      }
      const chosenSpellsSavedState = await loadChosenSpells();
      if (chosenSpellsSavedState) {
        store.dispatch(chosenSpellsSlice.actions.replaceState(chosenSpellsSavedState));
      }
    };

    loadState();

    store.subscribe(throttle(async () => {
      const { filters, chosenSpells } = store.getState();
      await saveFilters(filters);
      await saveChosenSpells(chosenSpells);
    }, 1000));

    setLoaded(true);
  }, []);

  if (!isLoaded) {
    return <Loader />;
  }

  return <Spells />;
};

export default IndexPage;
