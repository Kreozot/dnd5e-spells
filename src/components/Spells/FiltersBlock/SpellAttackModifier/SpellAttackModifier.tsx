import React, { FC } from 'react';
import { connect, ConnectedProps } from 'react-redux';

import {
  getSpellAttackModifier, State,
} from 'common/store';

import { TextField } from '@mui/material';
import * as styles from '../FiltersBlock.module.scss';

const SpellAttackModifier: FC<ReduxProps> = (props) => {
  const {
    spellAttackModifier,
  } = props;

  if (!spellAttackModifier) {
    return null;
  }

  return (
    <div className={styles.field}>
      <TextField
        label="Spell attack modifier"
        value={spellAttackModifier}
        className={styles.spellAttackModifier}
        InputProps={{
          disabled: true,
        }}
      />
    </div>
  );
};

const mapStateToProps = (state: State) => ({
  spellAttackModifier: getSpellAttackModifier(state),
});

const connector = connect(mapStateToProps);
type ReduxProps = ConnectedProps<typeof connector>;

export default connector(SpellAttackModifier);
