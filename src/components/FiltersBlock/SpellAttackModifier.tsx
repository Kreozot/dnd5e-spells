import React, { FC } from 'react';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import { connect, ConnectedProps } from 'react-redux';

import {
  getSpellAttackModifier, State,
} from 'common/store';

import * as styles from './FiltersBlock.module.scss';

const SpellAttackModifier: FC<ReduxProps> = (props) => {
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

const mapStateToProps = (state: State) => ({
  spellAttackModifier: getSpellAttackModifier(state),
});

const connector = connect(mapStateToProps);
type ReduxProps = ConnectedProps<typeof connector>;

export default connector(SpellAttackModifier);
