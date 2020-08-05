import { createSlice, configureStore, combineReducers } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { createSelector } from 'reselect';

import spellsData from 'content/spells';
import classSpellsData from 'content/classSpells.yaml';
import classRestrictionsData from 'content/classRestrictions.yaml';

const persistConfig = {
  key: 'root',
  storage,
};

export const filtersSlice = createSlice({
  name: 'filters',
  initialState: {
    level: null,
    currentLevel: '',
    class: '',
    classAdditional: '',
  },
  reducers: {
    selectLevel(state, action) {
      return {
        ...state,
        level: action.payload
      };
    },
    setCurrentLevel(state, action) {
      return {
        ...state,
        currentLevel: action.payload
      };
    },
    setClass(state, action) {
      return {
        ...state,
        class: action.payload
      };
    },
    setClassAdditional(state, action) {
      return {
        ...state,
        classAdditional: action.payload
      };
    },
  },
});

export const getClassAdditionalKey = createSelector(
  (state) => state.filters.class,
  (classFilter) => {
    if (classFilter) {
      const keys = Object.keys(classSpellsData[classFilter]);
      if (keys.length > 1) {
        return keys.filter((key) => key !== 'main')[0];
      }
    }
  }
);

const getAvailableSpellLevel = (classFilter, currentLevel) => {
  if (classFilter && currentLevel) {
    let levelIndex = parseInt(currentLevel) - 1;
    if (levelIndex > classRestrictionsData[classFilter].length - 1) {
      levelIndex = classRestrictionsData[classFilter].length - 1;
    }
    const levelRestrictions = classRestrictionsData[classFilter].levels[levelIndex];
    return levelRestrictions.spellSlots.length;
  }
}


export const getClassAdditionalOptions = createSelector(
  (state) => state.filters.class,
  getClassAdditionalKey,
  (classFilter, additionalKey) => {
    if (additionalKey) {
      return Object.keys(classSpellsData[classFilter][additionalKey]);
    }
  }
);

// Get all spells objects available to current class (including additional options) and level
export const getAvailableSpells = createSelector(
  (state) => state.filters.class,
  (state) => state.filters.classAdditional,
  (state) => state.filters.currentLevel,
  getClassAdditionalKey,
  (classFilter, classAdditionalFilter, currentLevel, additionalKey) => {
    if (!classFilter) {
      return spellsData;
    }

    let availableSpellList = [];
    if (classFilter) {
      availableSpellList = [...classSpellsData[classFilter].main];
      if (classAdditionalFilter && additionalKey) {
        availableSpellList = availableSpellList.concat(classSpellsData[classFilter][additionalKey][classAdditionalFilter]);
      }
    }
    const availableSpellLevel = getAvailableSpellLevel(classFilter, currentLevel);

    return spellsData
      .filter((spell) => !currentLevel || spell.level === 'cantrip' || spell.level <= availableSpellLevel)
      .filter((spell) => availableSpellList.some(
        (title) => title.toLowerCase() === spell.title.toLowerCase()
      ));
  }
);

export const store = configureStore({
  reducer: persistReducer(persistConfig, combineReducers({
    filters: filtersSlice.reducer,
  })),
  middleware: [],
});

export const persistor = persistStore(store);
