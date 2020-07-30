import React from 'react';

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
