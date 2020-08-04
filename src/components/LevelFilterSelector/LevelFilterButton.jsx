import React, { useCallback } from 'react';
import Button from '@material-ui/core/Button';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { filtersSlice } from 'common/store';

function LevelFilterButton(props) {
  const {
    level,
    filters,
    selectLevel,
  } = props;

  const handleClick = useCallback(() => {
    selectLevel(level);
  }, [level, selectLevel]);

  return (
    <Button
      onClick={ handleClick }
      variant={ level === filters.level ? 'contained' : null }
      color="primary"
    >
      { level === null ? 'All levels' : level }
    </Button>
  );
}

const mapStateToProps = (state) => ({ filters: state.filters });
const mapDispatchToProps = (dispatch) => bindActionCreators({ selectLevel: filtersSlice.actions.selectLevel }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(LevelFilterButton);
