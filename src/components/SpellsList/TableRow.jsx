import React, { useMemo, useCallback } from 'react';

import Description from './Description';
import SpellChoose from './SpellChoose';

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
      <td
        className={ row.isExpanded ? styles.cellExpanded : styles.cell }
      >
        <SpellChoose title={ row.original.title }/>
      </td>
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
  // eslint-disable-next-line react-hooks/exhaustive-deps
  ), [row, row.isExpanded, handleClick]);

  return (
    <>
      { mainTR }
      { Boolean(row.isExpanded) &&
        <tr>
          <td colSpan={ visibleColumns.length + 1 }>
            <Description item={ row.original }/>
          </td>
        </tr>
      }
    </>
  )
}
