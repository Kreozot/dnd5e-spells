import React, { useCallback, useState, useEffect, useMemo, FC, MouseEventHandler } from 'react';
import { connect, ConnectedProps } from 'react-redux';
import { bindActionCreators } from 'redux';
import Checkbox from '@material-ui/core/Checkbox';
import { Tooltip } from 'react-tippy';
import { CellProps } from 'react-table';

import {
  getIsSpellActive,
  chosenSpellsSlice,
  getIsSpellAlwaysActive,
  getCanChooseMoreSpells,
  getCanChooseMoreCantrips,
  State,
  Dispatch,
  getKnownSpellsCount,
} from 'common/store';

type Props = CellProps<Spell>;

const SpellChoose: FC<Props & ReduxProps> = (props) => {
  const {
    value,
    row, // TODO: handle cantrips with different logic
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
    if (row.original.level === 'cantrip') {
      if (isSpellActive || canChooseMoreCantrips) {
        toggleCantripChosen({ title: value, isCantripChosen: isSpellActive });
      } else {
        setIsHintOpen(true);
      }
    } else {
      if (isSpellActive || canChooseMoreSpells) {
        toggleSpellChosen({ title: value, isSpellChosen: isSpellActive });
      } else {
        setIsHintOpen(true);
      }
    }
  }, [value, isSpellActive, toggleSpellChosen, toggleCantripChosen, canChooseMoreSpells, canChooseMoreCantrips, row.original.level]);

  const handleRequestClose = useCallback(() => {
    setIsHintOpen(false);
  }, []);

  useEffect(() => {
    setTimeout(() => {
      setIsHintOpen(false);
    }, 5000);
  }, [isHintOpen]);

  const hintTitle = useMemo(() => {
    return row.original.level === 'cantrip'
      ? 'You have reached your known cantrips maximum'
      : 'You have reached your known spells maximum';
  }, [row.original.level]);

  if (!haveSpellsCount) {
    return null;
  }

  return (
    <Tooltip
      title={ hintTitle }
      position="right"
      trigger="manual"
      open={ isHintOpen }
      onRequestClose={ handleRequestClose }
    >
      <Checkbox
        color="primary"
        checked={ isSpellActive }
        onClick={ handleClick }
        disabled={ isSpellAlwaysActive }
      />
    </Tooltip>
  )
}

const mapStateToProps = (state: State, props: CellProps<Spell>) => ({
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
