import React, { FC } from 'react';

import EachLevelUpgrades from 'components/EachLevelUpgrades';
import CertainLevelUpgrades from 'components/CertainLevelUpgrades';

// Translates <AtHigherLevels initial="5" eachLevelInc="1" postfix="d8"/> into value relevant for spell slot level
// Translates <AtHigherLevels initial="1 beast" upgrades="5:2 beasts;7:3 beasts;9:4 beasts"/> into value relevant for spell slot level
type Props = {
  initial: string;
  eachLevelInc?: string;
  postfix?: string;
  upgrades?: string | {[level: string]: string};
  spellLevel: number;
  spellTitle: string;
  hint?: string;
};

const AtHigherLevels: FC<Props> = (props) => {
  const { initial, eachLevelInc, postfix, spellLevel, spellTitle, upgrades, hint } = props;

  if (eachLevelInc) {
    return (
      <EachLevelUpgrades
        initial={parseInt(initial, 10)}
        eachLevelInc={parseInt(eachLevelInc, 10)}
        postfix={postfix}
        spellLevel={spellLevel}
        spellTitle={spellTitle}
        hint={hint}
      />
    );
  }

  if (upgrades && (typeof initial === 'string')) {
    return (
      <CertainLevelUpgrades
        initial={initial}
        upgrades={upgrades}
        spellLevel={spellLevel}
        spellTitle={spellTitle}
        hint={hint}
      />
    );
  }

  throw new Error('Unknown use of AtHigherLevels component');
}

export default AtHigherLevels;
