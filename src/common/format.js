import Typograf from 'typograf';

const typograf = new Typograf({ locale: ['en-US'] });

export function formatText(text) {
  return typograf.execute(text);
}

export function declension(number, postfix) {
  const [singular, plural] = postfix.split('|');
  if (plural && number > 1) {
    return `${ number }${ plural }`;
  }
  return `${ number }${ singular }`;
}
