import React, { useMemo, useEffect } from 'react';
import groupBy from 'lodash/groupBy';
import sortBy from 'lodash/sortBy';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { filtersSlice, getAvailableSpells } from 'common/store';
import ClassFilterSelector from './ClassFilterSelector';
import ClassAdditionalSelector from './ClassAdditionalSelector';
import CurrentLevelSelector from './CurrentLevelSelector';
import SpellcastingAbilityValueSelector from './SpellcastingAbilityValueSelector';
import KnownSpellsCount from './KnownSpellsCount';
import KnownCantripsCount from './KnownCantripsCount';
import SpellSaveDC from './SpellSaveDC';
import SpellAttackModifier from './SpellAttackModifier';

import styles from './FiltersBlock.module.scss'

function FiltersBlock(props) {
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

  return (
    <div className={ styles.container }>
      <ClassFilterSelector/>
      <ClassAdditionalSelector/>
      <CurrentLevelSelector/>
      <SpellcastingAbilityValueSelector/>
      <KnownCantripsCount/>
      <KnownSpellsCount/>
      <SpellSaveDC/>
      <SpellAttackModifier/>
    </div>
  );
}

const mapStateToProps = (state) => ({
  levelFilter: state.filters.level,
  availableSpells: getAvailableSpells(state)
});
const mapDispatchToProps = (dispatch) => bindActionCreators({ selectLevel: filtersSlice.actions.selectLevel }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(FiltersBlock);
