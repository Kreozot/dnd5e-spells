import React, { FC, PropsWithChildren } from 'react';
import { Tooltip as TippyTooltip } from 'react-tippy';

import * as styles from './Tooltip.module.scss';

type Props = PropsWithChildren<{
  text: JSX.Element | string;
}>;

const Tooltip: FC<Props> = (props) => {
  const { text, children } = props;

  return (
    <TippyTooltip
      position="right"
      html={ <div className={ styles.tooltip }>{ text }</div> }
      className={ styles.container }
      tag="span"
    >
      { children }
    </TippyTooltip>
  )
}

export default Tooltip;
