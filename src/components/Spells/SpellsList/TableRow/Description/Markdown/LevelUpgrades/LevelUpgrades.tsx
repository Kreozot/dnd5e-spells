import React, { FC, useMemo } from 'react';
import maxBy from 'lodash/maxBy';
import { connect, ConnectedProps } from 'react-redux';

import Tooltip from 'components/Tooltip';
import { State } from 'common/store';

type Props = {
  initial: string;
  upgrades: string;
};

// Translates <LevelUpgrades initial="1d6" upgrades="5:2d6;11:3d6;17:4d6"/> into value relevant for current level
const LevelUpgrades: FC<Props & ReduxProps> = (props) => {
  const { initial, upgrades, currentLevel } = props;

  const upgradesMap = useMemo(() => {
    return upgrades.split(';')
      .reduce<{level: number; value: string}[]>((result, part) => {
        const [level, value] = part.split(':');
        result.push({ level: parseInt(level), value });
        return result;
      }, []);
  }, [upgrades]);

  const currentValue = useMemo(() => {
    if (!currentLevel) {
      return initial;
    }
    const availableUpgrades = upgradesMap.filter(({ level }) => level <= currentLevel);
    const closestUpgrade = maxBy(availableUpgrades, ({ level }) => level);
    return closestUpgrade
      ? closestUpgrade.value
      : initial;
  }, [initial, upgradesMap, currentLevel]);

  const tooltipText = useMemo(() => {
    return (
      <ul>
        <li>{ initial } by default</li>
        { upgradesMap.map(({ level, value }) => <li key={ level }>{ value } after you reach { level } level</li>) }
      </ul>
    )
  }, [initial, upgradesMap]);

  return (
    <Tooltip text={ tooltipText }>
      <strong>{ currentValue }</strong>
    </Tooltip>
  );
}

const mapStateToProps = (state: State) => ({ currentLevel: state.filters.currentLevel });

const connector = connect(mapStateToProps);
type ReduxProps = ConnectedProps<typeof connector>;

export default connector(LevelUpgrades);
