import React, { FC, useCallback, useMemo } from 'react';
import Button from '@material-ui/core/Button';
import { bindActionCreators } from 'redux';
import { connect, ConnectedProps } from 'react-redux';

import { Dispatch, filtersSlice, getCurrentLevelClassRestrictions, State } from 'common/store';
import Tooltip from 'components/Tooltip';

import * as styles from './LevelFilterButton.module.scss';

type Props = {
  level: null | number | 'active' | 'cantrip';
};

const LevelFilterButton: FC<Props & ReduxProps> = (props) => {
  const {
    level,
    levelFilter,
    activeFilter,
    selectLevel,
    setActiveFilterOn,
    currentLevel,
    currentLevelClassRestrictions,
  } = props;

  const handleClick = useCallback(() => {
    if (level === 'active') {
      setActiveFilterOn();
    } else {
      selectLevel(level as any);
    }
  }, [level, selectLevel, setActiveFilterOn]);

  const text = useMemo(() => {
    if (level === null) {
      return 'All levels';
    }
    if (level === 'active') {
      return 'Active';
    }
    if (level === 'cantrip') {
      return 'Cantrips';
    }
    return level;
  }, [level]);

  const availableBadge = useMemo(() => {
    if (currentLevelClassRestrictions && currentLevel && level && (level !== 'active')) {
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
    if (level === 'active') {
      return activeFilter;
    }
    if (level === levelFilter) {
      return !activeFilter;
    }
  }, [activeFilter, level, levelFilter]);

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
  levelFilter: state.filters.level,
  activeFilter: state.filters.activeFilter,
  currentLevelClassRestrictions: getCurrentLevelClassRestrictions(state),
});
const mapDispatchToProps = (dispatch: Dispatch) => bindActionCreators({
  selectLevel: filtersSlice.actions.selectLevel,
  setActiveFilterOn: filtersSlice.actions.setActiveFilterOn,
}, dispatch);

const connector = connect(mapStateToProps, mapDispatchToProps);
type ReduxProps = ConnectedProps<typeof connector>;

export default connector(LevelFilterButton);
