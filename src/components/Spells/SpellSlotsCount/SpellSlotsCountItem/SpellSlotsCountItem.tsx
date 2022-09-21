import React, { FC, useMemo } from 'react';

import * as styles from './SpellSlotsCountItem.module.scss';

const ordinalMap = {
  cantrip: 's',
  1: 'st',
  2: 'nd',
  3: 'rd',
  rest: 'th',
};
type OrdinalKey = keyof typeof ordinalMap;

type Props = {
  level: SpellLevel;
  count: number;
};

const LevelFilterButton: FC<Props> = (props) => {
  const { level, count } = props;

  const title = useMemo(() => {
    if (level === 'cantrip') {
      return 'Cantrips';
    }
    return `${level}${ordinalMap[level as OrdinalKey] || ordinalMap.rest}`;
  }, [level]);

  return (
    <span className={styles.item}>
      {title}: <strong>{count}</strong>
    </span>
  );
};

export default LevelFilterButton;
