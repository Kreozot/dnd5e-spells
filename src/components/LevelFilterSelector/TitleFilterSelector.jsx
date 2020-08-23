import React, { useCallback, useState, useEffect } from 'react';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import InputAdornment from '@material-ui/core/InputAdornment';
import debounce from 'lodash/debounce';

import {
  filtersSlice,
} from 'common/store';

import styles from './TitleFilterSelector.module.scss';
import FilterIcon from 'images/icon-filter.svg';

function TitleFilterSelector(props) {
  const {
    titleFilter,
    setTitleFilter,
  } = props;

  const [fieldValue, setFieldValue] = useState(titleFilter);
  const setTitleFilterDebounced = useCallback(debounce(setTitleFilter, 500), [setTitleFilter]);

  const handleChange = useCallback(({ target: { value } }) => {
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
              <FilterIcon/>
            </div>
          </InputAdornment>
        }
      />
    </FormControl>
  );
}

const mapStateToProps = (state) => ({
  titleFilter: state.filters.titleFilter,
});
const mapDispatchToProps = (dispatch) => bindActionCreators({
  setTitleFilter: filtersSlice.actions.setTitleFilter
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(TitleFilterSelector);
