import React from 'react';

import styles from './IconCell.module.scss';

export default function IconCell(props) {
  const { title, children } = props;

  return (
    <div className={ styles.iconCell }>
      <div className={ styles.icon } title={ title }>
        { children }
      </div>
    </div>
  );
}
