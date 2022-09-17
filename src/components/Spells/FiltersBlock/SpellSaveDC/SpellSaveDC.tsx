import React, { FC } from 'react';
import { connect, ConnectedProps } from 'react-redux';

import {
  getSpellSaveDC, State,
} from 'common/store';

import { TextField } from '@mui/material';
import * as styles from '../FiltersBlock.module.scss';

const SpellSaveDC: FC<ReduxProps> = (props) => {
  const {
    spellSaveDC,
  } = props;

  if (!spellSaveDC) {
    return null;
  }

  return (
    <div className={styles.field}>
      <TextField
        label="Spell save DC"
        value={spellSaveDC}
        className={styles.spellSaveDC}
        InputProps={{
          disabled: true,
        }}
      />
    </div>
  );
};

const mapStateToProps = (state: State) => ({
  spellSaveDC: getSpellSaveDC(state),
});

const connector = connect(mapStateToProps);
type ReduxProps = ConnectedProps<typeof connector>;

export default connector(SpellSaveDC);
