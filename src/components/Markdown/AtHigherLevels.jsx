import React, { useMemo } from 'react';
import { connect } from 'react-redux';

import Tooltip from 'components/Tooltip';
import { declension } from 'common/format';
import { getCurrentValue } from 'common/higherLevel';

// Translates <AtHigherLevels initial="5" eachLevelInc="1" postfix="d8"/> into value relevant for current level
function AtHigherLevels(props) {
  const { initial, eachLevelInc, postfix = '', spellLevel, currentLevel, upgrades } = props;

  const upgradesMap = useMemo(() => {
    if (typeof upgrades === 'string') {
      // TODO: Export function with same logic in LevelUpgrades
      return upgrades.split(';')
        .reduce((result, part) => {
          const [level, value] = part.split(':');
          return {
            ...result,
            [level]: value
          };
        }, {});
    }
    return upgrades;
  }, [upgrades]);

  const currentValue = useMemo(() => {
    if (eachLevelInc) {
      return getCurrentValue(currentLevel, spellLevel, { initial, eachLevelInc, postfix });
    } else {
      return getCurrentValue(currentLevel, spellLevel, { initial, ...upgradesMap });
    }
  }, [currentLevel, eachLevelInc, initial, spellLevel, postfix, upgradesMap]);

  const tooltipText = useMemo(() => {
    if (eachLevelInc) {
      return `${ declension(initial, postfix) } at ${ spellLevel } level, on each next spell slot level increases by ${ declension(eachLevelInc, postfix) }`;
    } else {
      console.log(upgradesMap);
      return (
        <ul>
          <li>{ initial } by default</li>
          { Object.keys(upgradesMap)
            .map((level) => <li key={ level }>{ upgradesMap[level] } after you reach { level } level</li>)
          }
        </ul>
      )
    }
  }, [eachLevelInc, initial, spellLevel, postfix, upgradesMap]);

  return (
    <Tooltip text={ tooltipText }>
      <strong>{ currentValue }</strong>
    </Tooltip>
  );
}

const mapStateToProps = (state, props) => ({
  currentLevel: state.spellsLevels[props.spellTitle] || props.spellLevel,
});

export default connect(mapStateToProps)(AtHigherLevels);
