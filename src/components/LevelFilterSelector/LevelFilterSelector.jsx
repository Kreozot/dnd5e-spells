import React, { useMemo, useState } from 'react';
import groupBy from 'lodash/groupBy';
import sortBy from 'lodash/sortBy';
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';

import data from 'content/spells.yaml';
import LevelFilterButton from './LevelFilterButton';

export default function LevelFilterSelector(props) {
  const {
    levels,
    levelFilter,
    setLevelFilter,
  } = props;

  return (
    <ButtonGroup color="primary" aria-label="outlined primary button group">
      <LevelFilterButton level={ null } levelFilter={ levelFilter } setLevelFilter={ setLevelFilter }/>
      { levels.map((level) => (
        <LevelFilterButton level={ level } levelFilter={ levelFilter } setLevelFilter={ setLevelFilter }/>
      )) }
    </ButtonGroup>
  );
}

