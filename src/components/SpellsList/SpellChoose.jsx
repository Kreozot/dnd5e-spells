import React, { useCallback } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Checkbox from '@material-ui/core/Checkbox';

import {
  getIsSpellActive,
  chosenSpellsSlice,
  getIsSpellAlwaysActive,
  getCanChooseMoreSpells,
} from 'common/store';

function SpellChoose(props) {
  const {
    value,
    row, // TODO: handle cantrips with different logic
    isSpellActive,
    toggleSpellChosen,
    isSpellAlwaysActive,
    canChooseMoreSpells,
  } = props;

  const handleClick = useCallback(
    (event) => {
      event.preventDefault();
      event.stopPropagation();
      if (isSpellActive || canChooseMoreSpells) {
        toggleSpellChosen({ title: value, isSpellChosen: isSpellActive });
      }
      // TODO: Show hint about why you can't choose more spells
    },
    [value, isSpellActive, toggleSpellChosen, canChooseMoreSpells]
  );

  return (
    <Checkbox
      checked={ isSpellActive }
      onClick={ handleClick }
      disabled={ isSpellAlwaysActive }
    />
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
