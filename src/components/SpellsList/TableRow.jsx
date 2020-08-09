import React, { useMemo, useCallback } from 'react';

import Description from './Description';

import styles from './TableRow.module.scss';

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
            className={ `${ row.isExpanded ? styles.cellExpanded : styles.cell } ${ cell.column.id === 'isActive' ? styles.checkboxCell : '' }` }
          >
            { cell.render('Cell') }
          </td>
        );
      }) }
    </tr>
  // eslint-disable-next-line react-hooks/exhaustive-deps
  ), [row, row.isExpanded, handleClick]);

  const descriptionRow = useMemo(() => {
    if (!row.isExpanded) {
      return null;
    }
    return (
      <tr>
        <td colSpan={ visibleColumns.length }>
          <Description item={ row.original }/>
        </td>
      </tr>
    )
  }, [row.isExpanded, row.original, visibleColumns.length])

  return (
    <>
      { mainTR }
      { descriptionRow }
    </>
  )
}
