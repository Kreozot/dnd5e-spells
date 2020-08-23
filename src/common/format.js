import Typograf from 'typograf';

const typograf = new Typograf({ locale: ['en-US'] });

const ID_EXCLUDE_REGEXP = /[^A-Za-z0-9 ]/g;

export const formatText = (text) => {
  return typograf.execute(text);
};

export const declension = (number, postfix) => {
  const [singular, plural] = postfix.split('|');
  if (plural && number > 1) {
    return `${ number }${ plural }`;
  }
  return `${ number }${ singular }`;
};

export const getSpellId = (title) => {
  return title.replace(ID_EXCLUDE_REGEXP, '').replace(' ', '_').toLowerCase();
};
