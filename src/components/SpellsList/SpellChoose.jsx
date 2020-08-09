import React, { useCallback, useState, useEffect, useMemo } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Checkbox from '@material-ui/core/Checkbox';
import { Tooltip } from 'react-tippy';

import {
  getIsSpellActive,
  chosenSpellsSlice,
  getIsSpellAlwaysActive,
  getCanChooseMoreSpells,
  getCanChooseMoreCantrips,
} from 'common/store';

function SpellChoose(props) {
  const {
    value,
    row, // TODO: handle cantrips with different logic
    isSpellActive,
    toggleSpellChosen,
    toggleCantripChosen,
    isSpellAlwaysActive,
    canChooseMoreSpells,
    canChooseMoreCantrips,
  } = props;

  const [isHintOpen, setIsHintOpen] = useState(false);

  const handleClick = useCallback((event) => {
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

const mapStateToProps = (state, props) => ({
  isSpellActive: getIsSpellActive(state, props),
  isSpellAlwaysActive: getIsSpellAlwaysActive(state, props),
  canChooseMoreSpells: getCanChooseMoreSpells(state),
  canChooseMoreCantrips: getCanChooseMoreCantrips(state),
});
const mapDispatchToProps = (dispatch) => bindActionCreators({
  toggleSpellChosen: chosenSpellsSlice.actions.toggleSpellChosen,
  toggleCantripChosen: chosenSpellsSlice.actions.toggleCantripChosen,
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(SpellChoose);
