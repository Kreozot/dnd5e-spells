const test = require('ava');
const yaml = require('js-yaml');
const fs = require('fs');
const validate = require('validate.js');

const spellsList = yaml.safeLoad(fs.readFileSync('./src/content/spells.yaml', 'utf8'));
const classSpells = yaml.safeLoad(fs.readFileSync('./src/content/classSpells.yaml', 'utf8'));

const spellConstraints = {
  title: {
    presence: true,
    type: 'string'
  },
  level: {
    presence: true,
    inclusion: {
      within: ['cantrip', 1, 2, 3, 4, 5, 6, 7, 8, 9]
    }
  },
  school: {
    presence: true,
    inclusion: {
      within: [
        'Abjuration',
        'Conjuration',
        'Divination',
        'Enchantment',
        'Evocation',
        'Illusion',
        'Necromancy',
        'Transmutation',
      ]
    }
  },
  castingTime: {
    presence: true,
  },
  range: {
    presence: true,
  },
  components: {
    presence: true,
  },
  duration: {
    presence: true,
  },
  description: {
    presence: true,
    type: 'string',
  },
};

test('All class spells found in spells list', async t => {
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
});

test('All spells have all required fields', async t => {
  spellsList.forEach((spell) => {
    const errors = validate(spell, spellConstraints);
    t.is(typeof errors, 'undefined', `Spell "${ spell.title }" have following errors:\n${ JSON.stringify(errors, null, 2) }`);
  });
});
