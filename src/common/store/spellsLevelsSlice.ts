import { createSlice, PayloadAction } from '@reduxjs/toolkit';

/** Mapping spells to casting levels selected by user (cast spell with higher level slot) */
type SpellsLevelSlice = {
  [title: string]: number;
};

export default createSlice({
  name: 'spellsLevelsSlice',
  initialState: <SpellsLevelSlice>{},
  reducers: {
    chooseSpellLevel(state, action: PayloadAction<{ item: Spell, level: number }>) {
      const { item, level } = action.payload;
      if (item.level <= level) {
        state[item.title] = level;
      } else {
        delete state[item.title];
      }
    }
  },
});
