import React from 'react';

import Tooltip from 'components/Tooltip';

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
