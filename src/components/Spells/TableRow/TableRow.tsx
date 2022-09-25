/* eslint-disable react/jsx-props-no-spreading */
import { useMediaQuery, useTheme } from '@mui/material';
import React, { useMemo, useCallback, FC } from 'react';
import { ColumnInstance, Row, UseExpandedRowProps } from 'react-table';
import classNames from 'classnames';

import Description from './Description';
import SpellDetailsMobile from './SpellDetailsMobile';

import * as styles from './TableRow.module.scss';

type Props = {
  row: Row<Spell> & UseExpandedRowProps<Spell>;
  visibleColumns: ColumnInstance<Spell>[];
  width?: number;
};

const TableRow: FC<Props> = (props) => {
  const { row, visibleColumns, width } = props;

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  const handleClick = useCallback(
    () => row.toggleRowExpanded(!row.isExpanded),
    [row]
  );

  const mainTR = useMemo(() => (
    <tr
      {...row.getRowProps()}
      onClick={handleClick}
      className={styles.row}
    >
      { row.cells.map((cell) => {
        return (
          <td
            {...cell.getCellProps()}
            className={classNames(styles.cell, {
              [styles.cellExpanded]: row.isExpanded,
              [styles.checkboxCell]: cell.column.id === 'isActive',
            })}
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
      <>
        {isMobile
          && (
            <tr>
              <td colSpan={visibleColumns.length} className={styles.detailsMobileCell}>
                <SpellDetailsMobile item={row.original} />
              </td>
            </tr>
          )}
        <tr>
          <td
            colSpan={visibleColumns.length}
            className={styles.descriptionCell}
            style={{ width }}
          >
            <Description item={row.original} />
          </td>
        </tr>
      </>
    );
  }, [row.isExpanded, row.original, visibleColumns.length, isMobile, width]);

  return (
    <>
      { mainTR }
      { descriptionRow }
    </>
  );
};

export default TableRow;
