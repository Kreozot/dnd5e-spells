import React, { useMemo, useState } from 'react';
import groupBy from 'lodash/groupBy';
import sortBy from 'lodash/sortBy';
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';

import data from 'content/spells.yaml';
import SpellsList from 'components/SpellsList';
import LevelFilterSelector from 'components/LevelFilterSelector';

export default function Spells(props) {
  const filteredData = data;

  const [levelFilter, setLevelFilter] = useState(null);

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
      return <SpellsList data={ groupedData[levelFilter] }/>
    }

    return levels.map((level) => (
      <div key={ level }>
        <h2>{ level }</h2>
        <SpellsList data={ groupedData[level] }/>
      </div>
    ));
  }, [levels, groupedData, levelFilter]);

  return (
    <>
      <LevelFilterSelector
        levels={ levels }
        levelFilter={ levelFilter }
        setLevelFilter={ setLevelFilter }
      />
      { spellsList }
    </>
  );
}

