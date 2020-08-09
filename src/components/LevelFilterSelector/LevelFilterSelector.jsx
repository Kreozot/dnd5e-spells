import React from 'react';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import { connect } from 'react-redux';

import { getKnownSpellsCount } from 'common/store';

import LevelFilterButton from './LevelFilterButton';

function LevelFilterSelector(props) {
  const {
    levels,
    haveSpellsCount,
  } = props;

  return (
    <ButtonGroup color="primary">
      <LevelFilterButton level={ null }/>
      { haveSpellsCount &&
        <LevelFilterButton level={ 'active' }/>
      }
      { levels.map((level) => (
        <LevelFilterButton level={ level } key={ level }/>
      )) }
    </ButtonGroup>
  );
}

const mapStateToProps = (state) => ({
  haveSpellsCount: Boolean(getKnownSpellsCount(state)),
});

export default connect(mapStateToProps)(LevelFilterSelector);
