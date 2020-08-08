import React, { useCallback } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Checkbox from '@material-ui/core/Checkbox';

import {
  getIsSpellChosen,
  chosenSpellsSlice,
} from 'common/store';

import styles from './SpellsList.module.scss';

function SpellChoose(props) {
  const { title, isSpellChosen, toggleSpellChosen } = props;

  const handleClick = useCallback(
    (event) => {
      event.preventDefault();
      event.stopPropagation();
      toggleSpellChosen({ title, isSpellChosen });
    },
    [title, isSpellChosen, toggleSpellChosen]
  );

  return (
    <Checkbox
      checked={ isSpellChosen }
      onClick={ handleClick }
    />
  )
}

const mapStateToProps = (state, props) => ({
  isSpellChosen: getIsSpellChosen(state, props),
});
const mapDispatchToProps = (dispatch) => bindActionCreators({
  toggleSpellChosen: chosenSpellsSlice.actions.toggleSpellChosen
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(SpellChoose);
