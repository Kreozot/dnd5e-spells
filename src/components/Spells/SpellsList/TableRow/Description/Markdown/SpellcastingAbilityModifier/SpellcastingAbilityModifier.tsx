import React, { FC } from 'react';
import { connect, ConnectedProps } from 'react-redux';

import { getSpellcastingAbilityModifier, State } from 'common/store';
import Tooltip from 'components/Tooltip';

type Props = {

};

// Translates <SpellcastingAbilityModifier/> into your spellcasting ability modifier's name
const SpellcastingAbilityModifier: FC<Props & ReduxProps> = (props) => {
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

const mapStateToProps = (state: State) => ({
  spellcastingAbilityModifier: getSpellcastingAbilityModifier(state),
});

const connector = connect(mapStateToProps);
type ReduxProps = ConnectedProps<typeof connector>;

export default connector(SpellcastingAbilityModifier);
