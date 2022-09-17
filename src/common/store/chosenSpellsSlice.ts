import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import without from 'lodash/without';

type ChosenSpellsSlice = {
  spells: string[];
  cantrips: string[];
};

export default createSlice({
  name: 'chosenSpells',
  initialState: {
    spells: [],
    cantrips: [],
  } as ChosenSpellsSlice,
  reducers: {
    toggleSpellChosen(state, action: PayloadAction<{ title: string, isSpellChosen: boolean }>): ChosenSpellsSlice {
      const { title, isSpellChosen } = action.payload;
      if (isSpellChosen) {
        return {
          ...state,
          spells: without(state.spells, title),
        };
      }
      return {
        ...state,
        spells: [...state.spells, title],
      };
    },
    toggleCantripChosen(state, action: PayloadAction<{ title: string, isCantripChosen: boolean }>): ChosenSpellsSlice {
      const { title, isCantripChosen } = action.payload;
      if (isCantripChosen) {
        return {
          ...state,
          cantrips: without(state.cantrips, title),
        };
      }
      return {
        ...state,
        cantrips: [...state.cantrips, title],
      };
    },
    clearChosenSpells(): ChosenSpellsSlice {
      return {
        cantrips: [],
        spells: [],
      };
    },
  },
});
