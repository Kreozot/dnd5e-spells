import React, { FC } from 'react';
import { connect, ConnectedProps } from 'react-redux';
import classNames from 'classnames';

import { getClassRestrictions, State } from 'common/store';

import * as styles from './School.module.scss';

type Props = {
  value: MagicSchool;
};

const SchoolCell: FC<Props & ReduxProps> = (props) => {
  const { value, classRestrictions } = props;

  return (
    <div className={classNames(styles.cell, {
      [styles.strongCell]: classRestrictions?.schoolsEmphasis?.includes(value)
    })}
    >
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
