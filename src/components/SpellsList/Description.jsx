import React from 'react';

import Markdown from 'components/Markdown';
import SpellLevelSelect from './SpellLevelSelect';

import styles from './Description.module.scss';

export default function Description(props) {
  const { item } = props;

  return (
    <div className={ styles.description }>
      { Boolean(item.atHigherLevels) &&
        <SpellLevelSelect item={ item }/>
      }
      <Markdown spellLevel={ item.level } spellTitle={ item.title }>{ item.description }</Markdown>
      { Boolean(item.atHigherLevels) &&
        <div className={ styles.additional }>
          <h2>At higher levels</h2>
          <Markdown>{ item.atHigherLevels }</Markdown>
        </div>
      }
      { Boolean(item.levelUpgrades) &&
        <div className={ styles.additional }>
          <h2>Level upgrades</h2>
          <Markdown>{ item.levelUpgrades }</Markdown>
        </div>
      }
    </div>
  );
}
