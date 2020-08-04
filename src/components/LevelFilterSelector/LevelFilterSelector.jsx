import React from 'react';
import ButtonGroup from '@material-ui/core/ButtonGroup';

import LevelFilterButton from './LevelFilterButton';

export default function LevelFilterSelector(props) {
  const {
    levels,
  } = props;

  return (
    <ButtonGroup color="primary">
      <LevelFilterButton level={ null }/>
      { levels.map((level) => (
        <LevelFilterButton level={ level } key={ level }/>
      )) }
    </ButtonGroup>
  );
}
