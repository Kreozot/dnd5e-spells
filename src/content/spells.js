import { formatText } from 'common/format';
import data from 'content/spells.yaml';

function format(text) {
  let result = formatText(text);

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
