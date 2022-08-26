import React, { ChangeEventHandler, FC, useCallback } from 'react';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import { bindActionCreators } from 'redux';
import { connect, ConnectedProps } from 'react-redux';
import InputAdornment from '@material-ui/core/InputAdornment';

import {
  getClassRestrictions,
  getSpellcastingAbilityModifier,
  filtersSlice,
  State,
  Dispatch,
} from 'common/store';

import * as styles from './FiltersBlock.module.scss';

const SpellcastingAbilityValueSelector: FC<ReduxProps> = (props) => {
  const {
    classRestrictions,
    spellcastingAbilityValue,
    spellcastingAbilityModifier,
    setSpellcastingAbilityValue,
  } = props;

  const handleChange = useCallback<ChangeEventHandler<HTMLInputElement>>(({ target: { value } }) => {
    let intValue = parseInt(value, 10);
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

const mapStateToProps = (state: State) => ({
  spellcastingAbilityValue: state.filters.spellcastingAbilityValue,
  classRestrictions: getClassRestrictions(state),
  spellcastingAbilityModifier: getSpellcastingAbilityModifier(state),
});
const mapDispatchToProps = (dispatch: Dispatch) => bindActionCreators({
  setSpellcastingAbilityValue: filtersSlice.actions.setSpellcastingAbilityValue
}, dispatch);

const connector = connect(mapStateToProps, mapDispatchToProps);
type ReduxProps = ConnectedProps<typeof connector>;

export default connector(SpellcastingAbilityValueSelector);
