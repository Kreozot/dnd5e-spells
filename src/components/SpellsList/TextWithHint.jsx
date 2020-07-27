import React, { useMemo } from 'react';

import Tooltip from 'components/Tooltip';

import styles from './TextWithHint.module.scss';

export default function TextWithHint(props) {
  const { children } = props;

  if (typeof children === 'string') {
    return children;
  } else {
    return (
      <Tooltip text={ children.hint }>
        { children.value }
      </Tooltip>
    );
  }
}
