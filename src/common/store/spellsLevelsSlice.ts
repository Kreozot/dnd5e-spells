import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import omit from 'lodash/omit';

/** Mapping spells to casting levels selected by user (cast spell with higher level slot) */
type SpellsLevelSlice = {
  [title: string]: number;
};

export default createSlice({
  name: 'spellsLevelsSlice',
  initialState: {} as SpellsLevelSlice,
  reducers: {
    chooseSpellLevel(state, action: PayloadAction<{ item: Spell, level: number }>): SpellsLevelSlice {
      const { item, level } = action.payload;
      if (item.level <= level) {
        return {
          ...state,
          [item.title]: level,
        };
      } else {
        return omit(state, item.title);
      }
    }
  },
});
