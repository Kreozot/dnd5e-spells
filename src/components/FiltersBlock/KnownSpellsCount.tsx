import React, { FC } from 'react';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import { connect, ConnectedProps } from 'react-redux';

import {
  getKnownSpellsCount, State,
} from 'common/store';

import * as styles from './FiltersBlock.module.scss';

const KnownSpellsCount: FC<ReduxProps> = (props) => {
  const {
    knownSpellsCount,
    activeSpellsCount,
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
        value={ `${activeSpellsCount} / ${knownSpellsCount}` }
        className={ styles.knownSpellsCount }
        disabled
      />
    </FormControl>
  );
}

const mapStateToProps = (state: State) => ({
  knownSpellsCount: getKnownSpellsCount(state),
  activeSpellsCount: state.chosenSpells.spells.length,
});

const connector = connect(mapStateToProps);
type ReduxProps = ConnectedProps<typeof connector>;

export default connector(KnownSpellsCount);
