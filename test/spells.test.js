const test = require('ava');
const yaml = require('js-yaml');
const fs = require('fs');
const spellsList = yaml.safeLoad(fs.readFileSync('./src/content/spells.yaml', 'utf8'));
const classSpells = yaml.safeLoad(fs.readFileSync('./src/content/classSpells.yaml', 'utf8'));

test('All class', async t => {

  for (const classKey in classSpells) {
    for (const key in classSpells[classKey]) {
      if (key === 'main') {
        const spells = classSpells[classKey][key];
        spells.forEach((title) => {
          const found = spellsList.some(
            (spell) => title.toLowerCase() === spell.title.toLowerCase()
          );
          t.is(found, true, `Spell "${ title }" of ${ classKey } not found in spells list!`);
        })
      } else {
        for (const additionalKey in classSpells[classKey][key]) {
          const spells = classSpells[classKey][key][additionalKey];
        }
      }
    }
  }

	t.is(true, true);
});
