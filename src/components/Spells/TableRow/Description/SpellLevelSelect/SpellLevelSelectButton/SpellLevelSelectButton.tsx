import React, { FC, useCallback } from 'react';
import Button from '@mui/material/Button';
import { bindActionCreators } from '@reduxjs/toolkit';
import { connect, ConnectedProps } from 'react-redux';
import { createSelector } from 'reselect';

import {
  spellsLevelsSlice,
  State,
  Dispatch,
  getAvailableSpellLevels,
} from 'common/store';

import * as styles from './SpellLevelSelectButton.module.scss';

type Props = {
  item: Spell;
  level: number;
};

const SpellLevelSelectButton: FC<Props & ReduxProps> = (props) => {
  const {
    item,
    level,
    isSelected,
    chooseSpellLevel,
    isAvailable,
  } = props;

  const handleClick = useCallback(() => {
    chooseSpellLevel({ item, level });
  }, [chooseSpellLevel, item, level]);

  return (
    <Button
      onClick={handleClick}
      variant={isSelected ? 'contained' : undefined}
      color={isAvailable ? 'primary' : 'secondary'}
      size="small"
      className={styles.button}
    >
      { level }
    </Button>
  );
};

const isSpellLevelSelected = createSelector(
  (state: State, props: Props): boolean => {
    let selectedSpellLevel = state.spellsLevels[props.item.title];
    if (!selectedSpellLevel) {
      if (state.filters.class === 'warlock') {
        // Warlock casts always higher level, so it's chosen by default
        selectedSpellLevel = Math.max(
          ...getAvailableSpellLevels(state).filter((level): level is number => level !== 'cantrip')
        );
      } else {
        selectedSpellLevel = props.item.level as number;
      }
    }
    return selectedSpellLevel === props.level;
  },
  (isSelected): boolean => isSelected
);

const mapStateToProps = (state: State, props: Props) => ({
  isSelected: isSpellLevelSelected(state, props),
  isAvailable: getAvailableSpellLevels(state).includes(props.level),
});
const mapDispatchToProps = (dispatch: Dispatch) => bindActionCreators({
  chooseSpellLevel: spellsLevelsSlice.actions.chooseSpellLevel,
}, dispatch);

const connector = connect(mapStateToProps, mapDispatchToProps);
type ReduxProps = ConnectedProps<typeof connector>;

export default connector(SpellLevelSelectButton);
