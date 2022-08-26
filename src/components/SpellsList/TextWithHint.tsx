import React, { FC } from 'react';

import Tooltip from 'components/Tooltip';
import { CellProps } from 'react-table';

type Props = CellProps<Spell, SpellCastingTime>;

const TextWithHint: FC<Props> = (props) => {
  const { value } = props;

  if (typeof value === 'string') {
    return <>{value}</>;
  }

  return (
    <Tooltip text={ value.hint }>
      { value.value }
    </Tooltip>
  );
}

export default TextWithHint;
