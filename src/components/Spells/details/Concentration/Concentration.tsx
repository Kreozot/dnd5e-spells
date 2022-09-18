import React, { FC, useMemo } from 'react';
import { connect, ConnectedProps } from 'react-redux';

import { getCurrentValueForCertainLevelUpgrade } from 'common/higherLevel';
import Tooltip from 'components/Tooltip';

import ConcentrateIcon from 'images/icon-concentrate.svg';
import { State } from 'common/store';
import { isCertainLevelUpgrades } from 'types';
import IconCell from '../../../Icon';

type Props = {
  value: boolean | CertainLevelUpgrades<boolean>;
  // eslint-disable-next-line react/no-unused-prop-types -- used in mapStateToProps
  spell: Spell;
};

const Concentration: FC<Props & ReduxProps> = (props) => {
  const { value, currentLevel } = props;

  const currentValue = useMemo(() => {
    return isCertainLevelUpgrades<boolean>(value)
      ? getCurrentValueForCertainLevelUpgrade<boolean>(currentLevel as number, value)
      : value;
  }, [value, currentLevel]);

  if (!currentValue) {
    return null;
  }
  if (isCertainLevelUpgrades<boolean>(value)) {
    return (
      <Tooltip text="Depends on spell slot level">
        <IconCell title="Concentration"><ConcentrateIcon /></IconCell>
      </Tooltip>
    );
  }

  return (
    <IconCell title="Concentration"><ConcentrateIcon /></IconCell>
  );
};

const mapStateToProps = (state: State, props: Props) => ({
  currentLevel: state.spellsLevels[props.spell.title] || props.spell.level,
});

const connector = connect(mapStateToProps);
type ReduxProps = ConnectedProps<typeof connector>;

export default connector(Concentration);
