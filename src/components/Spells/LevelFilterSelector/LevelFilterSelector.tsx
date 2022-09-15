import React, { FC, useEffect } from 'react';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import { connect, ConnectedProps } from 'react-redux';
import { bindActionCreators } from '@reduxjs/toolkit';

import { getKnownSpellsCount, getAvailableSpellLevels, filtersSlice, State, Dispatch } from 'common/store';

import LevelFilterButton from './LevelFilterButton';
import TitleFilterSelector from './TitleFilterSelector';
import { SpellsFilterOptions } from 'common/store/filtersSlice';

const LevelFilterSelector: FC<ReduxProps> = (props) => {
  const {
    levels,
    haveSpellsCount,
    levelFilter,
    selectLevel,
  } = props;

  // TODO: Move to redux
  useEffect(() => {
    // Turn off level filter if we don't have any spells for this level
    if (levelFilter !== SpellsFilterOptions.All
      && levelFilter !== SpellsFilterOptions.Active
      && !levels.includes(levelFilter)
    ) {
      selectLevel(SpellsFilterOptions.All);
    }
  }, [levels, levelFilter, selectLevel]);

  // TODO: Move to redux
  useEffect(() => {
    // Turn off active filter if we don't able to mark spells as active
    if (levelFilter === SpellsFilterOptions.Active && !haveSpellsCount) {
      selectLevel(SpellsFilterOptions.All);
    }
  }, [haveSpellsCount, selectLevel]);

  return (
    <ButtonGroup color="primary">
      <LevelFilterButton level={ SpellsFilterOptions.All } />
      { haveSpellsCount &&
        <LevelFilterButton level={ SpellsFilterOptions.Active } />
      }
      { levels
        .map((level) => (
          <LevelFilterButton level={ level } key={ level } />
        ))
      }
      <TitleFilterSelector />
    </ButtonGroup>
  );
}

const mapStateToProps = (state: State) => ({
  haveSpellsCount: Boolean(getKnownSpellsCount(state)),
  levels: getAvailableSpellLevels(state),
  levelFilter: state.filters.spellsFilter,
});
const mapDispatchToProps = (dispatch: Dispatch) => bindActionCreators({
  selectLevel: filtersSlice.actions.setSpellsFilter
}, dispatch);

const connector = connect(mapStateToProps, mapDispatchToProps);
type ReduxProps = ConnectedProps<typeof connector>;

export default connector(LevelFilterSelector);
