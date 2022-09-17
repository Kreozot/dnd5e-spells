import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export enum SpellsFilterOptions {
  All = 'all',
  Active = 'active'
}
export type SpellsFilter = SpellLevel | SpellsFilterOptions.All | SpellsFilterOptions.Active;

export type FiltersSlice = {
  spellsFilter: SpellsFilter,
  titleFilter: string,
  currentLevel?: number,
  class?: Class,
  classAdditional?: string,
  spellcastingAbilityValue?: number,
};

export default createSlice({
  name: 'filters',
  initialState: {
    spellsFilter: SpellsFilterOptions.All,
    titleFilter: '',
    currentLevel: undefined,
    class: undefined,
    classAdditional: undefined,
    spellcastingAbilityValue: undefined,
  } as FiltersSlice,
  reducers: {
    setSpellsFilter(state, action: PayloadAction<SpellsFilter>): FiltersSlice {
      return {
        ...state,
        spellsFilter: action.payload,
        titleFilter: '',
      };
    },
    setTitleFilter(state, action: PayloadAction<string>): FiltersSlice {
      return {
        ...state,
        titleFilter: action.payload.toLowerCase(),
        spellsFilter: SpellsFilterOptions.All,
      };
    },
    setCurrentLevel(state, action: PayloadAction<number | undefined>): FiltersSlice {
      return {
        ...state,
        currentLevel: action.payload,
      };
    },
    setClass(state, action: PayloadAction<Class | undefined>): FiltersSlice {
      return {
        ...state,
        class: action.payload,
        classAdditional: undefined,
      };
    },
    setClassAdditional(state, action: PayloadAction<string | undefined>): FiltersSlice {
      return {
        ...state,
        classAdditional: action.payload,
      };
    },
    setSpellcastingAbilityValue(state, action: PayloadAction<number | undefined>): FiltersSlice {
      return {
        ...state,
        spellcastingAbilityValue: action.payload,
      };
    },
  },
});
