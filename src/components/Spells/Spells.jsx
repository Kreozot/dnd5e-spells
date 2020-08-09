import React, { useMemo, useEffect } from 'react';
import groupBy from 'lodash/groupBy';
import sortBy from 'lodash/sortBy';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import {
  filtersSlice,
  getAvailableSpells,
  getAllActiveSpells,
  getKnownSpellsCount,
} from 'common/store';
import SpellsList from 'components/SpellsList';
import LevelFilterSelector from 'components/LevelFilterSelector';
import FiltersBlock from 'components/FiltersBlock';

import styles from './Spells.module.scss'

function Spells(props) {
  const {
    levelFilter,
    selectLevel,
    availableSpells,
    activeFilter,
    allActiveSpells,
    haveSpellsCount,
  } = props;

  const groupedSpells = useMemo(() => {
    return groupBy(availableSpells, 'level');
  }, [availableSpells]);

  const groupedActiveSpells = useMemo(() => {
    const spells = availableSpells.filter(({ title }) =>
      allActiveSpells.some((spellTitle) => spellTitle.toLowerCase() === title.toLowerCase())
    );
    return groupBy(spells, 'level');
  }, [allActiveSpells, availableSpells]);

  const levels = useMemo(() => {
    return sortBy(Object.keys(groupedSpells), (level) => {
      return level === 'cantrip' ? 0 : level;
    });
  }, [groupedSpells]);

  const activeLevels = useMemo(() => {
    if (activeFilter) {
      return sortBy(Object.keys(groupedActiveSpells), (level) => {
        return level === 'cantrip' ? 0 : level;
      });
    } else {
      return levels;
    }
  }, [levels, activeFilter, groupedActiveSpells]);

  useEffect(() => {
    if (levelFilter && !levels.includes(levelFilter)) {
      selectLevel(null);
    }
  }, [levels, levelFilter, selectLevel]);

  useEffect(() => {
    if (activeFilter && !haveSpellsCount) {
      selectLevel(null);
    }
  }, [haveSpellsCount, activeFilter, selectLevel]);

  const spellsList = useMemo(() => {
    if (levelFilter !== null) {
      if (!groupedSpells[levelFilter]) {
        return null;
      }
      return (
        <div className={ styles.container }>
          <SpellsList data={ groupedSpells[levelFilter] }/>
        </div>
      );
    }

    return activeLevels.map((level) => (
      <div key={ level } className={ styles.container }>
        <h2 className={ styles.levelHeader }>
          { level === 'cantrip' ? 'Cantrips' : `Level ${ level }` }
        </h2>
        <SpellsList data={ activeFilter ? groupedActiveSpells[level] : groupedSpells[level] }/>
      </div>
    ));
  }, [activeLevels, groupedSpells, levelFilter, activeFilter, groupedActiveSpells]);

  return (
    <>
      <div className={ styles.header }>
        <FiltersBlock/>
        <LevelFilterSelector levels={ levels }/>
      </div>
      { spellsList }
    </>
  );
}

const mapStateToProps = (state) => ({
  levelFilter: state.filters.level,
  activeFilter: state.filters.activeFilter,
  availableSpells: getAvailableSpells(state),
  allActiveSpells: getAllActiveSpells(state),
  haveSpellsCount: Boolean(getKnownSpellsCount(state)),
});
const mapDispatchToProps = (dispatch) => bindActionCreators({ selectLevel: filtersSlice.actions.selectLevel }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Spells);
