import { formatText } from 'common/format';
import data from 'content/spells.yaml';
import { getSpellId } from 'common/format';

function formatSpells(spells) {
  return spells.map((spell) => {
    spell.description = formatText(spell.description) + '\n';
    if (spell.atHigherLevels) {
      spell.atHigherLevels = formatText(spell.atHigherLevels) + '\n';
    }
    if (spell.levelUpgrades) {
      spell.levelUpgrades = formatText(spell.levelUpgrades) + '\n';
    }
    if (typeof spell.components.M === 'string') {
      spell.components.M = formatText(spell.components.M);
    }
    if (typeof spell.components.M === 'object') {
      spell.components.M = spell.components.M.map((component) => formatText(component));
    }
    if (typeof spell.castingTime.hint === 'string') {
      spell.castingTime.hint = formatText(spell.castingTime.hint);
    }

    spell.id = getSpellId(spell.title);

    return spell;
  });
}

export default formatSpells(data);
