import React from 'react';
import { connect } from 'react-redux';

import Tooltip from 'components/Tooltip';
import { getSpellAttackModifier } from 'common/store';

// Translates <SpellAttackModifier/> into spell save DC value for current level and spell casting ability modifier
function SpellAttackModifier(props) {
  const { spellAttackModifier } = props;

  if (!spellAttackModifier) {
    return null;
  }

  return (
    <Tooltip text={ 'your spell attack modifier' }>
      (<strong>+{ spellAttackModifier }</strong>)
    </Tooltip>
  );
}

const mapStateToProps = (state) => ({
  spellAttackModifier: getSpellAttackModifier(state),
});

export default connect(mapStateToProps)(SpellAttackModifier);
