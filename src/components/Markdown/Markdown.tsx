import React, { FC } from 'react';
import MarkdownToJsx from 'markdown-to-jsx';

import LevelUpgrades from './LevelUpgrades';
import SpellcastingAbility from './SpellcastingAbility';
import SpellcastingAbilityModifier from './SpellcastingAbilityModifier';
import AtHigherLevels from './AtHigherLevels';
import SpellSaveDC from './SpellSaveDC';
import SpellAttackModifier from './SpellAttackModifier';

type Props = {
  children: string;
  spellLevel?: number | 'cantrip',
  spellTitle?: string;
};

const Markdown: FC<Props> = (props) => {
  const { children, spellLevel, spellTitle } = props;

  return (
    <MarkdownToJsx
      options={ {
        overrides: {
          LevelUpgrades: {
            component: LevelUpgrades,
          },
          AtHigherLevels: {
            component: AtHigherLevels,
            props: { spellLevel, spellTitle }
          },
          SpellcastingAbilityModifier: {
            component: SpellcastingAbilityModifier,
          },
          SpellcastingAbility: {
            component: SpellcastingAbility,
          },
          SpellSaveDC: {
            component: SpellSaveDC,
          },
          SpellAttackModifier: {
            component: SpellAttackModifier,
          },
        },
      } }
    >
      { children }
    </MarkdownToJsx>
  );
}

export default Markdown;
