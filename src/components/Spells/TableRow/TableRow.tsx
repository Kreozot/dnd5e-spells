/* eslint-disable react/jsx-props-no-spreading */
import { useMediaQuery, useTheme } from '@mui/material';
import React, { useMemo, useCallback, FC } from 'react';
import classNames from 'classnames';
import { ExpandedRow, flexRender, Row } from '@tanstack/react-table';

import Description from './Description';
import SpellDetailsMobile from './SpellDetailsMobile';

import * as styles from './TableRow.module.scss';

type Props = {
  row: Row<Spell> & ExpandedRow;
  width?: number;
};

const TableRow: FC<Props> = (props) => {
  const { row, width } = props;

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  const handleClick = useCallback(
    () => row.toggleExpanded(),
    [row]
  );

  const isExpanded = row.getIsExpanded();
  const visibleCells = row.getVisibleCells();

  const mainTR = useMemo(() => (
    <tr
      key={row.id}
      onClick={handleClick}
      className={styles.row}
    >
      { visibleCells.map((cell) => {
        return (
          <td
            key={cell.id}
            className={classNames(styles.cell, {
              [styles.cellExpanded]: isExpanded,
              [styles.checkboxCell]: cell.column.id === 'isActive',
            })}
          >
            {flexRender(cell.column.columnDef.cell, cell.getContext())}
          </td>
        );
      }) }
    </tr>
  ), [row.id, visibleCells, isExpanded, handleClick]);

  const visibleCellsCount = row.getVisibleCells().length;

  const descriptionRow = useMemo(() => {
    if (!isExpanded) {
      return null;
    }
    return (
      <>
        {isMobile
          && (
            <tr>
              <td colSpan={visibleCellsCount} className={styles.detailsMobileCell}>
                <SpellDetailsMobile item={row.original} />
              </td>
            </tr>
          )}
        <tr>
          <td
            colSpan={visibleCellsCount}
            style={{ width }}
          >
            <Description item={row.original} />
          </td>
        </tr>
      </>
    );
  }, [isExpanded, row.original, visibleCellsCount, isMobile, width]);

  return (
    <>
      { mainTR }
      { descriptionRow }
    </>
  );
};

export default TableRow;
