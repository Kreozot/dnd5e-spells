import React, {
  useCallback, useState, useEffect, useMemo, FC, MouseEventHandler,
} from 'react';
import { connect, ConnectedProps } from 'react-redux';
import Checkbox from '@mui/material/Checkbox';
import Tooltip from '@mui/material/Tooltip';
import { createSelector } from 'reselect';
import { bindActionCreators } from '@reduxjs/toolkit';

import {
  chosenSpellsSlice,
  getCanChooseMoreSpells,
  getCanChooseMoreCantrips,
  State,
  Dispatch,
  getKnownSpellsCount,
  getAllActiveSpells,
  getAdditionalClassSpells,
} from 'common/store';

type Props = {
  spell: Spell;
};

const SpellChoose: FC<Props & ReduxProps> = (props) => {
  const {
    spell, // TODO: handle cantrips with different logic
    isSpellActive,
    toggleSpellChosen,
    toggleCantripChosen,
    isSpellAlwaysActive,
    canChooseMoreSpells,
    canChooseMoreCantrips,
    haveSpellsCount,
  } = props;

  const [isHintOpen, setIsHintOpen] = useState(false);

  const handleClick = useCallback<MouseEventHandler<HTMLButtonElement>>((event) => {
    event.preventDefault();
    event.stopPropagation();
    if (spell.level === 'cantrip') {
      if (isSpellActive || canChooseMoreCantrips) {
        toggleCantripChosen({ title: spell.title, isCantripChosen: isSpellActive });
      } else {
        setIsHintOpen(true);
      }
    } else if (isSpellActive || canChooseMoreSpells) {
      toggleSpellChosen({ title: spell.title, isSpellChosen: isSpellActive });
    } else {
      setIsHintOpen(true);
    }
  }, [
    spell.title,
    isSpellActive,
    toggleSpellChosen,
    toggleCantripChosen,
    canChooseMoreSpells,
    canChooseMoreCantrips,
    spell.level
  ]);

  const handleRequestClose = useCallback(() => {
    setIsHintOpen(false);
  }, []);

  useEffect(() => {
    setTimeout(() => {
      setIsHintOpen(false);
    }, 5000);
  }, [isHintOpen]);

  const hintTitle = useMemo(() => {
    return spell.level === 'cantrip'
      ? 'You have reached your known cantrips maximum'
      : 'You have reached your known spells maximum';
  }, [spell.level]);

  if (!haveSpellsCount) {
    return null;
  }

  return (
    <Tooltip
      title={hintTitle}
      placement="right"
      open={isHintOpen}
      onClose={handleRequestClose}
    >
      <Checkbox
        color="primary"
        checked={isSpellActive}
        onClick={handleClick}
        disabled={isSpellAlwaysActive}
      />
    </Tooltip>
  );
};

/** Is the spell is always active because of class additional option value */
const getIsSpellAlwaysActive = createSelector(
  (state: State, props: Props) => {
    const additionalClassSpells: string[] | undefined = getAdditionalClassSpells(state);
    if (additionalClassSpells) {
      return additionalClassSpells.some((title) => props.spell.title.toLowerCase() === title.toLowerCase());
    }
    return false;
  },
  (isAlwaysActive) => isAlwaysActive
);

/** Is the spell active for use */
const getIsSpellActive = createSelector(
  (state: State, props: Props) => getAllActiveSpells(state)
    .some((title) => props.spell.title.toLowerCase() === title.toLowerCase()),
  (isActive) => isActive
);

const mapStateToProps = (state: State, props: Props) => ({
  isSpellActive: getIsSpellActive(state, props),
  isSpellAlwaysActive: getIsSpellAlwaysActive(state, props),
  canChooseMoreSpells: getCanChooseMoreSpells(state),
  canChooseMoreCantrips: getCanChooseMoreCantrips(state),
  haveSpellsCount: Boolean(getKnownSpellsCount(state)),
});
const mapDispatchToProps = (dispatch: Dispatch) => bindActionCreators({
  toggleSpellChosen: chosenSpellsSlice.actions.toggleSpellChosen,
  toggleCantripChosen: chosenSpellsSlice.actions.toggleCantripChosen,
}, dispatch);

const connector = connect(mapStateToProps, mapDispatchToProps);
type ReduxProps = ConnectedProps<typeof connector>;

export default connector(SpellChoose);
