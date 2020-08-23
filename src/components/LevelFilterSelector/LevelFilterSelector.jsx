import React, { useEffect } from 'react';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import { connect } from 'react-redux';

import { getKnownSpellsCount, getAvailableSpellLevels, filtersSlice } from 'common/store';

import LevelFilterButton from './LevelFilterButton';
import TitleFilterSelector from './TitleFilterSelector';
import { bindActionCreators } from '@reduxjs/toolkit';

function LevelFilterSelector(props) {
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
      <LevelFilterButton level={ null }/>
      { haveSpellsCount &&
        <LevelFilterButton level={ 'active' }/>
      }
      { levels.map((level) => (
        <LevelFilterButton level={ level } key={ level }/>
      )) }
      <TitleFilterSelector/>
    </ButtonGroup>
  );
}

const mapStateToProps = (state) => ({
  haveSpellsCount: Boolean(getKnownSpellsCount(state)),
  levels: getAvailableSpellLevels(state),
  levelFilter: state.filters.level,
  activeFilter: state.filters.activeFilter,
});
const mapDispatchToProps = (dispatch) => bindActionCreators({
  selectLevel: filtersSlice.actions.selectLevel
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(LevelFilterSelector);
