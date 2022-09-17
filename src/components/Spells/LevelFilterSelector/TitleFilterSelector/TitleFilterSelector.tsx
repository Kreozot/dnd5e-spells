import React, { useCallback, useState, useEffect, FC, ChangeEventHandler } from 'react';
import Input from '@mui/material/Input';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import { bindActionCreators } from 'redux';
import { connect, ConnectedProps } from 'react-redux';
import InputAdornment from '@mui/material/InputAdornment';
import debounce from 'lodash/debounce';

import {
  Dispatch,
  filtersSlice, State,
} from 'common/store';

import * as styles from './TitleFilterSelector.module.scss';
import FilterIcon from 'images/icon-filter.svg';

const TitleFilterSelector: FC<ReduxProps> = (props) => {
  const {
    titleFilter,
    setTitleFilter,
  } = props;

  const [fieldValue, setFieldValue] = useState(titleFilter);
  const setTitleFilterDebounced = useCallback(debounce(setTitleFilter, 500), [setTitleFilter]);

  const handleChange = useCallback<ChangeEventHandler<HTMLInputElement>>(({ target: { value } }) => {
    setFieldValue(value.toLowerCase());
    setTitleFilterDebounced(value.toLowerCase());
  }, [setFieldValue, setTitleFilterDebounced]);

  useEffect(() => {
    setFieldValue(titleFilter);
  }, [titleFilter]);

  return (
    <FormControl className={ styles.container }>
      <InputLabel id="title-filter-label">Search</InputLabel>
      <Input
        value={ fieldValue }
        onChange={ handleChange }
        className={ styles.input }
        endAdornment={
          <InputAdornment position="end">
            <div className={ styles.icon }>
              <FilterIcon />
            </div>
          </InputAdornment>
        }
      />
    </FormControl>
  );
}

const mapStateToProps = (state: State) => ({
  titleFilter: state.filters.titleFilter,
});
const mapDispatchToProps = (dispatch: Dispatch) => bindActionCreators({
  setTitleFilter: filtersSlice.actions.setTitleFilter
}, dispatch);

const connector = connect(mapStateToProps, mapDispatchToProps);
type ReduxProps = ConnectedProps<typeof connector>;

export default connector(TitleFilterSelector);
