import React, { useCallback } from 'react';
import Joyride from 'react-joyride';

const STEPS = [
  {
    target: 'body',
    placement: 'center',
    content: 'Greetings, traveller! Welcome to D&D 5e Interactive Spell List!',
  },
  {
    target: '#spell_row__acid_splash',
    content: 'This is the spell list. You can click on it to expand it\'s description',
  },
  {
    target: '',
    content: 'Some of the spells have parameters depends of spellcaster\'s level. In this case the value will be automatically changed after you change "Current level" field value.',
  },
  {
    target: '',
    content: '',
  },
  {
    target: '',
    content: '',
  },
];

export default function Tour() {

  const callback = useCallback((event) => {
    console.log(event);
    if (event.type === 'step:before') {
      if (event.step.target === '#spell_row__acid_splash') {
        document.querySelector('#spell_row__acid_splash').click();
      }
    }
  }, []);

  return (
    <Joyride
      steps={ STEPS }
      callback={ callback }
      showProgress={ true }
      showSkipButton={ true }
      continuous={ true }
      styles={ {
        options: {
          primaryColor: '#3f51b5',
        },
        overlay: {
          backgroundColor: 'transparent',
        },
        spotlight: {
          backgroundColor: 'transparent',
          border: '3px solid rgba(0,0,220,0.4)',
        },
      } }
    />
  )
}
