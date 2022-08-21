import React, { useCallback } from 'react';
import Button from '@material-ui/core/Button';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { spellsLevelsSlice, isSpellLevelSelected } from 'common/store';

import * as styles from './SpellLevelSelect.module.scss';

function SpellLevelSelectButton(props) {
  const {
    item,
    level,
    isSelected,
    chooseSpellLevel,
  } = props;

  const handleClick = useCallback(() => {
    chooseSpellLevel({ item, level });
  }, [chooseSpellLevel, item, level]);

  return (
    <Button
      onClick={ handleClick }
      variant={ isSelected ? 'contained' : null }
      color="primary"
      size="small"
      className={ styles.button }
    >
      { level }
    </Button>
  );
}

const mapStateToProps = (state, props) => ({
  isSelected: isSpellLevelSelected(state, props),
});
const mapDispatchToProps = (dispatch) => bindActionCreators({
  chooseSpellLevel: spellsLevelsSlice.actions.chooseSpellLevel,
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(SpellLevelSelectButton);
