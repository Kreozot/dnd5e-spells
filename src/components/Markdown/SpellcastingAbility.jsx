import React from 'react';
import { connect } from 'react-redux';

import { getClassRestrictions } from 'common/store';
import Tooltip from 'components/Tooltip';

// Translates <SpellcastingAbility/> into your spellcasting ability name
function SpellcastingAbility(props) {
  const { classRestrictions } = props;

  if (!classRestrictions) {
    return <strong>your spellcasting ability</strong>;
  }

  return (
    <Tooltip text={ 'your spellcasting ability' }>
      your { classRestrictions.spellcastingAbility }
    </Tooltip>
  );
}

const mapStateToProps = (state) => ({ classRestrictions: getClassRestrictions(state) });

export default connect(mapStateToProps)(SpellcastingAbility);
