import React, { FC } from 'react';

import Markdown from './Markdown';
import SpellLevelSelect from './SpellLevelSelect';

import * as styles from './Description.module.scss';

type Props = {
  item: Spell;
};

const Description: FC<Props> = (props) => {
  const { item } = props;

  return (
    <div className={styles.description}>
      { Boolean(item.atHigherLevels)
        && <SpellLevelSelect item={item as LeveledSpell} />}
      <Markdown spellLevel={item.level} spellTitle={item.title}>{ item.description }</Markdown>
      { Boolean(item.atHigherLevels)
        && (
          <div className={styles.additional}>
            <h2>At higher levels</h2>
            <Markdown>{ item.atHigherLevels }</Markdown>
          </div>
        )}
      { Boolean(item.levelUpgrades)
        && (
          <div className={styles.additional}>
            <h2>Level upgrades</h2>
            <Markdown>{ item.levelUpgrades }</Markdown>
          </div>
        )}
    </div>
  );
};

export default Description;
