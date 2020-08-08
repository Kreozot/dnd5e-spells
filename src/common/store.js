import { createSlice, configureStore, combineReducers } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { createSelector } from 'reselect';
import without from 'lodash/without';

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
      return { ...state, class: action.payload, classAdditional: '' };
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

const getAdditionalClassSpells = createSelector(
  (state) => state.filters.class,
  (state) => state.filters.classAdditional,
  getClassAdditionalKey,
  (classFilter, classAdditionalFilter, additionalKey) => {
    if (classFilter && additionalKey && classAdditionalFilter) {
      return classSpellsData[classFilter][additionalKey][classAdditionalFilter];
    }
  }
);

// Get all spells objects available to current class (including additional options) and level
export const getAvailableSpells = createSelector(
  (state) => state.filters.class,
  (state) => state.filters.currentLevel,
  getAvailableSpellLevel,
  getAdditionalClassSpells,
  (classFilter, currentLevel, availableSpellLevel, additionalClassSpells) => {
    if (!classFilter) {
      return spellsData;
    }

    let availableSpellList = [];
    if (classFilter) {
      availableSpellList = [...classSpellsData[classFilter].main];
      if (additionalClassSpells) {
        availableSpellList = availableSpellList.concat(additionalClassSpells);
      }
    }

    return spellsData
      .filter((spell) => !currentLevel || spell.level === 'cantrip' || spell.level <= availableSpellLevel)
      .filter((spell) => availableSpellList.some(
        (title) => title.toLowerCase() === spell.title.toLowerCase()
      ));
  }
);

// Get modifier by value of spellcasting ability for current class
export const getSpellcastingAbilityModifier = createSelector(
  (state) => state.filters.spellcastingAbilityValue,
  (spellcastingAbilityValue) => {
    if (!spellcastingAbilityValue) {
      return null;
    }
    return Math.floor((spellcastingAbilityValue - 10) / 2);
  }
);

// Get known spells count for current class and spellcasting ability modifier
export const getKnownSpellsCount = createSelector(
  (state) => state.filters.class,
  (state) => state.filters.currentLevel,
  getSpellcastingAbilityModifier,
  getCurrentLevelClassRestrictions,
  (classFilter, currentLevel, spellcastingAbilityModifier, currentLevelClassRestrictions) => {
    if (!currentLevelClassRestrictions) {
      return null;
    }
    if (currentLevelClassRestrictions.knownSpells) {
      return currentLevelClassRestrictions.knownSpells;
    }
    switch (classFilter) {
      case 'paladin':
        return Math.max(1, Math.floor(spellcastingAbilityModifier + currentLevel / 2));
      default:
        return Math.max(1, spellcastingAbilityModifier + currentLevel);
    }
  }
);

export const chosenSpellsSlice = createSlice({
  name: 'chosenSpells',
  initialState: [],
  reducers: {
    toggleSpellChosen(state, action) {
      const { title, isSpellChosen } = action.payload;
      if (isSpellChosen) {
        return without(state, title);
      }
      return [ ...state, title ];
    },
    clearSpells(state) {
      return [];
    }
  },
});

// Get chosen spells plus always active spells for current class additional
export const getAllActiveSpells = createSelector(
  (state) => state.chosenSpells,
  getAdditionalClassSpells,
  (chosenSpells, additionalClassSpells) => {
    if (additionalClassSpells) {
      return chosenSpells.concat(additionalClassSpells);
    }
    return chosenSpells;
  }
);

export const getIsSpellChosen = createSelector(
  (state, props) => getAllActiveSpells(state)
    .some((title) => props.title.toLowerCase() === title.toLowerCase()),
  (isChosen) => isChosen
);

export const store = configureStore({
  reducer: persistReducer(persistConfig, combineReducers({
    filters: filtersSlice.reducer,
    chosenSpells: chosenSpellsSlice.reducer,
  })),
  middleware: [],
});

export const persistor = persistStore(store);
