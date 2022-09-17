import React, { FC } from 'react';
import { connect, ConnectedProps } from 'react-redux';

import {
  getKnownSpellsCount, State,
} from 'common/store';

import * as styles from '../FiltersBlock.module.scss';
import { TextField } from '@mui/material';

const KnownSpellsCount: FC<ReduxProps> = (props) => {
  const {
    knownSpellsCount,
    activeSpellsCount,
  } = props;

  if (!knownSpellsCount) {
    return null;
  }

  return (
    <div className={ styles.field }>
      <TextField
        label="Known spells"
        value={ `${activeSpellsCount} / ${knownSpellsCount}` }
        className={ styles.knownSpellsCount }
        InputProps={{
          disabled: true
        }}
      />
    </div>
  );
}

const mapStateToProps = (state: State) => ({
  knownSpellsCount: getKnownSpellsCount(state),
  activeSpellsCount: state.chosenSpells.spells.length,
});

const connector = connect(mapStateToProps);
type ReduxProps = ConnectedProps<typeof connector>;

export default connector(KnownSpellsCount);
