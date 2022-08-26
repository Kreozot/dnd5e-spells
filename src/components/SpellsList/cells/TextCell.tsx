import React, { FC } from 'react';

import AtHigherLevels from 'components/Markdown/AtHigherLevels';
import { CellProps } from 'react-table';
import { isCertainLevelUpgrades, isEachLevelUpgrades } from 'types';
import CertainLevelUpgrades from 'components/CertainLevelUpgrades';
import EachLevelUpgrades from 'components/EachLevelUpgrades';

type Props = CellProps<Spell, string | CertainLevelUpgrades<string> | EachLevelUpgrades>;

const TextCell: FC<Props> = (props) => {
  const { value, row } = props;

  if (!value) {
    return null;
  }

  if (typeof value === 'string') {
    return <>{value}</>;
  }

  if (isCertainLevelUpgrades<string>(value)) {
    const { initial, ...upgrades } = value;
    return (
      <CertainLevelUpgrades
        initial={initial}
        upgrades={upgrades}
        spellLevel={row.original.level as number}
        spellTitle={row.original.title}
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
        spellLevel={row.original.level as number}
        spellTitle={row.original.title}
      />
    );
  }

  return null;
}

export default TextCell;
