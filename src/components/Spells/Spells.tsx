import React, { FC, useMemo } from 'react';
import groupBy from 'lodash/groupBy';
import { connect, ConnectedProps } from 'react-redux';
import { useMediaQuery, useTheme } from '@mui/material';
import classNames from 'classnames';

import {
  getAvailableSpells,
  getAllActiveSpells,
  getAvailableSpellLevels,
  State,
} from 'common/store';
import SpellsList from './SpellsList';
import SpellsListMobile from './SpellsListMobile';
import LevelFilterSelector from './LevelFilterSelector';
import FiltersBlock from './FiltersBlock';
import { SpellsFilterOptions } from 'common/store/filtersSlice';

import * as styles from './Spells.module.scss'

const Spells: FC<ReduxProps> = (props) => {
  const {
    levels,
    levelFilter,
    availableSpells,
    titleFilter,
    allActiveSpells,
  } = props;

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  const SpellsListComponent = useMemo(() => {
    return isMobile ? SpellsListMobile : SpellsList;
  }, [isMobile]);

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
          <SpellsListComponent data={ groupedSpells[levelFilter] } />
        </div>
      );
    }

    return displayedLevels.map((level) => (
      <div key={ level } className={ styles.container }>
        <h2 className={ classNames(styles.levelHeader, {
          [styles.mobile]: isMobile,
        }) }>
          { level === 'cantrip' ? 'Cantrips' : `Level ${level}` }
        </h2>
        <SpellsListComponent data={ groupedSpells[level] } />
      </div>
    ));
  }, [displayedLevels, groupedSpells, levelFilter, isMobile]);

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
