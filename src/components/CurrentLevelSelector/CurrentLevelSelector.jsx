import React, { useCallback } from 'react';
import TextField from '@material-ui/core/TextField';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { filtersSlice } from 'common/store';

import styles from './CurrentLevelSelector.module.scss';

function CurrentLevelSelector(props) {
  const {
    currentLevel,
    setCurrentLevel,
  } = props;

  const handleChange = useCallback(({ target: { value } }) => {
    setCurrentLevel(value);
  }, [setCurrentLevel]);

  return (
    <div className={ styles.container }>
      <TextField
        label="Current level"
        type="number"
        value={ currentLevel }
        onChange={ handleChange }
        className={ styles.input }
      />
    </div>
  );
}

const mapStateToProps = (state) => ({ currentLevel: state.filters.currentLevel });
const mapDispatchToProps = (dispatch) => bindActionCreators({ setCurrentLevel: filtersSlice.actions.setCurrentLevel }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(CurrentLevelSelector);
