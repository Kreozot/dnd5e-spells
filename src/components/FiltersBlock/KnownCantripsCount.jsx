import React from 'react';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import { connect } from 'react-redux';

import {
  getKnownCantripsCount,
} from 'common/store';

import * as styles from './FiltersBlock.module.scss';

function KnownCantripsCount(props) {
  const {
    knownCantripsCount,
    activeCantripsCount,
  } = props;

  if (!knownCantripsCount) {
    return null;
  }

  return (
    <FormControl className={ styles.field }>
      <InputLabel
        id="known-cantrips-count-label"
        className={ styles.knownSpellsCountLabel }
      >
        Known cantrips
      </InputLabel>
      <Input
        value={ `${activeCantripsCount} / ${knownCantripsCount}` }
        className={ styles.knownSpellsCount }
        disabled
      />
    </FormControl>
  );
}

const mapStateToProps = (state) => ({
  knownCantripsCount: getKnownCantripsCount(state),
  activeCantripsCount: state.chosenSpells.cantrips.length,
});

export default connect(mapStateToProps)(KnownCantripsCount);
