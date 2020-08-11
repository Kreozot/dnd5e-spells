import React, { useMemo } from 'react';
import { connect } from 'react-redux';

import Tooltip from 'components/Tooltip';
import { declension } from 'common/format';

// Translates <AtHigherLevels initial="5" eachLevelInc="1" postfix="d8"/> into value relevant for current level
function LevelUpgrades(props) {
  const { initial, eachLevelInc, postfix = '', spellLevel, currentLevel } = props;

  const currentValue = useMemo(() => {
    if (eachLevelInc) {
      const levelsDiff = currentLevel - spellLevel;
      const resultValue = parseInt(initial) + parseInt(eachLevelInc) * levelsDiff;
      return declension(resultValue, postfix);
    }
  }, [currentLevel, eachLevelInc, initial, spellLevel, postfix]);

  const tooltipText = useMemo(() => {
    if (eachLevelInc) {
      return `${ declension(initial, postfix) } at ${ spellLevel } level, on each next spell slot level increases by ${ declension(eachLevelInc, postfix) }`;
    }
  }, [eachLevelInc, initial, spellLevel, postfix]);

  return (
    <Tooltip text={ tooltipText }>
      <strong>{ currentValue }</strong>
    </Tooltip>
  );
}

const mapStateToProps = (state, props) => ({
  currentLevel: state.spellsLevels[props.spellTitle] || props.spellLevel,
});

export default connect(mapStateToProps)(LevelUpgrades);
