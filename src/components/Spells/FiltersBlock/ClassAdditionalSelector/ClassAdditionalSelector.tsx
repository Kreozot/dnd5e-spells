import React, { FC, useCallback } from 'react';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import { bindActionCreators } from '@reduxjs/toolkit';
import { connect, ConnectedProps } from 'react-redux';

import {
  filtersSlice, getClassAdditionalOptions, getClassAdditionalKey, State, Dispatch,
} from 'common/store';

import * as styles from '../FiltersBlock.module.scss';

const ClassAdditionalSelector: FC<ReduxProps> = (props) => {
  const {
    classAdditionalFilter,
    setClassAdditional,
    additionalOptions,
    additionalKey,
  } = props;

  const handleAdditionalChange = useCallback((event: SelectChangeEvent<string>) => {
    setClassAdditional(event.target.value || undefined);
  }, [setClassAdditional]);

  if (additionalOptions) {
    return (
      <FormControl className={styles.field}>
        <InputLabel id="class-select-label">{ additionalKey }</InputLabel>
        <Select
          labelId="class-select-label"
          value={classAdditionalFilter || ''}
          onChange={handleAdditionalChange}
          label={additionalKey}
          className={styles.classFilterSelect}
        >
          <MenuItem value="">
            <em>None</em>
          </MenuItem>
          { additionalOptions.map((option) => (
            <MenuItem value={option} key={option}>{ option }</MenuItem>
          )) }
        </Select>
      </FormControl>
    );
  }
  return null;
};

const mapStateToProps = (state: State) => ({
  classAdditionalFilter: state.filters.classAdditional,
  additionalOptions: getClassAdditionalOptions(state),
  additionalKey: getClassAdditionalKey(state),
});
const mapDispatchToProps = (dispatch: Dispatch) => bindActionCreators({
  setClassAdditional: filtersSlice.actions.setClassAdditional,
}, dispatch);

const connector = connect(mapStateToProps, mapDispatchToProps);
type ReduxProps = ConnectedProps<typeof connector>;

export default connector(ClassAdditionalSelector);
