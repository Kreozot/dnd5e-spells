import React, { ChangeEventHandler, FC, useCallback } from 'react';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import { bindActionCreators } from 'redux';
import { connect, ConnectedProps } from 'react-redux';

import { filtersSlice, getClassAdditionalOptions, getClassAdditionalKey, State, Dispatch } from 'common/store';

import * as styles from '../FiltersBlock.module.scss';

const ClassAdditionalSelector: FC<ReduxProps> = (props) => {
  const {
    classAdditionalFilter,
    setClassAdditional,
    additionalOptions,
    additionalKey,
  } = props;

  const handleAdditionalChange = useCallback<ChangeEventHandler<{ name?: string; value: unknown; }>>((event) => {
    setClassAdditional(event.target.value as string);
  }, [setClassAdditional]);

  if (additionalOptions) {
    return (
      <FormControl className={ styles.field }>
        <InputLabel id="class-select-label">{ additionalKey }</InputLabel>
        <Select
          labelId="class-select-label"
          value={ classAdditionalFilter }
          onChange={ handleAdditionalChange }
          className={ styles.classFilterSelect }
        >
          <MenuItem value="">
            <em>None</em>
          </MenuItem>
          { additionalOptions.map((option) => (
            <MenuItem value={ option } key={ option }>{ option }</MenuItem>
          )) }
        </Select>
      </FormControl>
    );
  }
  return null;

}

const mapStateToProps = (state: State) => ({
  classAdditionalFilter: state.filters.classAdditional,
  additionalOptions: getClassAdditionalOptions(state),
  additionalKey: getClassAdditionalKey(state),
});
const mapDispatchToProps = (dispatch: Dispatch) => bindActionCreators({
  setClassAdditional: filtersSlice.actions.setClassAdditional,
}, dispatch);

const connector = connect(mapStateToProps, mapDispatchToProps);
type ReduxProps = ConnectedProps<typeof connector>;

export default connector(ClassAdditionalSelector);
