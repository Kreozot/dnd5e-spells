import React from 'react';
import MarkdownToJsx from 'markdown-to-jsx';

import LevelUpgrades from './LevelUpgrades';
import SpellcastingAbility from './SpellcastingAbility';
import SpellcastingAbilityModifier from './SpellcastingAbilityModifier';

export default function Markdown(props) {
  const { children } = props;

  return (
    <MarkdownToJsx
      options={ {
        overrides: {
          LevelUpdgrades: {
            component: LevelUpgrades,
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
