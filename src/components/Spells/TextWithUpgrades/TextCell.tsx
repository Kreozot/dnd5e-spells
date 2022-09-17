import React, { FC } from 'react';

import { isCertainLevelUpgrades, isEachLevelUpgrades } from 'types';
import CertainLevelUpgrades from 'components/CertainLevelUpgrades';
import EachLevelUpgrades from 'components/EachLevelUpgrades';

type Props = {
  value: string | CertainLevelUpgrades<string> | EachLevelUpgrades;
  spell: Spell;
};

const TextCell: FC<Props> = (props) => {
  const { value, spell } = props;

  if (!value) {
    return null;
  }

  if (typeof value === 'string') {
    // eslint-disable-next-line react/jsx-no-useless-fragment
    return <>{value}</>;
  }

  if (isCertainLevelUpgrades<string>(value)) {
    const { initial, ...upgrades } = value;
    return (
      <CertainLevelUpgrades
        initial={initial}
        upgrades={upgrades}
        spellLevel={spell.level as number}
        spellTitle={spell.title}
      />
    );
  }

  if (isEachLevelUpgrades(value)) {
    const { initial, eachLevelInc, postfix } = value;
    return (
      <EachLevelUpgrades
        initial={initial}
        eachLevelInc={eachLevelInc}
        postfix={postfix}
        spellLevel={spell.level as number}
        spellTitle={spell.title}
      />
    );
  }

  return null;
};

export default TextCell;
