import React, {
  ChangeEvent, FC, useCallback, useState,
} from 'react';
import TextField from '@mui/material/TextField';
import { bindActionCreators } from '@reduxjs/toolkit';
import { connect, ConnectedProps } from 'react-redux';
import debounce from 'lodash/debounce';

import { Dispatch, filtersSlice, State } from 'common/store';

import * as styles from '../FiltersBlock.module.scss';

const CurrentLevelSelector: FC<ReduxProps> = (props) => {
  const {
    currentLevel,
    setCurrentLevel,
    classFilterChosen,
  } = props;

  const [fieldValue, setFieldValue] = useState(currentLevel);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const setCurrentLevelDebounced = useCallback(debounce(setCurrentLevel, 500), [setCurrentLevel]);

  const handleChange = useCallback(({ target: { value } }: ChangeEvent<HTMLInputElement>) => {
    const intValue = parseInt(value, 10);
    const newValue = !Number.isNaN(intValue) && (intValue >= 1) ? intValue : undefined;
    setFieldValue(newValue);
    setCurrentLevelDebounced(newValue);
  }, [setCurrentLevelDebounced]);

  if (!classFilterChosen) {
    return null;
  }

  return (
    <div className={styles.field}>
      <TextField
        label="Current level"
        type="number"
        value={fieldValue || ''}
        onChange={handleChange}
        className={styles.currentLevelInput}
      />
    </div>
  );
};

const mapStateToProps = (state: State) => ({
  currentLevel: state.filters.currentLevel,
  classFilterChosen: Boolean(state.filters.class),
});
const mapDispatchToProps = (dispatch: Dispatch) => bindActionCreators({
  setCurrentLevel: filtersSlice.actions.setCurrentLevel,
}, dispatch);

const connector = connect(mapStateToProps, mapDispatchToProps);
type ReduxProps = ConnectedProps<typeof connector>;

export default connector(CurrentLevelSelector);
