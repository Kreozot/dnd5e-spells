import Typograf from 'typograf';

const typograf = new Typograf({ locale: ['en-US'] });

const ID_EXCLUDE_REGEXP = /[^A-Za-z0-9 ]/g;

export const formatText = (text: string) => {
  return typograf.execute(text);
};

/**
 * Returns singular or plural form depending on the number
 * @param number Number
 * @param postfix Postfix in format "singular|plural"
 * @returns Number + postfix
 * @example
 * declension(1, 'spell|spells') // '1 spell'
 * declension(2, 'spell|spells') // '2 spells'
 */
export const declension = (number: number, postfix: string) => {
  const [singular, plural] = postfix.split('|');
  if (plural && number > 1) {
    return `${ number }${ plural }`;
  }
  return `${ number }${ singular }`;
};

export const getSpellId = (title: string) => {
  return title.replace(ID_EXCLUDE_REGEXP, '').replace(' ', '_').toLowerCase();
};
