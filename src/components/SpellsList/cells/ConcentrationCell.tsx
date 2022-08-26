import React, { FC, useMemo } from 'react';
import { connect, ConnectedProps } from 'react-redux';

import IconCell from './IconCell';
import { getCurrentValueForCertainLevelUpgrade } from 'common/higherLevel';
import Tooltip from 'components/Tooltip';

import ConcentrateIcon from 'images/icon-concentrate.svg';
import { CellProps } from 'react-table';
import { State } from 'common/store';
import { isCertainLevelUpgrades } from 'types';

type Props = CellProps<Spell, boolean | CertainLevelUpgrades<boolean>>;

const ConcentrationCell: FC<Props & ReduxProps> = (props) => {
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
}

const mapStateToProps = (state: State, props: Props) => ({
  currentLevel: state.spellsLevels[props.row.original.title] || props.row.original.level,
});

const connector = connect(mapStateToProps);
type ReduxProps = ConnectedProps<typeof connector>;

export default connector(ConcentrationCell);
