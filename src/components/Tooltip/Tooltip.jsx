import React, { useMemo } from 'react';
import { Tooltip as TippyTooltip } from 'react-tippy';

import styles from './Tooltip.module.scss';

export default function Tooltip(props) {
  const { text, children } = props;

  return (
    <TippyTooltip
      position="right"
      html={ <div className={ styles.tooltip }>{ text }</div> }
      className={ styles.container }
    >
      { children }
    </TippyTooltip>
  )
}
