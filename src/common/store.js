import { createSlice, configureStore, combineReducers } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { createSelector } from 'reselect';

import spellsData from 'content/spells';
import classSpellsData from 'content/classSpells.yaml';
import classRestrictionsData from 'content/classRestrictions.yaml';
import SpellcastingAbilityValueSelector from '../components/SpellcastingAbilityValueSelector';

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
    spellcastingAbilityValue: '',
  },
  reducers: {
    selectLevel(state, action) {
      return { ...state, level: action.payload };
    },
    setCurrentLevel(state, action) {
      return { ...state, currentLevel: action.payload };
    },
    setClass(state, action) {
      return { ...state, class: action.payload };
    },
    setClassAdditional(state, action) {
      return { ...state, classAdditional: action.payload };
    },
    setSpellcastingAbilityValue(state, action) {
      return { ...state, spellcastingAbilityValue: action.payload };
    },
  },
});

// Get key (name) of class additional options (e.g. "Divine Domains" for Cleric)
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

// Get spell casting restrictions params for current class
export const getClassRestrictions = createSelector(
  (state) => state.filters.class,
  (classFilter) => {
    if (classFilter) {
      return classRestrictionsData[classFilter];
    }
  }
);

// Get spell casting restrictions params for current class and level
export const getCurrentLevelClassRestrictions = createSelector(
  getClassRestrictions,
  (state) => state.filters.currentLevel,
  (classRestrictions, currentLevel) => {
    if (classRestrictions && currentLevel) {
      const lastIndex = classRestrictions.levels.length - 1;
      const levelIndex = Math.min(parseInt(currentLevel) - 1, lastIndex);
      return classRestrictions.levels[levelIndex];
    }
  }
);

// Get maximum spell slot's level for current class and level
const getAvailableSpellLevel = createSelector(
  getCurrentLevelClassRestrictions,
  (currentLevelClassRestrictions) => {
    if (currentLevelClassRestrictions) {
      return currentLevelClassRestrictions.spellSlots.length;
    }
  }
);

// Get additional class options (like Cleric's Divine Domains list)
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
  getAvailableSpellLevel,
  (classFilter, classAdditionalFilter, currentLevel, additionalKey, availableSpellLevel) => {
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

    return spellsData
      .filter((spell) => !currentLevel || spell.level === 'cantrip' || spell.level <= availableSpellLevel)
      .filter((spell) => availableSpellList.some(
        (title) => title.toLowerCase() === spell.title.toLowerCase()
      ));
  }
);

export const getSpellcastingAbilityModifier = createSelector(
  (state) => state.filters.spellcastingAbilityValue,
  (spellcastingAbilityValue) => {
    if (!spellcastingAbilityValue) {
      return null;
    }
    return Math.floor((spellcastingAbilityValue - 10) / 2);
  }
);

export const store = configureStore({
  reducer: persistReducer(persistConfig, combineReducers({
    filters: filtersSlice.reducer,
  })),
  middleware: [],
});

export const persistor = persistStore(store);
