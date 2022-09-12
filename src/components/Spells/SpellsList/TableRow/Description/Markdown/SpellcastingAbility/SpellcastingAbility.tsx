import React, { FC } from 'react';
import { connect } from 'react-redux';

import { getClassRestrictions, State } from 'common/store';
import Tooltip from 'components/Tooltip';

// Translates <SpellcastingAbility/> into your spellcasting ability name
type Props = {
  classRestrictions?: ClassRestrictions;
};

const SpellcastingAbility: FC<Props> = (props) => {
  const { classRestrictions } = props;

  if (!classRestrictions) {
    return <strong>your spellcasting ability</strong>;
  }

  return (
    <Tooltip text="your spellcasting ability">
      <strong>your { classRestrictions.spellcastingAbility }</strong>
    </Tooltip>
  );
}

const mapStateToProps = (state: State) => ({ classRestrictions: getClassRestrictions(state) });

export default connect(mapStateToProps)(SpellcastingAbility);
