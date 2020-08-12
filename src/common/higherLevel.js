import { declension } from 'common/format';
import max from 'lodash/max';

export const getCurrentValue = (currentLevel, spellLevel, rules) => {
  if (rules.eachLevelInc) {
    const levelsDiff = currentLevel - spellLevel;
    const resultValue = parseInt(rules.initial) + parseInt(rules.eachLevelInc) * levelsDiff;
    return declension(resultValue, rules.postfix || '');
  } else {
    const levelKeys = Object.keys(rules).filter((key) => key !== 'initial').map((key) => parseInt(key));
    const keyForCurrentLevel = max(levelKeys.filter((key) => key <= currentLevel));
    return typeof keyForCurrentLevel === 'undefined'
      ? rules.initial
      : rules[keyForCurrentLevel];
  }
};
