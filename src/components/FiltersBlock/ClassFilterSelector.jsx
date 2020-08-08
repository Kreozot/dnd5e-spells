import React, { useCallback, useMemo } from 'react';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { filtersSlice, getAvailableSpells, getClassAdditionalOptions, getClassAdditionalKey } from 'common/store';

import styles from './FiltersBlock.module.scss';

function ClassFilterSelector(props) {
  const {
    classFilter,
    classAdditionalFilter,
    setClass,
    setClassAdditional,
    additionalOptions,
    additionalKey,
  } = props;

  const handleClassChange = useCallback((event) => {
    setClass(event.target.value);
    setClassAdditional('');
  }, [setClass, setClassAdditional]);

  const handleAdditionalChange = useCallback((event) => {
    setClassAdditional(event.target.value);
  }, [setClassAdditional]);

  const additionalSelector = useMemo(() => {
    if (additionalOptions) {
      return (
        <FormControl className={ styles.field }>
          <InputLabel id="class-select-label">{ additionalKey }</InputLabel>
          <Select
            labelId="class-select-label"
            value={ classAdditionalFilter }
            onChange={ handleAdditionalChange }
            className={ styles.classFilterSelect }
          >
            <MenuItem value="">
              <em>None</em>
            </MenuItem>
            { additionalOptions.map((option) => (
              <MenuItem value={ option } key={ option }>{ option }</MenuItem>
            )) }
          </Select>
        </FormControl>
      );
    }
    return null;
  }, [additionalOptions, additionalKey, classAdditionalFilter, handleAdditionalChange]);

  return (
    <>
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
      { additionalSelector }
    </>
  );
}

const mapStateToProps = (state) => ({
  classFilter: state.filters.class,
  classAdditionalFilter: state.filters.classAdditional,
  spells: getAvailableSpells(state),
  additionalOptions: getClassAdditionalOptions(state),
  additionalKey: getClassAdditionalKey(state),
});
const mapDispatchToProps = (dispatch) => bindActionCreators({
  setClass: filtersSlice.actions.setClass,
  setClassAdditional: filtersSlice.actions.setClassAdditional,
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(ClassFilterSelector);
