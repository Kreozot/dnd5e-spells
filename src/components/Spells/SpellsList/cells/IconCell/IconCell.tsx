import React, { FC, PropsWithChildren } from 'react';

import * as styles from './IconCell.module.scss';

type Props = PropsWithChildren<{
  title?: string;
}>;

const IconCell: FC<Props> = (props) => {
  const { title, children } = props;

  return (
    <div className={ styles.iconCell }>
      <div className={ styles.icon } title={ title }>
        { children }
      </div>
    </div>
  );
}

export default IconCell;
