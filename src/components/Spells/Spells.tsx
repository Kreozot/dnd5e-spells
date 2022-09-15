import React, { FC, useMemo } from 'react';
import groupBy from 'lodash/groupBy';
import { connect, ConnectedProps } from 'react-redux';

import {
  getAvailableSpells,
  getAllActiveSpells,
  getAvailableSpellLevels,
  State,
} from 'common/store';
import SpellsList from './SpellsList';
import LevelFilterSelector from './LevelFilterSelector';
import FiltersBlock from './FiltersBlock';

import * as styles from './Spells.module.scss'
import { SpellsFilterOptions } from 'common/store/filtersSlice';

const Spells: FC<ReduxProps> = (props) => {
  const {
    levels,
    levelFilter,
    availableSpells,
    titleFilter,
    allActiveSpells,
  } = props;

  /** List of spells displayed on current spell list page */
  const displayedSpells = useMemo(() => {
    if (levelFilter === SpellsFilterOptions.Active) {
      return availableSpells.filter(({ title }) =>
        allActiveSpells.some((spellTitle) => spellTitle.toLowerCase() === title.toLowerCase())
      );
    }
    if (titleFilter) {
      return availableSpells.filter(({ title }) => title.toLowerCase().includes(titleFilter));
    }
    return availableSpells;
  }, [levelFilter, allActiveSpells, availableSpells, titleFilter]);

  /** Displayed spells grouped by level */
  const groupedSpells = useMemo(() => {
    return groupBy(displayedSpells, 'level');
  }, [displayedSpells]);

  /** List of levels displayed on current spell list page */
  const displayedLevels = useMemo(() => {
    return levels.filter((level) => displayedSpells.some((spell) => spell.level === level));
  }, [levels, displayedSpells]);

  const spellsList = useMemo(() => {
    if (levelFilter !== SpellsFilterOptions.All && levelFilter !== SpellsFilterOptions.Active) {
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

const mapStateToProps = (state: State) => ({
  levels: getAvailableSpellLevels(state),
  levelFilter: state.filters.spellsFilter,
  titleFilter: state.filters.titleFilter,
  availableSpells: getAvailableSpells(state),
  allActiveSpells: getAllActiveSpells(state),
});

const connector = connect(mapStateToProps);
type ReduxProps = ConnectedProps<typeof connector>;

export default connector(Spells);
