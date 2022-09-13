import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export type FiltersSlice = {
  level: null | '' | number,
  activeFilter: boolean,
  titleFilter: string,
  currentLevel?: number,
  class: '' | Class,
  classAdditional: string,
  spellcastingAbilityValue: '' | number,
}

export default createSlice({
  name: 'filters',
  initialState: <FiltersSlice>{
    level: null,
    activeFilter: false,
    titleFilter: '',
    currentLevel: undefined,
    class: '',
    classAdditional: '',
    spellcastingAbilityValue: '',
  },
  reducers: {
    selectLevel(state, action: PayloadAction<number | null>) {
      return { ...state, level: action.payload, activeFilter: false, titleFilter: '' };
    },
    setTitleFilter(state, action: PayloadAction<string>) {
      return { ...state, titleFilter: action.payload.toLowerCase(), level: null, activeFilter: false };
    },
    setActiveFilterOn(state) {
      return { ...state, activeFilter: true, level: null, titleFilter: '' };
    },
    setCurrentLevel(state, action: PayloadAction<number | undefined>) {
      return { ...state, currentLevel: action.payload };
    },
    setClass(state, action: PayloadAction<Class>) {
      return { ...state, class: action.payload, classAdditional: '' };
    },
    setClassAdditional(state, action: PayloadAction<string>) {
      return { ...state, classAdditional: action.payload };
    },
    setSpellcastingAbilityValue(state, action: PayloadAction<'' | number>) {
      return { ...state, spellcastingAbilityValue: action.payload };
    },
  },
});
