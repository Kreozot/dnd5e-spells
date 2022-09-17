import React, { FC } from 'react';
import { connect, ConnectedProps } from 'react-redux';

import {
  getKnownCantripsCount, State,
} from 'common/store';

import { TextField } from '@mui/material';
import * as styles from '../FiltersBlock.module.scss';

const KnownCantripsCount: FC<ReduxProps> = (props) => {
  const {
    knownCantripsCount,
    activeCantripsCount,
  } = props;

  if (!knownCantripsCount) {
    return null;
  }

  return (
    <div className={styles.field}>
      <TextField
        label="Known cantrips"
        value={`${activeCantripsCount} / ${knownCantripsCount}`}
        className={styles.knownCantripsCount}
        InputProps={{
          disabled: true,
        }}
      />
    </div>
  );
};

const mapStateToProps = (state: State) => ({
  knownCantripsCount: getKnownCantripsCount(state),
  activeCantripsCount: state.chosenSpells.cantrips.length,
});

const connector = connect(mapStateToProps);
type ReduxProps = ConnectedProps<typeof connector>;

export default connector(KnownCantripsCount);
