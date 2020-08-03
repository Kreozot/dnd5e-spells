import React, { useMemo, useState, useEffect } from 'react';
import groupBy from 'lodash/groupBy';
import sortBy from 'lodash/sortBy';

import data from 'content/spells';
import SpellsList from 'components/SpellsList';
import LevelFilterSelector from 'components/LevelFilterSelector';
import ClassFilterSelector from 'components/ClassFilterSelector';
import CurrentLevelSelector from 'components/CurrentLevelSelector';

import styles from './Spells.module.scss'

export default function Spells(props) {
  const [classSpells, setClassSpells] = useState([]);
  const [levelFilter, setLevelFilter] = useState(null);
  const [currentLevel, setCurrentLevel] = useState('');

  const filteredData = useMemo(() => {
    if (!classSpells.length) {
      return data;
    }
    return data.filter(
      (spell) => classSpells.some(
        (title) => title.toLowerCase() === spell.title.toLowerCase()
      )
    );
  }, [classSpells]);

  const groupedData = useMemo(() => {
    return groupBy(filteredData, 'level');
  }, [filteredData]);

  const levels = useMemo(() => {
    return sortBy(Object.keys(groupedData), (level) => {
      return level === 'cantrip' ? 0 : level;
    });
  }, [groupedData]);

  useEffect(() => {
    if (levelFilter && !levels.includes(levelFilter)) {
      setLevelFilter(null);
    }
  }, [levels, levelFilter, setLevelFilter]);

  const spellsList = useMemo(() => {
    if (levelFilter !== null) {
      if (!groupedData[levelFilter]) {
        return null;
      }
      return (
        <div className={ styles.container }>
          <SpellsList data={ groupedData[levelFilter] } currentLevel={ currentLevel }/>
        </div>
      );
    }

    return levels.map((level) => (
      <div key={ level } className={ styles.container }>
        <h2 className={ styles.levelHeader }>
          { level === 'cantrip' ? 'Cantrips' : `Level ${ level }` }
        </h2>
        <SpellsList data={ groupedData[level] } currentLevel={ currentLevel }/>
      </div>
    ));
  }, [levels, groupedData, levelFilter, currentLevel]);

  return (
    <>
      <div className={ styles.classSelector }>
        <ClassFilterSelector setClassSpells={ setClassSpells }/>
        <CurrentLevelSelector currentLevel={ currentLevel } setCurrentLevel={ setCurrentLevel }/>
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

