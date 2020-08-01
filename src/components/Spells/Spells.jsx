import React, { useMemo, useState } from 'react';
import groupBy from 'lodash/groupBy';
import sortBy from 'lodash/sortBy';

import data from 'content/spells.yaml';
import SpellsList from 'components/SpellsList';
import LevelFilterSelector from 'components/LevelFilterSelector';
import ClassFilterSelector from 'components/ClassFilterSelector';

import styles from './Spells.module.scss'

export default function Spells(props) {
  const [classSpells, setClassSpells] = useState([]);
  const [levelFilter, setLevelFilter] = useState(null);

  const filteredData = useMemo(() => {
    if (!classSpells.length) {
      return data;
    }
    return data.filter((spell) => classSpells.includes(spell.title));
  }, [classSpells]);

  const groupedData = useMemo(() => {
    return groupBy(filteredData, 'level');
  }, [filteredData]);

  const levels = useMemo(() => {
    return sortBy(Object.keys(groupedData), (level) => {
      return level === 'cantrip' ? 0 : level;
    });
  }, [groupedData]);

  const spellsList = useMemo(() => {
    if (levelFilter !== null) {
      return (
        <div className={ styles.container }>
          <SpellsList data={ groupedData[levelFilter] }/>
        </div>
      );
    }

    return levels.map((level) => (
      <div key={ level } className={ styles.container }>
        <h2 className={ styles.levelHeader }>
          { level === 'cantrip' ? 'Cantrips' : `Level ${ level }` }
        </h2>
        <SpellsList data={ groupedData[level] }/>
      </div>
    ));
  }, [levels, groupedData, levelFilter]);

  return (
    <>
      <div className={ styles.classSelector }>
        <ClassFilterSelector setClassSpells={ setClassSpells }/>
      </div>
      <LevelFilterSelector
        levels={ levels }
        levelFilter={ levelFilter }
        setLevelFilter={ setLevelFilter }
      />
      { spellsList }
    </>
  );
}

