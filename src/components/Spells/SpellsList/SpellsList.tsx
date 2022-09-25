/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react/no-unstable-nested-components */
import React, { FC, useMemo } from 'react';
import {
  useTable, useExpanded, Column, Row, UseExpandedRowProps,
} from 'react-table';
import { useElementSize } from 'usehooks-ts';

import Icon from 'components/Icon';
import TextWithUpgrades from 'components/TextWithUpgrades';
import TextWithHint from 'components/TextWithHint';
import Components from 'components/Spells/details/Components';
import Concentration from 'components/Spells/details/Concentration';
import School from 'components/Spells/details/School';
import TableRow from 'components/Spells/TableRow';
import SpellChoose from 'components/Spells/SpellChoose';
import RitualIcon from 'images/icon-ritual.svg';

import * as styles from './SpellsList.module.scss';

type Props = {
  data: Spell[];
};

const SpellsList: FC<Props> = (props) => {
  const { data } = props;

  const [tableRef, { width }] = useElementSize();

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
          ? <Icon title="Ritual"><RitualIcon /></Icon>
          : null
      ),
    },
    {
      Header: () => <div className={styles.headerCenter}>Components</div>,
      accessor: 'components',
      Cell: ({ value }) => <Components components={value} />,
    },
    {
      Header: 'Casting time',
      accessor: 'castingTime',
      Cell: ({ value }) => <TextWithHint text={value} />,
    },
    {
      Header: 'Range',
      accessor: 'range',
      Cell: ({ value, row }) => <TextWithUpgrades value={value} spell={row.original} />,
    },
    {
      Header: () => <div className={styles.headerCenter} title="Concentration">Conc.</div>,
      accessor: 'concentration',
      Cell: ({ value, row }) => <Concentration value={value} spell={row.original} />,
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
    <table {...getTableProps()} ref={tableRef}>
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
              width={width}
            />
          );
        }) }
      </tbody>
    </table>
  );
};

export default SpellsList;
