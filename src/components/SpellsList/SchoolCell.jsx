import React, { useMemo } from 'react';
import { connect } from 'react-redux';

import { getClassRestrictions } from 'common/store';

import styles from './School.module.scss';

function SchoolCell(props) {
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

const mapStateToProps = (state) => ({
  classRestrictions: getClassRestrictions(state),
 });

export default connect(mapStateToProps)(SchoolCell);
