import React, { useCallback } from 'react';
import Button from '@material-ui/core/Button';

export default function LevelFilterButton(props) {
  const {
    level,
    levelFilter,
    setLevelFilter,
  } = props;

  const handleClick = useCallback(() => setLevelFilter(level), [level, setLevelFilter]);

  return (
    <Button
      onClick={ handleClick }
      variant={ level === levelFilter ? 'contained' : null }
      color="primary"
    >
      { level === null ? 'All levels' : level }
    </Button>
  );
}

