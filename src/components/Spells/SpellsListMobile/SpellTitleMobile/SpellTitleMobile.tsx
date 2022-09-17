import React, { FC } from 'react';

import IconCell from 'components/Spells/SpellsList/cells/IconCell';

import RitualIcon from 'images/icon-ritual.svg';
import ComponentsCell from 'components/Spells/SpellsList/cells/ComponentsCell';
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
        <ComponentsCell components={spell.components} isMobile />
      </div>
    </div>
  );
};

export default SpellTitleMobile;
