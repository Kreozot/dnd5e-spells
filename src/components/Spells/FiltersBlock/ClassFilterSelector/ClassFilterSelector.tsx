import React, { FC, useCallback } from 'react';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import { bindActionCreators } from '@reduxjs/toolkit';
import { connect, ConnectedProps } from 'react-redux';

import {
  filtersSlice, chosenSpellsSlice, Dispatch, State,
} from 'common/store';

import * as styles from '../FiltersBlock.module.scss';

const ClassFilterSelector: FC<ReduxProps> = (props) => {
  const {
    classFilter,
    setClass,
    clearChosenSpells,
  } = props;

  const handleClassChange = useCallback((event: SelectChangeEvent<string>) => {
    setClass(event.target.value as Class || undefined);
    clearChosenSpells();
  }, [setClass, clearChosenSpells]);

  return (
    <FormControl className={styles.field}>
      <InputLabel id="class-select-label">Class</InputLabel>
      <Select
        labelId="class-select-label"
        value={classFilter || ''}
        onChange={handleClassChange}
        label="Class"
        className={styles.classFilterSelect}
      >
        <MenuItem value="">
          <em>All</em>
        </MenuItem>
        <MenuItem value="bard">Bard</MenuItem>
        <MenuItem value="cleric">Cleric</MenuItem>
        <MenuItem value="druid">Druid</MenuItem>
        <MenuItem value="paladin">Paladin</MenuItem>
        <MenuItem value="ranger">Ranger</MenuItem>
        <MenuItem value="sorcerer">Sorcerer</MenuItem>
        <MenuItem value="warlock">Warlock</MenuItem>
        <MenuItem value="wizard">Wizard</MenuItem>
        <MenuItem value="fighterEldrichKnight">Fighter (Eldrich Knight)</MenuItem>
        <MenuItem value="rogueArcaneTrickster">Rogue (Arcane Trickster)</MenuItem>
      </Select>
    </FormControl>
  );
};

const mapStateToProps = (state: State) => ({
  classFilter: state.filters.class,
});
const mapDispatchToProps = (dispatch: Dispatch) => bindActionCreators({
  setClass: filtersSlice.actions.setClass,
  clearChosenSpells: chosenSpellsSlice.actions.clearChosenSpells,
}, dispatch);

const connector = connect(mapStateToProps, mapDispatchToProps);
type ReduxProps = ConnectedProps<typeof connector>;

export default connector(ClassFilterSelector);
