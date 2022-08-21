import React from 'react';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import { connect } from 'react-redux';

import {
  getSpellAttackModifier,
} from 'common/store';

import * as styles from './FiltersBlock.module.scss';

function SpellAttackModifier(props) {
  const {
    spellAttackModifier,
  } = props;

  if (!spellAttackModifier) {
    return null;
  }

  return (
    <FormControl className={ styles.field }>
      <InputLabel
        id="spell-attack-modifier-label"
        className={ styles.knownSpellsCountLabel }
      >
        Spell attack modifier
      </InputLabel>
      <Input
        value={ spellAttackModifier }
        className={ styles.knownSpellsCount }
        disabled
      />
    </FormControl>
  );
}

const mapStateToProps = (state) => ({
  spellAttackModifier: getSpellAttackModifier(state),
});

export default connect(mapStateToProps)(SpellAttackModifier);
