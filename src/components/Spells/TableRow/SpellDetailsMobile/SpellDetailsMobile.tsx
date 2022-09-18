import React, { FC } from 'react';

import TextWithHint from 'components/TextWithHint';
import TextWithUpgrades from 'components/TextWithUpgrades';
import School from 'components/Spells/details/School';

import * as styles from './SpellDetailsMobile.module.scss';

type Props = {
  item: Spell;
};

const SpellDetailsMobile: FC<Props> = (props) => {
  const { item } = props;

  return (
    <div className={styles.container}>
      <div className={styles.field}>
        <span className={styles.label}>Casting time</span>
        <TextWithHint text={item.castingTime} />
      </div>
      <div className={styles.field}>
        <span className={styles.label}>Range</span>
        <TextWithUpgrades value={item.range} spell={item} />
      </div>
      <div className={styles.field}>
        <span className={styles.label}>Duration</span>
        <TextWithUpgrades value={item.duration} spell={item} />
      </div>
      <div className={styles.field}>
        <span className={styles.label}>School</span>
        <School value={item.school} />
      </div>
    </div>
  );
};

export default SpellDetailsMobile;
