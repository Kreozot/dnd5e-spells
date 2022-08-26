import React, { useMemo, useCallback, FC } from 'react';
import { ColumnInstance, Row, UseExpandedRowProps } from 'react-table';

import Description from './Description';

import * as styles from './TableRow.module.scss';

type Props = {
  row: Row<Spell> & UseExpandedRowProps<Spell>;
  visibleColumns: ColumnInstance<Spell>[];
};

const TableRow: FC<Props> = (props) => {
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
            className={ `${row.isExpanded ? styles.cellExpanded : styles.cell} ${cell.column.id === 'isActive' ? styles.checkboxCell : ''}` }
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
        <td colSpan={ visibleColumns.length } className={ styles.descriptionCell }>
          <Description item={ row.original } />
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

export default TableRow;
