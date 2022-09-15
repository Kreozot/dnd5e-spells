import React, { FC, useCallback, useMemo } from 'react';
import Button from '@material-ui/core/Button';
import { bindActionCreators } from 'redux';
import { connect, ConnectedProps } from 'react-redux';

import { Dispatch, filtersSlice, getCurrentLevelClassRestrictions, State } from 'common/store';
import Tooltip from 'components/Tooltip';

import * as styles from './LevelFilterButton.module.scss';
import { SpellsFilter, SpellsFilterOptions } from 'common/store/filtersSlice';

const levelLabels = {
  [SpellsFilterOptions.All]: 'All levels',
  [SpellsFilterOptions.Active]: 'Active',
  'cantrip': 'Cantrips',
};

type Props = {
  level: SpellsFilter;
};

const LevelFilterButton: FC<Props & ReduxProps> = (props) => {
  const {
    level,
    levelFilter,
    selectLevel,
    currentLevel,
    currentLevelClassRestrictions,
  } = props;

  const handleClick = useCallback(() => {
    selectLevel(level);
  }, [level, selectLevel]);

  const text = useMemo(() => {
    return levelLabels[level as (SpellsFilterOptions | 'cantrip')] || level;
  }, [level]);

  const availableBadge = useMemo(() => {
    if (currentLevelClassRestrictions
      && currentLevel
      && (level !== SpellsFilterOptions.All)
      && (level !== SpellsFilterOptions.Active)
    ) {
      const value = level === 'cantrip'
        ? currentLevelClassRestrictions.cantrips
        : currentLevelClassRestrictions.spellSlots[level - 1];
      return (
        <div className={ styles.spellSlotsBadgeWrapper }>
          <Tooltip text="Spells slots available on current level">
            <div className={ styles.spellSlotsBadge }>
              { value }
            </div>
          </Tooltip>
        </div>
      )
    }
    return null;
  }, [currentLevelClassRestrictions, level, currentLevel]);

  const isSelected = useMemo(() => {
    return level === levelFilter;
  }, [level, levelFilter]);

  return (
    <Button
      onClick={ handleClick }
      variant={ isSelected ? 'contained' : undefined }
      color="primary"
    >
      { text }
      { availableBadge }
    </Button>
  );
}

const mapStateToProps = (state: State) => ({
  currentLevel: state.filters.currentLevel,
  levelFilter: state.filters.spellsFilter,
  currentLevelClassRestrictions: getCurrentLevelClassRestrictions(state),
});
const mapDispatchToProps = (dispatch: Dispatch) => bindActionCreators({
  selectLevel: filtersSlice.actions.setSpellsFilter,
}, dispatch);

const connector = connect(mapStateToProps, mapDispatchToProps);
type ReduxProps = ConnectedProps<typeof connector>;

export default connector(LevelFilterButton);
