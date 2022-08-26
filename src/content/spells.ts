import { formatText } from 'common/format';
import data from 'content/spells.yaml';
import { getSpellId } from 'common/format';

function formatSpells(spells: RawSpell[]): Spell[] {
  return spells.map((rawSpell) => {
    const spell: Spell = { ...rawSpell, id: getSpellId(rawSpell.title) };

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
    if (typeof spell.castingTime === 'object' && typeof spell.castingTime.hint === 'string') {
      spell.castingTime.hint = formatText(spell.castingTime.hint);
    }

    return spell;
  });
}

export default formatSpells(data);
