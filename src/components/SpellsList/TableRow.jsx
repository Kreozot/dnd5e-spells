import React, { useMemo } from 'react';
import { useTable } from 'react-table';

export default function TableRow(props) {
  const { row } = props;

  return (
    <tr
      { ...row.getRowProps() }
    >
      { row.cells.map((cell) => {
        return (
          <td { ...cell.getCellProps() }>
            { cell.render('Cell') }
          </td>
        )
      }) }
    </tr>
  );
}
