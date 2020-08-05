import React from 'react';
import { connect } from 'react-redux';

import { getClassRestrictions } from 'common/store';
import Tooltip from 'components/Tooltip';

// Translates <SpellcastingAbilityModifier/> into your spellcasting ability modifier's name
function SpellcastingAbilityModifier(props) {
  const { classRestrictions } = props;

  if (!classRestrictions) {
    return <strong>your spellcasting ability modifier</strong>;
  }

  return (
    <Tooltip text={ 'your spellcasting ability modifier' }>
      your { classRestrictions.spellcastingAbility } modifier
    </Tooltip>
  );
}

const mapStateToProps = (state) => ({ classRestrictions: getClassRestrictions(state) });

export default connect(mapStateToProps)(SpellcastingAbilityModifier);
