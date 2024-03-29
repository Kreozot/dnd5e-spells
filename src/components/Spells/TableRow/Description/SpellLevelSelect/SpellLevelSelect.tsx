import React, { FC, useMemo } from 'react';
import ButtonGroup from '@mui/material/ButtonGroup';

import SpellLevelSelectButton from './SpellLevelSelectButton';

import * as styles from './SpellLevelSelect.module.scss';

type Props = {
  item: LeveledSpell;
};

const SpellLevelSelect: FC<Props> = (props) => {
  const {
    item,
  } = props;

  const levels = useMemo(() => {
    const result = [];
    for (let { level } = item; level <= 9; level += 1) {
      result.push(level);
    }
    return result;
  }, [item]);

  return (
    <div className={styles.container}>
      Higher level spell slot:
      <ButtonGroup color="primary" size="small" className={styles.group}>
        { levels.map((level) => (
          <SpellLevelSelectButton level={level} item={item} key={level} />
        )) }
      </ButtonGroup>
    </div>
  );
};

export default SpellLevelSelect;
