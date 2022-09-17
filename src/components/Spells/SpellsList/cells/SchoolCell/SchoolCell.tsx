import React, { FC, useMemo } from 'react';
import { connect, ConnectedProps } from 'react-redux';
import { CellProps } from 'react-table';

import { getClassRestrictions, State } from 'common/store';

import * as styles from './SchoolCell.module.scss';

type Props = CellProps<Spell, MagicSchool>;

const SchoolCell: FC<Props & ReduxProps> = (props) => {
  const { value, classRestrictions } = props;

  const cellStyle = useMemo(() => {
    return classRestrictions && classRestrictions.schoolsEmphasis
      && classRestrictions.schoolsEmphasis.includes(value)
      ? styles.strongCell
      : styles.cell;
  }, [value, classRestrictions]);

  return (
    <div className={cellStyle}>
      { value }
    </div>
  );
};

const mapStateToProps = (state: State) => ({
  classRestrictions: getClassRestrictions(state),
});

const connector = connect(mapStateToProps, () => ({}));
type ReduxProps = ConnectedProps<typeof connector>;

export default connector(SchoolCell);
