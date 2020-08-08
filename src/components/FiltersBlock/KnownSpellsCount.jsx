import React from 'react';
import Input  from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import { connect } from 'react-redux';

import {
  getKnownSpellsCount,
} from 'common/store';

import styles from './FiltersBlock.module.scss';

function KnownSpellsCount(props) {
  const {
    knownSpellsCount,
  } = props;

  if (!knownSpellsCount) {
    return null;
  }

  return (
    <FormControl className={ styles.field }>
      <InputLabel
        id="known-spells-count-label"
        className={ styles.knownSpellsCountLabel }
      >
        Known spells
      </InputLabel>
      <Input
        type="number"
        value={ knownSpellsCount }
        className={ styles.knownSpellsCount }
        disabled
      />
    </FormControl>
  );
}

const mapStateToProps = (state) => ({
  knownSpellsCount: getKnownSpellsCount(state),
});

export default connect(mapStateToProps)(KnownSpellsCount);
