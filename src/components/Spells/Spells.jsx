import React, { useMemo, useState, useEffect } from 'react';
import groupBy from 'lodash/groupBy';
import sortBy from 'lodash/sortBy';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import data from 'content/spells';
import { filtersSlice } from 'common/store';
import SpellsList from 'components/SpellsList';
import LevelFilterSelector from 'components/LevelFilterSelector';
import ClassFilterSelector from 'components/ClassFilterSelector';
import CurrentLevelSelector from 'components/CurrentLevelSelector';

import styles from './Spells.module.scss'

function Spells(props) {
  const {
    filters,
    selectLevel,
  } = props;

  const [classSpells, setClassSpells] = useState([]);

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
    if (filters.level && !levels.includes(filters.level)) {
      selectLevel(null);
    }
  }, [levels, filters.level, selectLevel]);

  const spellsList = useMemo(() => {
    if (filters.level !== null) {
      if (!groupedData[filters.level]) {
        return null;
      }
      return (
        <div className={ styles.container }>
          <SpellsList data={ groupedData[filters.level] }/>
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
  }, [levels, groupedData, filters.level]);

  return (
    <>
      <div className={ styles.classSelector }>
        <ClassFilterSelector setClassSpells={ setClassSpells }/>
        <CurrentLevelSelector/>
      </div>
      <LevelFilterSelector levels={ levels }/>
      { spellsList }
    </>
  );
}


const mapStateToProps = (state) => ({ filters: state.filters });
const mapDispatchToProps = (dispatch) => bindActionCreators({ selectLevel: filtersSlice.actions.selectLevel }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Spells);
