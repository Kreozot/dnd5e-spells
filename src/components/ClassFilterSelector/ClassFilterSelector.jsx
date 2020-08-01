import React, { useCallback, useState, useMemo, useEffect } from 'react';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';

import classSpells from 'content/classSpells.yaml';

import styles from './ClassFilterSelector.module.scss';

export default function ClassFilterSelector(props) {
  const {
    setClassSpells,
  } = props;

  const [classFilter, setClassFilter] = useState('');

  const spells = useMemo(() => {
    if (!classFilter) {
      return [];
    }
    return classSpells[classFilter].main;
  }, [classFilter]);

  useEffect(() => {
    setClassSpells(spells);
  }, [spells]);

  const handleChange = useCallback((event) => {
    setClassFilter(event.target.value);
  }, [spells]);

  return (
    <FormControl className={ styles.container }>
      <InputLabel id="class-select-label">Class</InputLabel>
      <Select
        labelId="class-select-label"
        value={ classFilter }
        onChange={ handleChange }
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
  );
}

