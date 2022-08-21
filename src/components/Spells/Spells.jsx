import React, { useMemo } from 'react';
import groupBy from 'lodash/groupBy';
import { connect } from 'react-redux';

import {
  getAvailableSpells,
  getAllActiveSpells,
  getAvailableSpellLevels,
} from 'common/store';
import SpellsList from 'components/SpellsList';
import LevelFilterSelector from 'components/LevelFilterSelector';
import FiltersBlock from 'components/FiltersBlock';

import * as styles from './Spells.module.scss'

function Spells(props) {
  const {
    levels,
    levelFilter,
    availableSpells,
    activeFilter,
    titleFilter,
    allActiveSpells,
  } = props;

  // List of spells displayed on current spell list page
  const displayedSpells = useMemo(() => {
    if (activeFilter) {
      return availableSpells.filter(({ title }) =>
        allActiveSpells.some((spellTitle) => spellTitle.toLowerCase() === title.toLowerCase())
      );
    }
    if (titleFilter) {
      return availableSpells.filter(({ title }) => title.toLowerCase().includes(titleFilter));
    }
    return availableSpells;
  }, [activeFilter, allActiveSpells, availableSpells, titleFilter]);

  // Displayed spells grouped by level
  const groupedSpells = useMemo(() => {
    return groupBy(displayedSpells, 'level');
  }, [displayedSpells]);

  // List of levels displayed on current spell list page
  const displayedLevels = useMemo(() => {
    return levels.filter((level) => displayedSpells.some((spell) => spell.level === level));
  }, [levels, displayedSpells]);

  const spellsList = useMemo(() => {
    if (levelFilter !== null) {
      if (!groupedSpells[levelFilter]) {
        return null;
      }
      return (
        <div className={ styles.container }>
          <SpellsList data={ groupedSpells[levelFilter] } />
        </div>
      );
    }

    return displayedLevels.map((level) => (
      <div key={ level } className={ styles.container }>
        <h2 className={ styles.levelHeader }>
          { level === 'cantrip' ? 'Cantrips' : `Level ${level}` }
        </h2>
        <SpellsList data={ groupedSpells[level] } />
      </div>
    ));
  }, [displayedLevels, groupedSpells, levelFilter]);

  return (
    <>
      <div className={ styles.header }>
        <FiltersBlock />
        <LevelFilterSelector />
      </div>
      { spellsList }
    </>
  );
}

const mapStateToProps = (state) => ({
  levels: getAvailableSpellLevels(state),
  levelFilter: state.filters.level,
  activeFilter: state.filters.activeFilter,
  titleFilter: state.filters.titleFilter,
  availableSpells: getAvailableSpells(state),
  allActiveSpells: getAllActiveSpells(state),
});

export default connect(mapStateToProps)(Spells);
