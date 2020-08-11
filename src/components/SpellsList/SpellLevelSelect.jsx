import React, { useMemo } from 'react';
import ButtonGroup from '@material-ui/core/ButtonGroup';

import SpellLevelSelectButton from './SpellLevelSelectButton';

import styles from './SpellLevelSelect.module.scss';

export default function SpellLevelSelect(props) {
  const {
    item,
  } = props;

  const levels = useMemo(() => {
    const result = [];
    for (let level = item.level; level <= 9; level++) {
      result.push(level);
    }
    return result;
  }, [item]);

  return (
    <div className={ styles.container }>
      Higher level spell slot:
      <ButtonGroup color="primary" size="small" className={ styles.group }>
        { levels.map((level) => (
          <SpellLevelSelectButton level={ level } item={ item } key={ level }/>
        )) }
      </ButtonGroup>
    </div>
  )
}
