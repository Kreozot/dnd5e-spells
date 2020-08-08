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
    isSpellActive,
    toggleSpellChosen,
    isSpellAlwaysActive,
    canChooseMoreSpells,
  } = props;

  const handleClick = useCallback(
    (event) => {
      event.preventDefault();
      event.stopPropagation();
      if (!isSpellAlwaysActive) {
        if (isSpellActive || canChooseMoreSpells) {
          toggleSpellChosen({ title: value, isSpellChosen: isSpellActive });
        }
      }
    },
    [value, isSpellActive, toggleSpellChosen, isSpellAlwaysActive, canChooseMoreSpells]
  );

  return (
    <Checkbox
      checked={ isSpellActive }
      onClick={ handleClick }
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
