import { createSlice } from '@reduxjs/toolkit';

export default createSlice({
  name: 'filters',
  initialState: {
    level: null,
    activeFilter: false,
    titleFilter: '',
    currentLevel: '',
    class: '',
    classAdditional: '',
    spellcastingAbilityValue: '',
  },
  reducers: {
    selectLevel(state, action) {
      return { ...state, level: action.payload, activeFilter: false, titleFilter: '' };
    },
    setTitleFilter(state, action) {
      return { ...state, titleFilter: action.payload.toLowerCase(), level: null, activeFilter: false };
    },
    setActiveFilterOn(state) {
      return { ...state, activeFilter: true, level: null, titleFilter: '' };
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
