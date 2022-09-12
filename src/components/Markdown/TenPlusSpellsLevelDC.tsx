import React, { FC } from 'react';
import { connect, ConnectedProps } from 'react-redux';

import Tooltip from 'components/Tooltip';

import { State } from 'common/store';

// Translates <TenPlusSpellsLevelDC /> into value relevant for spell slot level

type Props = {
  spellLevel: number;
  spellTitle: string;
};

const TenPlusSpellsLevelDC: FC<ReduxProps> = (props) => {
  const { currentLevel } = props;

  return (
    <Tooltip text="10 + the spell’s level">
      <strong>{ 10 + currentLevel }</strong>
    </Tooltip>
  );
}

const mapStateToProps = (state: State, props: Props) => ({
  currentLevel: state.spellsLevels[props.spellTitle] || props.spellLevel,
});

const connector = connect(mapStateToProps);
type ReduxProps = ConnectedProps<typeof connector>;

export default connector(TenPlusSpellsLevelDC);
