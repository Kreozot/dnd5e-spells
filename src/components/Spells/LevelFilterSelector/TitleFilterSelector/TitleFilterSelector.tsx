import React, {
  useCallback, useState, useEffect, FC, ChangeEventHandler,
} from 'react';
import Input from '@mui/material/Input';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import { bindActionCreators } from '@reduxjs/toolkit';
import { connect, ConnectedProps } from 'react-redux';
import InputAdornment from '@mui/material/InputAdornment';
import debounce from 'lodash/debounce';

import {
  Dispatch,
  filtersSlice, State,
} from 'common/store';

import FilterIcon from 'images/icon-filter.svg';
import * as styles from './TitleFilterSelector.module.scss';

const TitleFilterSelector: FC<ReduxProps> = (props) => {
  const {
    titleFilter,
    setTitleFilter,
  } = props;

  const [fieldValue, setFieldValue] = useState(titleFilter);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const setTitleFilterDebounced = useCallback(debounce(setTitleFilter, 500), [setTitleFilter]);

  const handleChange = useCallback<ChangeEventHandler<HTMLInputElement>>(({ target: { value } }) => {
    setFieldValue(value.toLowerCase());
    setTitleFilterDebounced(value.toLowerCase());
  }, [setFieldValue, setTitleFilterDebounced]);

  useEffect(() => {
    setFieldValue(titleFilter);
  }, [titleFilter]);

  return (
    <FormControl className={styles.container}>
      <InputLabel id="title-filter-label">Search</InputLabel>
      <Input
        value={fieldValue}
        onChange={handleChange}
        className={styles.input}
        endAdornment={(
          <InputAdornment position="end">
            <div className={styles.icon}>
              <FilterIcon />
            </div>
          </InputAdornment>
        )}
      />
    </FormControl>
  );
};

const mapStateToProps = (state: State) => ({
  titleFilter: state.filters.titleFilter,
});
const mapDispatchToProps = (dispatch: Dispatch) => bindActionCreators({
  setTitleFilter: filtersSlice.actions.setTitleFilter,
}, dispatch);

const connector = connect(mapStateToProps, mapDispatchToProps);
type ReduxProps = ConnectedProps<typeof connector>;

export default connector(TitleFilterSelector);
