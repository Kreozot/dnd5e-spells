import Typograf from 'typograf';

const typograf = new Typograf({ locale: ['en-US'] });

export function formatText(text) {
  return typograf.execute(text);
}
