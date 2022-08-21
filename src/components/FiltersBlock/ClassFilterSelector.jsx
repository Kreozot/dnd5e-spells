import React, { useCallback } from 'react';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { filtersSlice, chosenSpellsSlice } from 'common/store';

import * as styles from './FiltersBlock.module.scss';

function ClassFilterSelector(props) {
  const {
    classFilter,
    setClass,
    clearChosenSpells,
  } = props;

  const handleClassChange = useCallback((event) => {
    setClass(event.target.value);
    clearChosenSpells();
  }, [setClass, clearChosenSpells]);

  return (
    <FormControl className={ styles.field }>
      <InputLabel id="class-select-label">Class</InputLabel>
      <Select
        labelId="class-select-label"
        value={ classFilter }
        onChange={ handleClassChange }
        className={ styles.classFilterSelect }
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
}

const mapStateToProps = (state) => ({
  classFilter: state.filters.class,
});
const mapDispatchToProps = (dispatch) => bindActionCreators({
  setClass: filtersSlice.actions.setClass,
  clearChosenSpells: chosenSpellsSlice.actions.clearChosenSpells,
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(ClassFilterSelector);
