import React from 'react';

import Markdown from 'components/Markdown';

import styles from './Description.module.scss';

export default function Description(props) {
  const { item } = props;

  return (
    <div className={ styles.description }>
      <Markdown>{ item.description }</Markdown>
      { Boolean(item.atHigherLevels) &&
        <>
          <h2>At higher levels</h2>
          <Markdown>{ item.atHigherLevels }</Markdown>
        </>
      }
      { Boolean(item.levelUpgrades) &&
        <>
          <h2>Level upgrades</h2>
          <Markdown>{ item.levelUpgrades }</Markdown>
        </>
      }
    </div>
  );
}
