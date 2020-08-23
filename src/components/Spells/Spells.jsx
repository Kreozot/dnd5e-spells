import React, { useMemo } from 'react';
import groupBy from 'lodash/groupBy';
import sortBy from 'lodash/sortBy';
import { connect } from 'react-redux';

import {
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
    availableSpells,
    activeFilter,
    allActiveSpells,
  } = props;

  // Available spells grouped by level
  const groupedSpells = useMemo(() => {
    return groupBy(availableSpells, 'level');
  }, [availableSpells]);

  // Active spells grouped by level
  const groupedActiveSpells = useMemo(() => {
    const spells = availableSpells.filter(({ title }) =>
      allActiveSpells.some((spellTitle) => spellTitle.toLowerCase() === title.toLowerCase())
    );
    return groupBy(spells, 'level');
  }, [allActiveSpells, availableSpells]);

  // List of available spell levels
  const levels = useMemo(() => {
    return sortBy(Object.keys(groupedSpells), (level) => {
      return level === 'cantrip' ? 0 : level;
    });
  }, [groupedSpells]);

  // List of levels displayed on current spell list page
  const displayedLevels = useMemo(() => {
    if (activeFilter) {
      return sortBy(Object.keys(groupedActiveSpells), (level) => {
        return level === 'cantrip' ? 0 : level;
      });
    } else {
      return levels;
    }
  }, [levels, activeFilter, groupedActiveSpells]);

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

    return displayedLevels.map((level) => (
      <div key={ level } className={ styles.container }>
        <h2 className={ styles.levelHeader }>
          { level === 'cantrip' ? 'Cantrips' : `Level ${ level }` }
        </h2>
        <SpellsList data={ activeFilter ? groupedActiveSpells[level] : groupedSpells[level] }/>
      </div>
    ));
  }, [displayedLevels, groupedSpells, levelFilter, activeFilter, groupedActiveSpells]);

  return (
    <>
      <div className={ styles.header }>
        <FiltersBlock/>
        <LevelFilterSelector/>
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

export default connect(mapStateToProps)(Spells);
