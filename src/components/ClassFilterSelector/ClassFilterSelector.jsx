import React, { useCallback, useMemo, useEffect } from 'react';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { filtersSlice } from 'common/store';
import classSpells from 'content/classSpells.yaml';

import styles from './ClassFilterSelector.module.scss';

function ClassFilterSelector(props) {
  const {
    setClassSpells,
    classFilter,
    classAdditionalFilter,
    setClass,
    setClassAdditional,
  } = props;

  const additionalKey = useMemo(() => {
    if (classFilter) {
      const keys = Object.keys(classSpells[classFilter]);
      if (keys.length > 1) {
        return keys.filter((key) => key !== 'main')[0];
      }
    }
  }, [classFilter]);

  const spells = useMemo(() => {
    let result = [];
    if (classFilter) {
      result = classSpells[classFilter].main;
      if (classAdditionalFilter && additionalKey) {
        result = result.concat(classSpells[classFilter][additionalKey][classAdditionalFilter]);
      }
    }
    return result;
  }, [classFilter, classAdditionalFilter, additionalKey]);

  const additionalOptions = useMemo(() => {
    if (additionalKey) {
      return Object.keys(classSpells[classFilter][additionalKey]);
    }
  }, [classFilter, additionalKey]);

  useEffect(() => {
    setClassSpells(spells);
  }, [setClassSpells, spells]);

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
            className={ styles.select }
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
          className={ styles.select }
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
        </Select>
      </FormControl>
      { additionalSelector }
    </>
  );
}

const mapStateToProps = (state) => ({
  classFilter: state.filters.class,
  classAdditionalFilter: state.filters.classAdditional,
});
const mapDispatchToProps = (dispatch) => bindActionCreators({
  setClass: filtersSlice.actions.setClass,
  setClassAdditional: filtersSlice.actions.setClassAdditional,
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(ClassFilterSelector);
