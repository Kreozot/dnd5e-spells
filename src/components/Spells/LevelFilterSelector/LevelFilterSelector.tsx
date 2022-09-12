import React, { FC, useEffect } from 'react';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import { connect, ConnectedProps } from 'react-redux';
import { bindActionCreators } from '@reduxjs/toolkit';

import { getKnownSpellsCount, getAvailableSpellLevels, filtersSlice, State, Dispatch } from 'common/store';

import LevelFilterButton from './LevelFilterButton';
import TitleFilterSelector from './TitleFilterSelector';

const LevelFilterSelector: FC<ReduxProps> = (props) => {
  const {
    levels,
    haveSpellsCount,
    levelFilter,
    activeFilter,
    selectLevel,
  } = props;


  useEffect(() => {
    // Turn off level filter if we don't have any spells for this level
    if (levelFilter && !levels.includes(levelFilter)) {
      selectLevel(null);
    }
  }, [levels, levelFilter, selectLevel]);

  useEffect(() => {
    // Turn off active filter if we don't able to mark spells as active
    if (activeFilter && !haveSpellsCount) {
      selectLevel(null);
    }
  }, [haveSpellsCount, activeFilter, selectLevel]);

  return (
    <ButtonGroup color="primary">
      <LevelFilterButton level={ null } />
      { haveSpellsCount &&
        <LevelFilterButton level={ 'active' } />
      }
      { levels.map((level) => (
        <LevelFilterButton level={ level } key={ level } />
      )) }
      <TitleFilterSelector />
    </ButtonGroup>
  );
}

const mapStateToProps = (state: State) => ({
  haveSpellsCount: Boolean(getKnownSpellsCount(state)),
  levels: getAvailableSpellLevels(state),
  levelFilter: state.filters.level,
  activeFilter: state.filters.activeFilter,
});
const mapDispatchToProps = (dispatch: Dispatch) => bindActionCreators({
  selectLevel: filtersSlice.actions.selectLevel
}, dispatch);

const connector = connect(mapStateToProps, mapDispatchToProps);
type ReduxProps = ConnectedProps<typeof connector>;

export default connector(LevelFilterSelector);
