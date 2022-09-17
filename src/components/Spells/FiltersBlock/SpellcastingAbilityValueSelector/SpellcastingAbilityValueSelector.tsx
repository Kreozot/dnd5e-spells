import React, { ChangeEventHandler, FC, useCallback } from 'react';
import { bindActionCreators } from 'redux';
import { connect, ConnectedProps } from 'react-redux';
import InputAdornment from '@mui/material/InputAdornment';

import {
  getClassRestrictions,
  getSpellcastingAbilityModifier,
  filtersSlice,
  State,
  Dispatch,
} from 'common/store';

import * as styles from '../FiltersBlock.module.scss';
import { TextField } from '@mui/material';

const SpellcastingAbilityValueSelector: FC<ReduxProps> = (props) => {
  const {
    classRestrictions,
    spellcastingAbilityValue,
    spellcastingAbilityModifier,
    setSpellcastingAbilityValue,
  } = props;

  const handleChange = useCallback<ChangeEventHandler<HTMLInputElement>>(({ target: { value } }) => {
    let intValue = parseInt(value, 10);
    setSpellcastingAbilityValue(isNaN(intValue) || (intValue < 1) ? undefined : intValue);
  }, [setSpellcastingAbilityValue]);

  if (!classRestrictions) {
    return null;
  }

  return (
    <div className={ styles.field }>
      <TextField
        label={classRestrictions.spellcastingAbility}
        type="number"
        value={ spellcastingAbilityValue }
        onChange={ handleChange }
        className={ styles.spellcastingAbilityValueInput }
        InputProps={{
          endAdornment: <InputAdornment position="end">mod { spellcastingAbilityModifier }</InputAdornment>
        }}
      />
    </div>
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
