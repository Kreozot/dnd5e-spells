import React, { FC } from 'react';

import Icon from 'components/Icon';
import Components from 'components/Spells/details/Components';
import Concentration from 'components/Spells/details/Concentration';
import RitualIcon from 'images/icon-ritual.svg';

import * as styles from './SpellTitleMobile.module.scss';

type Props = {
  spell: Spell;
};

const SpellTitleMobile: FC<Props> = (props) => {
  const { spell } = props;

  return (
    <div className={styles.container}>
      <div className={styles.title}>
        { spell.title }
      </div>
      <div className={styles.icons}>
        {spell.ritual
          && <Icon title="Ritual"><RitualIcon /></Icon>}
        <Concentration value={spell.concentration} spell={spell} />
        <Components components={spell.components} isMobile />
      </div>
    </div>
  );
};

export default SpellTitleMobile;
