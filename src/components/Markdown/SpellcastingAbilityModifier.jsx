import React from 'react';
import { connect } from 'react-redux';

import { getSpellcastingAbilityModifier } from 'common/store';
import Tooltip from 'components/Tooltip';

// Translates <SpellcastingAbilityModifier/> into your spellcasting ability modifier's name
function SpellcastingAbilityModifier(props) {
  const { spellcastingAbilityModifier } = props;

  if (!spellcastingAbilityModifier) {
    return <strong>your spellcasting ability modifier</strong>;
  }

  return (
    <Tooltip text={ 'your spellcasting ability modifier' }>
      <strong>{ spellcastingAbilityModifier }</strong>
    </Tooltip>
  );
}

const mapStateToProps = (state) => ({
  spellcastingAbilityModifier: getSpellcastingAbilityModifier(state),
});

export default connect(mapStateToProps)(SpellcastingAbilityModifier);
