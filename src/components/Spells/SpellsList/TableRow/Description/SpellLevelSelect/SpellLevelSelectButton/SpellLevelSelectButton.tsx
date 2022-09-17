import React, { FC, useCallback } from 'react';
import Button from '@mui/material/Button';
import { bindActionCreators } from 'redux';
import { connect, ConnectedProps } from 'react-redux';
import { createSelector } from 'reselect';

import { spellsLevelsSlice, State, Dispatch } from 'common/store';

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
  } = props;

  const handleClick = useCallback(() => {
    chooseSpellLevel({ item, level });
  }, [chooseSpellLevel, item, level]);

  return (
    <Button
      onClick={ handleClick }
      variant={ isSelected ? 'contained' : undefined }
      color="primary"
      size="small"
      className={ styles.button }
    >
      { level }
    </Button>
  );
}

const isSpellLevelSelected = createSelector(
  (state: State, props: Props): boolean => {
    const selectedSpellLevel = state.spellsLevels[props.item.title] || props.item.level;
    return selectedSpellLevel === props.level;
  },
  (isSelected): boolean => isSelected,
);

const mapStateToProps = (state: State, props: Props) => ({
  isSelected: isSpellLevelSelected(state, props),
});
const mapDispatchToProps = (dispatch: Dispatch) => bindActionCreators({
  chooseSpellLevel: spellsLevelsSlice.actions.chooseSpellLevel,
}, dispatch);

const connector = connect(mapStateToProps, mapDispatchToProps);
type ReduxProps = ConnectedProps<typeof connector>;

export default connector(SpellLevelSelectButton);
