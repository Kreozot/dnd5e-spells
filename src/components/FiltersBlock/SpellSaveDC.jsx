import React from 'react';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import { connect } from 'react-redux';

import {
  getSpellSaveDC,
} from 'common/store';

import * as styles from './FiltersBlock.module.scss';

function SpellSaveDC(props) {
  const {
    spellSaveDC,
  } = props;

  if (!spellSaveDC) {
    return null;
  }

  return (
    <FormControl className={ styles.field }>
      <InputLabel
        id="spell-save-dc-label"
        className={ styles.knownSpellsCountLabel }
      >
        Spell save DC
      </InputLabel>
      <Input
        value={ spellSaveDC }
        className={ styles.knownSpellsCount }
        disabled
      />
    </FormControl>
  );
}

const mapStateToProps = (state) => ({
  spellSaveDC: getSpellSaveDC(state),
});

export default connect(mapStateToProps)(SpellSaveDC);
