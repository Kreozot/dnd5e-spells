import React, { FC } from 'react';
import { connect } from 'react-redux';

import Tooltip from 'components/Tooltip';
import { getSpellAttackModifier, State } from 'common/store';

// Translates <SpellAttackModifier/> into spell save DC value for current level and spell casting ability modifier
type Props = {
  spellAttackModifier: number | null;
};

const SpellAttackModifier: FC<Props> = (props) => {
  const { spellAttackModifier } = props;

  if (!spellAttackModifier) {
    return null;
  }

  return (
    <Tooltip text="your spell attack modifier">
      (<strong>+{ spellAttackModifier }</strong>)
    </Tooltip>
  );
};

const mapStateToProps = (state: State) => ({
  spellAttackModifier: getSpellAttackModifier(state),
});

export default connect(mapStateToProps)(SpellAttackModifier);
