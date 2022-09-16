import React, { FC } from 'react';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import { connect, ConnectedProps } from 'react-redux';

import {
  getSpellSaveDC, State,
} from 'common/store';

import * as styles from '../FiltersBlock.module.scss';

const SpellSaveDC: FC<ReduxProps> = (props) => {
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

const mapStateToProps = (state: State) => ({
  spellSaveDC: getSpellSaveDC(state),
});

const connector = connect(mapStateToProps);
type ReduxProps = ConnectedProps<typeof connector>;

export default connector(SpellSaveDC);
