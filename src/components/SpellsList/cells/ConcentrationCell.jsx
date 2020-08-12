import React, { useMemo } from 'react';
import { connect } from 'react-redux';

import IconCell from './IconCell';
import { getCurrentValue } from 'common/higherLevel';
import Tooltip from 'components/Tooltip';

import ConcentrateIcon from 'images/icon-concentrate.svg';

function ConcentrationCell(props) {
  const { value, row, currentLevel } = props;

  const currentValue = useMemo(() => {
    return typeof value === 'object'
      ? getCurrentValue(currentLevel, row.original.level, value)
      : value;
  }, [value, row.original.level, currentLevel]);

  if (!currentValue) {
    return null
  }
  return typeof value === 'object'
    ? (
      <Tooltip text="Depends on spell slot level">
        <IconCell title="Concentration"><ConcentrateIcon/></IconCell>
      </Tooltip>
    )
    : <IconCell title="Concentration"><ConcentrateIcon/></IconCell>;
}

const mapStateToProps = (state, props) => ({
  currentLevel: state.spellsLevels[props.row.original.title] || props.row.original.level,
});

export default connect(mapStateToProps)(ConcentrationCell);
