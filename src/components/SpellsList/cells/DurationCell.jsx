import React from 'react';

import AtHigherLevels from 'components/Markdown/AtHigherLevels';

export default function DurationCell(props) {
  const { value, row } = props;

  if (typeof value === 'object') {
    const { initial, ...rest } = value;
    return (
      <AtHigherLevels
        spellTitle={ row.original.title }
        spellLevel={ row.original.level }
        initial={ initial }
        upgrades={ Object.keys(rest).reduce((result, key) => ({ ...result, [key]: rest[key] }), {}) }
      />
    )
  }
  return value || null;

}
