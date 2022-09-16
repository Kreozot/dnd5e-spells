import React, { memo } from 'react';

import ClassFilterSelector from './ClassFilterSelector';
import ClassAdditionalSelector from './ClassAdditionalSelector';
import CurrentLevelSelector from './CurrentLevelSelector';
import SpellcastingAbilityValueSelector from './SpellcastingAbilityValueSelector';
import KnownSpellsCount from './KnownSpellsCount';
import KnownCantripsCount from './KnownCantripsCount';
import SpellSaveDC from './SpellSaveDC';
import SpellAttackModifier from './SpellAttackModifier';

import * as styles from './FiltersBlock.module.scss'

function FiltersBlock() {
  return (
    <div className={ styles.container }>
      <ClassFilterSelector />
      <ClassAdditionalSelector />
      <CurrentLevelSelector />
      <SpellcastingAbilityValueSelector />
      <KnownCantripsCount />
      <KnownSpellsCount />
      <SpellSaveDC />
      <SpellAttackModifier />
    </div>
  );
}


export default memo(FiltersBlock);
