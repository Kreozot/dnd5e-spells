import React, { useCallback } from 'react';
import TextField from '@material-ui/core/TextField';

import styles from './CurrentLevelSelector.module.scss';

export default function CurrentLevelSelector(props) {
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

