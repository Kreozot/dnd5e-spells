import React, { FC } from 'react';

import Tooltip from 'components/Tooltip';

type Props = {
  text: string | {
    value: string;
    hint: string;
  };
};

const TextWithHint: FC<Props> = (props) => {
  const { text } = props;

  if (typeof text === 'string') {
    return <>{text}</>;
  }

  return (
    <Tooltip text={text.hint}>
      { text.value }
    </Tooltip>
  );
};

export default TextWithHint;
