import React, { useCallback } from 'react';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import InputAdornment from '@material-ui/core/InputAdornment';

import {
  getClassRestrictions,
  getSpellcastingAbilityModifier,
  filtersSlice,
} from 'common/store';

import styles from './FiltersBlock.module.scss';

function SpellcastingAbilityValueSelector(props) {
  const {
    classRestrictions,
    spellcastingAbilityValue,
    spellcastingAbilityModifier,
    setSpellcastingAbilityValue,
  } = props;

  const handleChange = useCallback(({ target: { value } }) => {
    let intValue = parseInt(value);
    setSpellcastingAbilityValue(isNaN(intValue) || (intValue < 1) ? '' : intValue);
  }, [setSpellcastingAbilityValue]);

  if (!classRestrictions) {
    return null;
  }

  return (
    <FormControl className={ styles.field }>
      <InputLabel id="spellcasting-ability-label">{ classRestrictions.spellcastingAbility }</InputLabel>
      <Input
        type="number"
        value={ spellcastingAbilityValue }
        onChange={ handleChange }
        className={ styles.spellcastingAbilityValueInput }
        endAdornment={ <InputAdornment position="end">mod { spellcastingAbilityModifier }</InputAdornment> }
      />
    </FormControl>
  );
}

const mapStateToProps = (state) => ({
  spellcastingAbilityValue: state.filters.spellcastingAbilityValue,
  classRestrictions: getClassRestrictions(state),
  spellcastingAbilityModifier: getSpellcastingAbilityModifier(state),
});
const mapDispatchToProps = (dispatch) => bindActionCreators({
  setSpellcastingAbilityValue: filtersSlice.actions.setSpellcastingAbilityValue
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(SpellcastingAbilityValueSelector);
