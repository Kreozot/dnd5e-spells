import React, { useCallback, useMemo } from 'react';
import Button from '@material-ui/core/Button';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { filtersSlice, getCurrentLevelClassRestrictions } from 'common/store';
import Tooltip from 'components/Tooltip';

import styles from './LevelFilterButton.module.scss';

function LevelFilterButton(props) {
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
    if (level === null) {
      return 'All levels';
    }
    if (level === 'cantrip') {
      return 'Cantrips';
    }
    return level;
  }, [level]);

  const availableBadge = useMemo(() => {
    if (currentLevelClassRestrictions && currentLevel && level) {
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

  return (
    <Button
      onClick={ handleClick }
      variant={ level === levelFilter ? 'contained' : null }
      color="primary"
    >
      { text }
      { availableBadge }
    </Button>
  );
}

const mapStateToProps = (state) => ({
  currentLevel: state.filters.currentLevel,
  levelFilter: state.filters.level,
  currentLevelClassRestrictions: getCurrentLevelClassRestrictions(state),
 });
const mapDispatchToProps = (dispatch) => bindActionCreators({ selectLevel: filtersSlice.actions.selectLevel }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(LevelFilterButton);
