import React, { FC } from 'react';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import { connect, ConnectedProps } from 'react-redux';

import {
  getKnownCantripsCount, State,
} from 'common/store';

import * as styles from './FiltersBlock.module.scss';

const KnownCantripsCount: FC<ReduxProps> = (props) => {
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

const mapStateToProps = (state: State) => ({
  knownCantripsCount: getKnownCantripsCount(state),
  activeCantripsCount: state.chosenSpells.cantrips.length,
});

const connector = connect(mapStateToProps);
type ReduxProps = ConnectedProps<typeof connector>;

export default connector(KnownCantripsCount);
