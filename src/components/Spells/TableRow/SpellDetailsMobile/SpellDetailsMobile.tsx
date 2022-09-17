import React, { FC } from 'react';

import * as styles from './SpellDetailsMobile.module.scss';
import TextWithHint from 'components/Spells/TextWithHint';
import School from 'components/Spells/School';
import TextWithUpgrades from 'components/Spells/TextWithUpgrades';

type Props = {
  item: Spell;
};

const SpellDetailsMobile: FC<Props> = (props) => {
  const { item } = props;

  return (
    <div className={ styles.container }>
      <div className={ styles.field }>
        <span className={ styles.label }>Casting time</span>
        <TextWithHint value={ item.castingTime } />
      </div>
      <div className={ styles.field }>
        <span className={ styles.label }>Range</span>
        <TextWithUpgrades value={ item.range } spell={ item }/>
      </div>
      <div className={ styles.field }>
        <span className={ styles.label }>Duration</span>
        <TextWithUpgrades value={ item.duration } spell={ item }/>
      </div>
      <div className={ styles.field }>
        <span className={ styles.label }>School</span>
        <School value={ item.school } />
      </div>
    </div>
  );
}

export default SpellDetailsMobile;
