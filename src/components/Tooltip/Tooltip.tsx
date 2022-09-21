import React, { FC, PropsWithChildren, ReactElement } from 'react';
import MaterialTooltip from '@mui/material/Tooltip';

import * as styles from './Tooltip.module.scss';

type Props = PropsWithChildren<{
  text: JSX.Element | string;
}>;

const Tooltip: FC<Props> = (props) => {
  const { text, children } = props;

  return (
    <MaterialTooltip
      title={<div className={styles.tooltip}>{ text }</div>}
      className={styles.container}
    >
      <span>
        { children as ReactElement }
      </span>
    </MaterialTooltip>
  );
};

export default Tooltip;
