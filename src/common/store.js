import { createSlice, configureStore, combineReducers } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

const persistConfig = {
  key: 'root',
  storage,
};

export const filtersSlice = createSlice({
  name: 'filters',
  initialState: {
    level: null,
    currentLevel: '',
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
  },
});

export const store = configureStore({
  reducer: persistReducer(persistConfig, combineReducers({
    filters: filtersSlice.reducer,
  })),
  middleware: [],
});

export const persistor = persistStore(store);
