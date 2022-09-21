import React, { FC, useCallback, useMemo } from 'react';
import Button from '@mui/material/Button';
import { bindActionCreators } from '@reduxjs/toolkit';
import { connect, ConnectedProps } from 'react-redux';

import {
  Dispatch, filtersSlice, State,
} from 'common/store';

import { SpellsFilter, SpellsFilterOptions } from 'common/store/filtersSlice';

const levelLabels = {
  [SpellsFilterOptions.All]: 'All levels',
  [SpellsFilterOptions.Active]: 'Active',
  cantrip: 'Cantrips',
};

type Props = {
  level: SpellsFilter;
};

const LevelFilterButton: FC<Props & ReduxProps> = (props) => {
  const {
    level,
    levelFilter,
    selectLevel,
  } = props;

  const handleClick = useCallback(() => {
    selectLevel(level);
  }, [level, selectLevel]);

  const text = useMemo(() => {
    return levelLabels[level as (SpellsFilterOptions | 'cantrip')] || level;
  }, [level]);

  const isSelected = useMemo(() => {
    return level === levelFilter;
  }, [level, levelFilter]);

  return (
    <Button
      onClick={handleClick}
      variant={isSelected ? 'contained' : undefined}
      color="primary"
    >
      { text }
    </Button>
  );
};

const mapStateToProps = (state: State) => ({
  levelFilter: state.filters.spellsFilter,
});
const mapDispatchToProps = (dispatch: Dispatch) => bindActionCreators({
  selectLevel: filtersSlice.actions.setSpellsFilter,
}, dispatch);

const connector = connect(mapStateToProps, mapDispatchToProps);
type ReduxProps = ConnectedProps<typeof connector>;

export default connector(LevelFilterButton);
