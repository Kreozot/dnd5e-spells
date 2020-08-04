import React, { useMemo } from 'react';
import maxBy from 'lodash/maxBy';

import Tooltip from 'components/Tooltip';

// Translates <LevelUpdgrades initial="1d6" upgrades="5:2d6;11:3d6;17:4d6"/> into value relevant for current level
export default function LevelUpgrades(props) {
  const { initial, upgrades, currentLevel } = props;

  const upgradesMap = useMemo(() => {
    return upgrades.split(';')
      .reduce((result, part) => {
        const [level, value] = part.split(':');
        result.push({ level: parseInt(level), value });
        return result;
      }, [])
  }, [upgrades]);

  const currentValue = useMemo(() => {
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
      { currentValue }
    </Tooltip>
  );
}
