import { createSlice } from '@reduxjs/toolkit';
import without from 'lodash/without';

type ChosenSpellsSlice = {
  spells: string[];
  cantrips: string[];
}

export default createSlice({
  name: 'chosenSpells',
  initialState: <ChosenSpellsSlice>{
    spells: [],
    cantrips: []
  },
  reducers: {
    toggleSpellChosen(state, action) {
      const { title, isSpellChosen } = action.payload;
      if (isSpellChosen) {
        return {
          ...state,
          spells: without(state.spells, title)
        };
      }
      return {
        ...state,
        spells: [ ...state.spells, title ]
      };
    },
    toggleCantripChosen(state, action) {
      const { title, isCantripChosen } = action.payload;
      if (isCantripChosen) {
        return {
          ...state,
          cantrips: without(state.cantrips, title)
        };
      }
      return {
        ...state,
        cantrips: [ ...state.cantrips, title ]
      };
    },
    clearChosenSpells(state) {
      return {
        cantrips: [],
        spells: []
      };
    },
  },
});
