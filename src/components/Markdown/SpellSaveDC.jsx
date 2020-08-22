import React from 'react';
import { connect } from 'react-redux';

import Tooltip from 'components/Tooltip';
import { getSpellSaveDC } from 'common/store';

// Translates <SpellSaveDC/> into spell save DC value for current level and spell casting ability modifier
function SpellSaveDC(props) {
  const { spellSaveDC } = props;

  if (!spellSaveDC) {
    return <strong>your spell save DC</strong>;
  }

  return (
    <Tooltip text={ 'your spell save DC' }>
      <strong>DC { spellSaveDC }</strong>
    </Tooltip>
  );
}

const mapStateToProps = (state) => ({
  spellSaveDC: getSpellSaveDC(state),
});

export default connect(mapStateToProps)(SpellSaveDC);
