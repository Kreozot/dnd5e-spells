import React, { useCallback, useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Checkbox from '@material-ui/core/Checkbox';
import { Tooltip } from 'react-tippy';

import {
  getIsSpellActive,
  chosenSpellsSlice,
  getIsSpellAlwaysActive,
  getCanChooseMoreSpells,
} from 'common/store';

import styles from './SpellChoose.module.scss';

function SpellChoose(props) {
  const {
    value,
    row, // TODO: handle cantrips with different logic
    isSpellActive,
    toggleSpellChosen,
    isSpellAlwaysActive,
    canChooseMoreSpells,
  } = props;

  const [isHintOpen, setIsHintOpen] = useState(false);

  const handleClick = useCallback((event) => {
    event.preventDefault();
    event.stopPropagation();
    if (isSpellActive || canChooseMoreSpells) {
      toggleSpellChosen({ title: value, isSpellChosen: isSpellActive });
    } else {
      setIsHintOpen(true);
    }
  }, [value, isSpellActive, toggleSpellChosen, canChooseMoreSpells]);

  const handleRequestClose = useCallback(() => {
    setIsHintOpen(false);
  }, []);

  useEffect(() => {
    setTimeout(() => {
      setIsHintOpen(false);
    }, 5000);
  }, [isHintOpen]);

  return (
    <Tooltip
      title="You have reached your known spells maximum"
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
        className={ styles.checkbox }
      />
    </Tooltip>
  )
}

const mapStateToProps = (state, props) => ({
  isSpellActive: getIsSpellActive(state, props),
  isSpellAlwaysActive: getIsSpellAlwaysActive(state, props),
  canChooseMoreSpells: getCanChooseMoreSpells(state),
});
const mapDispatchToProps = (dispatch) => bindActionCreators({
  toggleSpellChosen: chosenSpellsSlice.actions.toggleSpellChosen
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(SpellChoose);
