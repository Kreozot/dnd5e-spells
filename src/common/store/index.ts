import { configureStore, combineReducers } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { createSelector } from 'reselect';

import spellsData from 'content/spells';
import classSpellsData from 'content/classSpells.yaml';
import classRestrictionsData from 'content/classRestrictions.yaml';
import chosenSpellsSlice from './chosenSpellsSlice';
import filtersSlice from './filtersSlice';
import spellsLevelsSlice from './spellsLevelsSlice';
import uniqBy from 'lodash/uniqBy';
import sortBy from 'lodash/sortBy';

const persistConfig = {
  key: 'root',
  storage,
  blacklist: ['spellsLevels']
};

export { filtersSlice, chosenSpellsSlice, spellsLevelsSlice };

export const store = configureStore({
  reducer: persistReducer(persistConfig, combineReducers({
    filters: filtersSlice.reducer,
    chosenSpells: chosenSpellsSlice.reducer,
    spellsLevels: spellsLevelsSlice.reducer,
  })),
  middleware: [],
});
export type State = ReturnType<typeof store.getState>;
export type Dispatch = typeof store.dispatch;

/** Get key (name) of class additional options (e.g. "Divine Domains" for Cleric) */
export const getClassAdditionalKey = createSelector(
  (state: State) => state.filters.class,
  (classFilter) => {
    if (classFilter) {
      const keys = Object.keys(classSpellsData[classFilter]);
      if (keys.length > 1) {
        return keys.filter((key) => key !== 'main')[0];
      }
    }
  }
);

/** Get spell casting restrictions params for current class */
export const getClassRestrictions = createSelector(
  (state: State) => state.filters.class,
  (classFilter) => {
    if (classFilter) {
      return classRestrictionsData[classFilter];
    }
  }
);

/** Get spell casting restrictions params for current class and level */
export const getCurrentLevelClassRestrictions = createSelector(
  getClassRestrictions,
  (state: State) => state.filters.currentLevel,
  (classRestrictions, currentLevel) => {
    if (classRestrictions && currentLevel) {
      const lastIndex = classRestrictions.levels.length - 1;
      const levelIndex = Math.min(currentLevel - 1, lastIndex);
      return classRestrictions.levels[levelIndex];
    }
  }
);

/** Get maximum spell slot's level for current class and level */
const getAvailableSpellLevel = createSelector(
  getCurrentLevelClassRestrictions,
  (currentLevelClassRestrictions) => {
    if (currentLevelClassRestrictions) {
      return currentLevelClassRestrictions.spellSlots.length;
    }
  }
);

/** Get additional class options (like Cleric's Divine Domains list) */
export const getClassAdditionalOptions = createSelector(
  (state: State) => state.filters.class,
  getClassAdditionalKey,
  (classFilter, additionalKey) => {
    if (additionalKey && classFilter) {
      return Object.keys(classSpellsData[classFilter][additionalKey]);
    }
  }
);

export const getAdditionalClassSpells = createSelector(
  (state: State) => state.filters.class,
  (state: State) => state.filters.classAdditional,
  getClassAdditionalKey,
  (classFilter, classAdditionalFilter, additionalKey) => {
    if (classFilter && additionalKey && classAdditionalFilter) {
      return classSpellsData[classFilter][additionalKey][classAdditionalFilter];
    }
  }
);

/** Get all spells objects available to current class (including additional options) and level */
export const getAvailableSpells = createSelector(
  (state: State) => state.filters.class,
  (state: State) => state.filters.currentLevel,
  getAvailableSpellLevel,
  getAdditionalClassSpells,
  (classFilter, currentLevel, availableSpellLevel, additionalClassSpells) => {
    if (!classFilter) {
      return spellsData;
    }

    let availableSpellList: string[] = [];
    if (classFilter) {
      availableSpellList = [...classSpellsData[classFilter].main];
      if (additionalClassSpells) {
        availableSpellList = availableSpellList.concat(additionalClassSpells);
      }
    }

    return spellsData
      .filter((spell) => !currentLevel || spell.level === 'cantrip' || typeof availableSpellLevel === 'undefined' || spell.level <= availableSpellLevel)
      .filter((spell) => availableSpellList.some(
        (title) => title.toLowerCase() === spell.title.toLowerCase()
      ));
  }
);

/** Get a sorted list of available spell levels for current class (including additional options) and level */
export const getAvailableSpellLevels = createSelector(
  getAvailableSpells,
  (availableSpells) => {
    const availableLevels = uniqBy(availableSpells, 'level').map(({ level }) => level);
    return sortBy(availableLevels, (level) => {
      return level === 'cantrip' ? 0 : level;
    });
  }
);

/** Get modifier by value of spellcasting ability for current class */
export const getSpellcastingAbilityModifier = createSelector(
  (state: State) => state.filters.spellcastingAbilityValue,
  (state: State) => state.filters.class,
  (spellcastingAbilityValue, classFilter) => {
    if (!spellcastingAbilityValue || !classFilter) {
      return null;
    }
    return Math.floor((spellcastingAbilityValue - 10) / 2);
  }
);

/** Get known spells count for current class and spellcasting ability modifier */
export const getKnownSpellsCount = createSelector(
  (state: State) => state.filters.class,
  (state: State) => state.filters.currentLevel,
  getSpellcastingAbilityModifier,
  getCurrentLevelClassRestrictions,
  (classFilter, currentLevel, spellcastingAbilityModifier, currentLevelClassRestrictions) => {
    if (!currentLevel || !currentLevelClassRestrictions || spellcastingAbilityModifier === null) {
      return null;
    }
    if (currentLevelClassRestrictions.knownSpells) {
      return currentLevelClassRestrictions.knownSpells;
    }
    if (classFilter === 'paladin') {
      return Math.max(1, Math.floor(spellcastingAbilityModifier + currentLevel / 2));
    }
    return Math.max(1, spellcastingAbilityModifier + currentLevel);
  }
);

/** Get known cantrips count for current class and spellcasting ability modifier */
export const getKnownCantripsCount = createSelector(
  getCurrentLevelClassRestrictions,
  (currentLevelClassRestrictions) => {
    if (!currentLevelClassRestrictions) {
      return null;
    }
    return currentLevelClassRestrictions.cantrips;
  }
);

/** Get chosen spells plus always active spells for current class additional */
export const getAllActiveSpells = createSelector(
  (state: State) => state.chosenSpells.spells,
  (state: State) => state.chosenSpells.cantrips,
  getAdditionalClassSpells,
  (chosenSpells, chosenCantrips, additionalClassSpells): string[] => {
    return [
      ...chosenSpells,
      ...chosenCantrips,
      ...(additionalClassSpells || [])
    ];
  }
);

export const getCanChooseMoreSpells = createSelector(
  getKnownSpellsCount,
  (state: State) => state.chosenSpells.spells.length,
  (knownSpellsCount, chosenSpellsCount) => Boolean(knownSpellsCount && chosenSpellsCount < knownSpellsCount)
);

export const getCanChooseMoreCantrips = createSelector(
  getKnownCantripsCount,
  (state: State) => state.chosenSpells.cantrips.length,
  (knownCantripsCount, chosenCantripsCount) => Boolean(knownCantripsCount && chosenCantripsCount < knownCantripsCount)
);

/** Proficiency bonus value for current level */
export const getProficiencyBonus = createSelector(
  (state: State) => state.filters.currentLevel,
  (currentLevel) => {
    if (typeof currentLevel === 'number') {
      if (currentLevel >= 17) {
        return 6;
      }
      if (currentLevel >= 13) {
        return 5;
      }
      if (currentLevel >= 9) {
        return 4;
      }
      if (currentLevel >= 5) {
        return 3;
      }
      if (currentLevel >= 1) {
        return 2;
      }
    }
    return null;
  }
);

export const getSpellSaveDC = createSelector(
  getProficiencyBonus,
  getSpellcastingAbilityModifier,
  (proficiencyBonus, abilityModifier) => {
    if (proficiencyBonus === null || abilityModifier === null) {
      return null;
    }
    return 8 + proficiencyBonus + abilityModifier;
  }
)

export const getSpellAttackModifier = createSelector(
  getProficiencyBonus,
  getSpellcastingAbilityModifier,
  (proficiencyBonus, abilityModifier) => {
    if (proficiencyBonus === null || abilityModifier === null) {
      return null;
    }
    return proficiencyBonus + abilityModifier;
  }
)

export const persistor = persistStore(store);
