import React, { FC } from 'react';

import IconCell from 'components/Spells/IconCell';

import RitualIcon from 'images/icon-ritual.svg';
import ComponentsCell from 'components/Spells/ComponentsCell';
import ConcentrationCell from 'components/Spells/ConcentrationCell';

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
          && <IconCell title="Ritual"><RitualIcon /></IconCell>}
        <ConcentrationCell value={spell.concentration} spell={spell} />
        <ComponentsCell components={spell.components} isMobile />
      </div>
    </div>
  );
};

export default SpellTitleMobile;
