import React, { useMemo, useState } from 'react';
import groupBy from 'lodash/groupBy';
import sortBy from 'lodash/sortBy';
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';

import data from 'content/spells.yaml';

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
    >
      { level === null ? 'All levels' : level }
    </Button>
  );
}

