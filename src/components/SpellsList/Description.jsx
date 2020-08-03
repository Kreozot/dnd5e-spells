import React from 'react';

import Markdown from 'components/Markdown';

import styles from './Description.module.scss';

export default function Description(props) {
  const { item, currentLevel } = props;

  return (
    <div className={ styles.description }>
      <Markdown currentLevel={ currentLevel }>{ item.description }</Markdown>
      { Boolean(item.atHigherLevels) &&
        <>
          <h2>At higher levels</h2>
          <Markdown currentLevel={ currentLevel }>{ item.atHigherLevels }</Markdown>
        </>
      }
      { Boolean(item.levelUpgrades) &&
        <>
          <h2>Level upgrades</h2>
          <Markdown currentLevel={ currentLevel }>{ item.levelUpgrades }</Markdown>
        </>
      }
    </div>
  );
}
