import { formatText } from 'common/format';
import data from 'content/spells.yaml';

const DICE_REGEXP = /([0-9]*d[0-9]+s?)/gm;

function highlightDices(text) {
  return text.replace(DICE_REGEXP, '<strong>$1</strong>');
}

function format(text) {
  let result = text;

  result = highlightDices(result);

  result = formatText(result);

  return result + '\n';
}

function formatSpells(data) {
  return data.map((spell) => {
    spell.description = format(spell.description);
    if (spell.atHigherLevels) {
      spell.atHigherLevels = format(spell.atHigherLevels);
    }
    if (spell.levelUpgrades) {
      spell.levelUpgrades = format(spell.levelUpgrades);
    }

    return spell;
  });
}

export default formatSpells(data);
