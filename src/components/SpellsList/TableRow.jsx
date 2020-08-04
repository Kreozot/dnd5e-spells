import React, { useMemo, useCallback } from 'react';

import Description from './Description';

import styles from './SpellsList.module.scss';

export default function TableRow(props) {
  const { row, visibleColumns } = props;

  const handleClick = useCallback(
    () => row.toggleRowExpanded(!row.isExpanded),
    [row]
  );

  const mainTR = useMemo(() => (
    <tr
      { ...row.getRowProps() }
      onClick={ handleClick }
      className={ styles.row }
    >
      { row.cells.map((cell) => {
        return (
          <td
            { ...cell.getCellProps() }
            className={ row.isExpanded ? styles.cellExpanded : styles.cell }
          >
            { cell.render('Cell') }
          </td>
        );
      }) }
    </tr>
  ), [row]);

  return (
    <>
      { mainTR }
      { Boolean(row.isExpanded) &&
        <tr>
          <td colSpan={ visibleColumns.length }>
            <Description item={ row.original }/>
          </td>
        </tr>
      }
    </>
  )
}
