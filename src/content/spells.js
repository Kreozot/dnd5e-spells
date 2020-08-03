import { formatText } from 'common/format';
import data from 'content/spells.yaml';

function formatSpells(data) {
  return data.map((spell) => {
    spell.description = formatText(spell.description) + '\n';
    if (spell.atHigherLevels) {
      spell.atHigherLevels = formatText(spell.atHigherLevels) + '\n';
    }
    if (spell.levelUpgrades) {
      spell.levelUpgrades = formatText(spell.levelUpgrades) + '\n';
    }

    return spell;
  });
}

export default formatSpells(data);
