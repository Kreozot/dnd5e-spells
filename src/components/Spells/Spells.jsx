import React, { useMemo, useEffect } from 'react';
import groupBy from 'lodash/groupBy';
import sortBy from 'lodash/sortBy';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { filtersSlice, getAvailableSpells } from 'common/store';
import SpellsList from 'components/SpellsList';
import LevelFilterSelector from 'components/LevelFilterSelector';
import ClassFilterSelector from 'components/ClassFilterSelector';
import CurrentLevelSelector from 'components/CurrentLevelSelector';
import SpellcastingAbilityValueSelector from 'components/SpellcastingAbilityValueSelector';

import styles from './Spells.module.scss'

function Spells(props) {
  const {
    levelFilter,
    selectLevel,
    availableSpells,
  } = props;

  const groupedData = useMemo(() => {
    return groupBy(availableSpells, 'level');
  }, [availableSpells]);

  const levels = useMemo(() => {
    return sortBy(Object.keys(groupedData), (level) => {
      return level === 'cantrip' ? 0 : level;
    });
  }, [groupedData]);

  useEffect(() => {
    if (levelFilter && !levels.includes(levelFilter)) {
      selectLevel(null);
    }
  }, [levels, levelFilter, selectLevel]);

  const spellsList = useMemo(() => {
    if (levelFilter !== null) {
      if (!groupedData[levelFilter]) {
        return null;
      }
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
        <ClassFilterSelector/>
        <CurrentLevelSelector/>
        <SpellcastingAbilityValueSelector/>
      </div>
      <LevelFilterSelector levels={ levels }/>
      { spellsList }
    </>
  );
}

const mapStateToProps = (state) => ({
  levelFilter: state.filters.level,
  availableSpells: getAvailableSpells(state)
});
const mapDispatchToProps = (dispatch) => bindActionCreators({ selectLevel: filtersSlice.actions.selectLevel }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Spells);
