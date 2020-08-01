import React from 'react';
import Button from '@material-ui/core/Button';

export default function LevelFilterButton(props) {
  const {
    level,
    levelFilter,
    setLevelFilter,
  } = props;

  return (
    <Button
      onClick={ () => setLevelFilter(level) }
      variant={ level === levelFilter ? 'contained' : null }
      color="primary"
    >
      { level === null ? 'All levels' : level }
    </Button>
  );
}

