import { createSlice, configureStore, combineReducers } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { createSelector } from 'reselect';

import classSpells from 'content/classSpells.yaml';

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

function getClassAdditionalKey(classFilter) {
  if (classFilter) {
    const keys = Object.keys(classSpells[classFilter]);
    if (keys.length > 1) {
      return keys.filter((key) => key !== 'main')[0];
    }
  }
}

export const getClassAdditionalOptions = createSelector(
  (state) => state.filters.class,
  (classFilter) => {
    const additionalKey = getClassAdditionalKey(classFilter);
    if (additionalKey) {
      return Object.keys(classSpells[classFilter][additionalKey]);
    }
  }
);

export const getAvailableSpells = createSelector(
  (state) => state.filters.class,
  (state) => state.filters.classAdditional,
  (state) => state.filters.currentLevel,
  (classFilter, classAdditionalFilter, currentLevel) => {
    const additionalKey = getClassAdditionalKey(classFilter);

    let result = [];
    if (classFilter) {
      result = classSpells[classFilter].main;
      if (classAdditionalFilter && additionalKey) {
        result = result.concat(classSpells[classFilter][additionalKey][classAdditionalFilter]);
      }
    }
    return result;
  }
);

export const store = configureStore({
  reducer: persistReducer(persistConfig, combineReducers({
    filters: filtersSlice.reducer,
  })),
  middleware: [],
});

export const persistor = persistStore(store);
