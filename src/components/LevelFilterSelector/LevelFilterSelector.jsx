import React from 'react';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { filtersSlice } from 'common/store';

import LevelFilterButton from './LevelFilterButton';

function LevelFilterSelector(props) {
  const {
    levels,
    // levelFilter,
    // setLevelFilter,
    filters,
    selectLevel,
  } = props;

  return (
    <ButtonGroup color="primary">
      <LevelFilterButton level={ null } levelFilter={ filters.level } setLevelFilter={ selectLevel }/>
      { levels.map((level) => (
        <LevelFilterButton level={ level } levelFilter={ filters.level } setLevelFilter={ selectLevel } key={ level }/>
      )) }
    </ButtonGroup>
  );
}

const mapStateToProps = (state) => ({ filters: state.filters });
const mapDispatchToProps = (dispatch) => bindActionCreators({ selectLevel: filtersSlice.actions.selectLevel }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(LevelFilterSelector);
