import React from 'react';
import MarkdownToJsx from 'markdown-to-jsx';

import LevelUpgrades from './LevelUpgrades';
import SpellcastingAbility from './SpellcastingAbility';
import SpellcastingAbilityModifier from './SpellcastingAbilityModifier';
import AtHigherLevels from './AtHigherLevels';

export default function Markdown(props) {
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
        },
      } }
    >
      { children }
    </MarkdownToJsx>
  );
}
