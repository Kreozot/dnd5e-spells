/* eslint-disable react/no-unstable-nested-components */
/* eslint-disable react/jsx-props-no-spreading */
import React, { FC, useMemo } from 'react';
import {
  useTable, useExpanded, Column, Row, UseExpandedRowProps,
} from 'react-table';

import SpellChoose from 'components/Spells/SpellChoose';
import { connect, ConnectedProps } from 'react-redux';
import { getKnownSpellsCount, State } from 'common/store';
import TableRow from '../TableRow';

import * as styles from './SpellsListMobile.module.scss';
import SpellTitleMobile from './SpellTitleMobile';

type Props = {
  data: Spell[];
};

const SpellsList: FC<Props & ReduxProps> = (props) => {
  const { data, haveSpellsCount } = props;

  const columns: Array<Column<Spell>> = useMemo(() => {
    if (haveSpellsCount) {
      return [
        {
          Header: 'Active',
          accessor: 'title',
          Cell: ({ row }) => <SpellChoose spell={row.original} />,
          id: 'isActive',
        },
        {
          Header: 'Title',
          accessor: 'title',
          Cell: ({ row }) => <SpellTitleMobile spell={row.original} />,
        },
      ];
    }
    return [
      {
        Header: 'Title',
        accessor: 'title',
        Cell: ({ row }) => <SpellTitleMobile spell={row.original} />,
      },
    ];
  }, [haveSpellsCount]);

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    visibleColumns,
    prepareRow,
  } = useTable({ columns, data }, useExpanded);

  return (
    <table {...getTableProps()} className={styles.table}>
      <thead>
        { headerGroups.map((headerGroup) => (
          <tr {...headerGroup.getHeaderGroupProps()}>
            {haveSpellsCount
              && (
                <>
                  <th {...headerGroup.headers[0].getHeaderProps()} className={styles.activeHeader}>
                    { headerGroup.headers[0].render('Header') }
                  </th>
                  <th {...headerGroup.headers[1].getHeaderProps()} className={styles.titleHeader}>
                    { headerGroup.headers[1].render('Header') }
                  </th>
                </>
              )}
            {!haveSpellsCount
              && (
                <th {...headerGroup.headers[0].getHeaderProps()} className={styles.titleHeader}>
                  { headerGroup.headers[0].render('Header') }
                </th>
              )}
          </tr>
        )) }
      </thead>
      <tbody {...getTableBodyProps()}>
        { rows.map((row) => {
          prepareRow(row);
          return (
            <TableRow
              key={row.original.title}
              visibleColumns={visibleColumns}
              row={row as Row<Spell> & UseExpandedRowProps<Spell>}
            />
          );
        }) }
      </tbody>
    </table>
  );
};

const mapStateToProps = (state: State) => ({
  haveSpellsCount: Boolean(getKnownSpellsCount(state)),
});

const connector = connect(mapStateToProps);
type ReduxProps = ConnectedProps<typeof connector>;

export default connector(SpellsList);
