import React, { useCallback } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Checkbox from '@material-ui/core/Checkbox';

import {
  getIsSpellActive,
  chosenSpellsSlice,
  getIsSpellAlwaysActive,
} from 'common/store';

function SpellChoose(props) {
  const {
    value,
    isSpellActive,
    toggleSpellChosen,
    isSpellAlwaysActive,
  } = props;

  const handleClick = useCallback(
    (event) => {
      event.preventDefault();
      event.stopPropagation();
      if (!isSpellAlwaysActive) {
        toggleSpellChosen({ title: value, isSpellChosen: isSpellActive });
      }
    },
    [value, isSpellActive, toggleSpellChosen, isSpellAlwaysActive]
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
});
const mapDispatchToProps = (dispatch) => bindActionCreators({
  toggleSpellChosen: chosenSpellsSlice.actions.toggleSpellChosen
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(SpellChoose);
