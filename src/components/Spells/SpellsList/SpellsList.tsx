/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react/no-unstable-nested-components */
import React, { FC, useMemo } from 'react';
import {
  useTable, useExpanded, Column, Row, UseExpandedRowProps,
} from 'react-table';

import RitualIcon from 'images/icon-ritual.svg';
import ComponentsCell from '../ComponentsCell';
import ConcentrationCell from '../ConcentrationCell';
import TextWithUpgrades from '../TextWithUpgrades';
import IconCell from '../IconCell';
import TextWithHint from '../TextWithHint';
import TableRow from '../TableRow';
import SpellChoose from '../SpellChoose';

import * as styles from './SpellsList.module.scss';
import School from '../School';

type Props = {
  data: Spell[];
};

const SpellsList: FC<Props> = (props) => {
  const { data } = props;

  const columns: Array<Column<Spell>> = useMemo(() => [
    {
      Header: 'Active',
      accessor: 'title',
      Cell: ({ row }) => <SpellChoose spell={row.original} />,
      id: 'isActive',
    },
    {
      Header: 'Title',
      accessor: 'title',
    },
    {
      Header: 'School',
      accessor: 'school',
      Cell: ({ value }) => <School value={value} />,
    },
    {
      Header: () => <div className={styles.headerCenter}>Ritual</div>,
      accessor: 'ritual',
      Cell: ({ value }) => (
        value
          ? <IconCell title="Ritual"><RitualIcon /></IconCell>
          : null
      ),
    },
    {
      Header: () => <div className={styles.headerCenter}>Components</div>,
      accessor: 'components',
      Cell: ({ value }) => <ComponentsCell components={value} />,
    },
    {
      Header: 'Casting time',
      accessor: 'castingTime',
      Cell: ({ value }) => <TextWithHint value={value} />,
    },
    {
      Header: 'Range',
      accessor: 'range',
      Cell: ({ value, row }) => <TextWithUpgrades value={value} spell={row.original} />,
    },
    {
      Header: () => <div className={styles.headerCenter} title="Concentration">Conc.</div>,
      accessor: 'concentration',
      Cell: ({ value, row }) => <ConcentrationCell value={value} spell={row.original} />,
    },
    {
      Header: 'Duration',
      accessor: 'duration',
      Cell: ({ value, row }) => <TextWithUpgrades value={value} spell={row.original} />,
    },
  ], []);

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    visibleColumns,
    prepareRow,
  } = useTable({ columns, data }, useExpanded);

  return (
    <table {...getTableProps()}>
      <thead>
        { headerGroups.map((headerGroup) => (
          <tr {...headerGroup.getHeaderGroupProps()}>
            { headerGroup.headers.map((column) => (
              <th {...column.getHeaderProps()}>
                { column.render('Header') }
              </th>
            )) }
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

export default SpellsList;
