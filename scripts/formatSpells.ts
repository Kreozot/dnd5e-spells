import fs from 'fs';
import path from 'path';
import jsYaml from 'js-yaml';

import { formatText, getSpellId } from '../src/common/format';

function formatSpells(spells: RawSpell[]): Spell[] {
  const result = spells.map((rawSpell) => {
    const spell: Spell = { ...rawSpell, id: getSpellId(rawSpell.title) };

    spell.description = `${formatText(spell.description)}\n`;
    if (spell.atHigherLevels) {
      spell.atHigherLevels = `${formatText(spell.atHigherLevels)}\n`;
    }
    if (spell.levelUpgrades) {
      spell.levelUpgrades = `${formatText(spell.levelUpgrades)}\n`;
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
  console.log('Spells formatted successfully.');
  return result;
}

const spellsFile = fs.readFileSync(path.join(__dirname, '../src/content/spells.yaml'));
const spellsRaw = jsYaml.load(String(spellsFile)) as RawSpell[];
const spells = formatSpells(spellsRaw);
fs.writeFileSync(path.join(__dirname, '../src/content/spellsFormated.json'), JSON.stringify(spells));
