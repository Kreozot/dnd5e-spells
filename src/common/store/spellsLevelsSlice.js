import { createSlice } from '@reduxjs/toolkit';

export default createSlice({
  name: 'spellsLevelsSlice',
  initialState: {},
  reducers: {
    chooseSpellLevel(state, action) {
      const { item, level } = action.payload;
      if (item.level <= level) {
        state[item.title] = level;
      } else {
        delete state[item.title];
      }
    }
  },
});
