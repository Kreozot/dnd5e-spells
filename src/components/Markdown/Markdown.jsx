import React from 'react';
import MarkdownToJsx from 'markdown-to-jsx';

import LevelUpgrades from 'components/LevelUpgrades';

export default function Markdown(props) {
  const { children, currentLevel } = props;

  return (
    <MarkdownToJsx
      options={ {
        overrides: {
          LevelUpdgrades: {
            component: LevelUpgrades,
            props: {
              currentLevel,
            },
          },
        },
      } }
    >
      { children }
    </MarkdownToJsx>
  );
}
