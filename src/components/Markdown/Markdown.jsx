import React from 'react';
import MarkdownToJsx from 'markdown-to-jsx';

import LevelUpgrades from './LevelUpgrades';

export default function Markdown(props) {
  const { children } = props;

  return (
    <MarkdownToJsx
      options={ {
        overrides: {
          LevelUpdgrades: {
            component: LevelUpgrades,
          },
        },
      } }
    >
      { children }
    </MarkdownToJsx>
  );
}
