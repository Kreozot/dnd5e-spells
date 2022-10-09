type MagicSchool = 'Abjuration'
  | 'Conjuration'
  | 'Divination'
  | 'Enchantment'
  | 'Evocation'
  | 'Illusion'
  | 'Necromancy'
  | 'Transmutation';
type Class = 'bard'
  | 'cleric'
  | 'druid'
  | 'paladin'
  | 'ranger'
  | 'sorcerer'
  | 'warlock'
  | 'fighterEldrichKnight'
  | 'rogueArcaneTrickster';
type SpellComponents = {
  V: boolean;
  S: boolean;
  M: string | string[];
  materialConsumed: number;
  materialSpecial: number;
};
type CertainLevelUpgrades<T> = {
  initial: T;
  [level: string]: T;
};
type EachLevelUpgrades = {
  initial: number;
  eachLevelInc: number;
  postfix: string;
};
type SpellCastingTime = string | {
  value: string;
  hint: string;
};
type SpellLevel = number | 'cantrip';

type Spell = {
  description: string;
  atHigherLevels: string;
  levelUpgrades: string;
  ritual: boolean;
  components: SpellComponents;
  castingTime: SpellCastingTime;
  id: string;
  title: string;
  level: number | 'cantrip';
  school: MagicSchool;
  concentration: boolean | CertainLevelUpgrades<boolean>;
  range: string | CertainLevelUpgrades<string> | EachLevelUpgrades;
  duration: string | CertainLevelUpgrades<string> | EachLevelUpgrades;
  tags: string[];
};
type RawSpell = Omit<Spell, 'id'>;

type LeveledSpell = Omit<Spell, 'level'> & {
  level: number;
};

type ClassRestrictions = {
  spellcastingAbility: 'Charisma' | 'Wisdom' | 'Intelligence';
  levels: {
    cantrips: number;
    knownSpells?: number;
    spellSlots: number[];
  }[];
  schoolsEmphasis?: MagicSchool[];
};

type ClassSpells = {
  [className: string]: {
    main: string[];
    [featureName: string]: {
      [featureName: string]: string[];
    }
  }
};

declare module 'content/classRestrictions.yaml' {
  const array: {
    [title: string]: ClassRestrictions;
  };
  export default array;
}
declare module 'content/spells.yaml' {
  const array: RawSpell[];
  export default array;
}
declare module 'content/classSpells.yaml' {
  const obj: ClassSpells;
  export default obj;
}
declare module 'content/spellsFormated.json' {
  const array: Spell[];
  export default array;
}
declare module '*.svg';
declare module '*.yaml';
declare module '*.scss';
