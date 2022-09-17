import React, { FC } from 'react';
import { connect, ConnectedProps } from 'react-redux';

import Tooltip from 'components/Tooltip';
import { getSpellSaveDC, State } from 'common/store';

// Translates <SpellSaveDC/> into spell save DC value for current level and spell casting ability modifier
const SpellSaveDC: FC<ReduxProps> = (props) => {
  const { spellSaveDC } = props;

  if (!spellSaveDC) {
    return <strong>your spell save DC</strong>;
  }

  return (
    <Tooltip text="your spell save DC">
      <strong>DC { spellSaveDC }</strong>
    </Tooltip>
  );
}

const mapStateToProps = (state: State) => ({
  spellSaveDC: getSpellSaveDC(state),
});

const connector = connect(mapStateToProps);
type ReduxProps = ConnectedProps<typeof connector>;

export default connector(SpellSaveDC);
