import React, { useCallback } from 'react';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { filtersSlice, getClassAdditionalOptions, getClassAdditionalKey } from 'common/store';

import styles from './FiltersBlock.module.scss';

function ClassAdditionalSelector(props) {
  const {
    classAdditionalFilter,
    setClassAdditional,
    additionalOptions,
    additionalKey,
  } = props;

  const handleAdditionalChange = useCallback((event) => {
    setClassAdditional(event.target.value);
  }, [setClassAdditional]);

  if (additionalOptions) {
    return (
      <FormControl className={ styles.field }>
        <InputLabel id="class-select-label">{ additionalKey }</InputLabel>
        <Select
          labelId="class-select-label"
          value={ classAdditionalFilter }
          onChange={ handleAdditionalChange }
          className={ styles.classFilterSelect }
        >
          <MenuItem value="">
            <em>None</em>
          </MenuItem>
          { additionalOptions.map((option) => (
            <MenuItem value={ option } key={ option }>{ option }</MenuItem>
          )) }
        </Select>
      </FormControl>
    );
  }
  return null;

}

const mapStateToProps = (state) => ({
  classAdditionalFilter: state.filters.classAdditional,
  additionalOptions: getClassAdditionalOptions(state),
  additionalKey: getClassAdditionalKey(state),
});
const mapDispatchToProps = (dispatch) => bindActionCreators({
  setClassAdditional: filtersSlice.actions.setClassAdditional,
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(ClassAdditionalSelector);
