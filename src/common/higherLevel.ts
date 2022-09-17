import max from 'lodash/max';

import { declension } from 'common/format';
import { isEachLevelUpgrades } from 'types';

export const getCurrentValueForEachLevelUpgrade = (
  currentLevel: number,
  spellLevel: number,
  rules: EachLevelUpgrades
) => {
  const levelsDiff = currentLevel - spellLevel;
  const resultValue = rules.initial + rules.eachLevelInc * levelsDiff;
  return declension(resultValue, rules.postfix || '');
};

export const getCurrentValueForCertainLevelUpgrade = <T>(currentLevel: number, rules: CertainLevelUpgrades<T>) => {
  const levelKeys = Object.keys(rules).filter((key) => key !== 'initial').map((key) => parseInt(key, 10));
  const keyForCurrentLevel = max(levelKeys.filter((key) => key <= currentLevel));
  return typeof keyForCurrentLevel === 'undefined'
    ? rules.initial
    : rules[keyForCurrentLevel];
};

export const getCurrentValue = (
  currentLevel: number,
  spellLevel: number,
  rules: CertainLevelUpgrades<number> | EachLevelUpgrades
) => {
  if (isEachLevelUpgrades(rules)) {
    return getCurrentValueForEachLevelUpgrade(currentLevel, spellLevel, rules);
  }
  return getCurrentValueForCertainLevelUpgrade(currentLevel, rules);
};
