import React, { useCallback } from 'react';
import TextField from '@material-ui/core/TextField';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { filtersSlice } from 'common/store';

import styles from './FiltersBlock.module.scss';

function CurrentLevelSelector(props) {
  const {
    currentLevel,
    setCurrentLevel,
  } = props;

  const handleChange = useCallback(({ target: { value } }) => {
    let intValue = parseInt(value);
    setCurrentLevel(isNaN(intValue) || (intValue < 1) ? '' : intValue);
  }, [setCurrentLevel]);

  return (
    <div className={ styles.field }>
      <TextField
        label="Current level"
        type="number"
        value={ currentLevel }
        onChange={ handleChange }
        className={ styles.currentLevelInput }
      />
    </div>
  );
}

const mapStateToProps = (state) => ({ currentLevel: state.filters.currentLevel });
const mapDispatchToProps = (dispatch) => bindActionCreators({ setCurrentLevel: filtersSlice.actions.setCurrentLevel }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(CurrentLevelSelector);
