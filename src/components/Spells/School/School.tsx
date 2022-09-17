import React, { FC, useMemo } from 'react';
import { connect, ConnectedProps } from 'react-redux';

import { getClassRestrictions, State } from 'common/store';

import * as styles from './School.module.scss';

type Props = {
  value: MagicSchool;
};

const SchoolCell: FC<Props & ReduxProps> = (props) => {
  const { value, classRestrictions } = props;

  const cellStyle = useMemo(() => {
    return classRestrictions && classRestrictions.schoolsEmphasis &&
      classRestrictions.schoolsEmphasis.includes(value)
      ? styles.strongCell
      : styles.cell;
  }, [value, classRestrictions]);

  return (
    <div className={ cellStyle }>
      { value }
    </div>
  );
}

const mapStateToProps = (state: State) => ({
  classRestrictions: getClassRestrictions(state),
});

const connector = connect(mapStateToProps, () => ({}));
type ReduxProps = ConnectedProps<typeof connector>;

export default connector(SchoolCell);
