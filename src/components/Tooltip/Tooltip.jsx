import React, { useMemo } from 'react';
import { Tooltip as TippyTooltip } from 'react-tippy';

import styles from './Tooltip.module.scss';

export default function Tooltip(props) {
  const { text, children } = props;

  const materialHtml = useMemo(() => {
    if (typeof text === 'object') {
      return (
        <ul className={ styles.tooltip }>
          { text.map((item) =>
            (<li key={ item }>{ item }</li>)
          ) }
        </ul>
      )
    }
    return <div className={ styles.tooltip }>{ text }</div>;
  }, [text]);

  return (
    <TippyTooltip
      position="right"
      html={ materialHtml }
      className={ styles.container }
    >
      { children }
    </TippyTooltip>
  )
}
