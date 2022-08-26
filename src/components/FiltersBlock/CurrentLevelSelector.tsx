import React, { ChangeEvent, FC, useCallback, useState } from 'react';
import TextField from '@material-ui/core/TextField';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import debounce from 'lodash/debounce';

import { Dispatch, filtersSlice, State } from 'common/store';

import * as styles from './FiltersBlock.module.scss';
import { ActionCreatorWithPayload } from '@reduxjs/toolkit';

type Props = {
  currentLevel: number | '';
  setCurrentLevel: ActionCreatorWithPayload<number | ''>;
}

const CurrentLevelSelector: FC<Props> = (props) => {
  const {
    currentLevel,
    setCurrentLevel,
  } = props;

  const [fieldValue, setFieldValue] = useState(currentLevel);
  const setCurrentLevelDebounced = useCallback(debounce(setCurrentLevel, 500), [setCurrentLevel]);

  const handleChange = useCallback(({ target: { value } }: ChangeEvent<HTMLInputElement>) => {
    const intValue = parseInt(value);
    const newValue = isNaN(intValue) || (intValue < 1) ? '' : intValue;
    setFieldValue(newValue);
    setCurrentLevelDebounced(newValue);
  }, [setCurrentLevelDebounced]);

  return (
    <div className={ styles.field }>
      <TextField
        label="Current level"
        type="number"
        value={ fieldValue }
        onChange={ handleChange }
        className={ styles.currentLevelInput }
      />
    </div>
  );
}

const mapStateToProps = (state: State) => ({
  currentLevel: state.filters.currentLevel,
});
const mapDispatchToProps = (dispatch: Dispatch) => bindActionCreators({
  setCurrentLevel: filtersSlice.actions.setCurrentLevel,
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(CurrentLevelSelector);
