import React, { useMemo, Fragment } from 'react';
import { useTable, useExpanded } from 'react-table';
import Markdown from 'markdown-to-jsx';

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
