import { formatText } from 'common/format';
import data from 'content/spells.yaml';

const DICE_REGEXP = /([0-9]*d[0-9]+s?)/gm;
const DAMAGE_TYPE_REGEXP = /( ?(?:acid|bludgeoning|cold|fire|force|lightning|necrotic|piercing|poison|psychic|radiant|slashing|thunder) damage)/gm;

function highlightDices(text) {
  return text.replace(DICE_REGEXP, '<strong>$1</strong>'); // Tag used to avoid parse strings like "1d6 acid damage" to "**1d6****acid damage**"
}

function highlightDamageTypes(text) {
  return text.replace(DAMAGE_TYPE_REGEXP, '**$1**'); // Asterisks used to prevent space removing in markdown parser
}

function format(text) {
  let result = text;

  result = highlightDices(result);
  console.log(result);
  result = highlightDamageTypes(result);
  console.log(result);
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
