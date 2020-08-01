import React from 'react';
import ButtonGroup from '@material-ui/core/ButtonGroup';

import LevelFilterButton from './LevelFilterButton';

export default function LevelFilterSelector(props) {
  const {
    levels,
    levelFilter,
    setLevelFilter,
  } = props;

  return (
    <ButtonGroup color="primary">
      <LevelFilterButton level={ null } levelFilter={ levelFilter } setLevelFilter={ setLevelFilter }/>
      { levels.map((level) => (
        <LevelFilterButton level={ level } levelFilter={ levelFilter } setLevelFilter={ setLevelFilter }/>
      )) }
    </ButtonGroup>
  );
}

