import React, { FC, useMemo } from 'react';
import { useTable, useExpanded, Column, Row, UseExpandedRowProps } from 'react-table';

import ComponentsCell from './cells/ComponentsCell';
import ConcentrationCell from './cells/ConcentrationCell';
import TextCell from './cells/TextCell';
import IconCell from './cells/IconCell';
import SchoolCell from './cells/SchoolCell';
import TextWithHint from './TextWithHint';
import TableRow from './TableRow';
import SpellChoose from './SpellChoose';

import RitualIcon from 'images/icon-ritual.svg';
import * as styles from './SpellsList.module.scss';

type Props = {
  data: Spell[];
};

const SpellsList: FC<Props> = (props) => {
  const { data } = props;

  const columns: Array<Column<Spell>> = useMemo(() => [
    {
      Header: 'Active',
      accessor: 'title',
      Cell: SpellChoose,
      id: 'isActive',
    },
    {
      Header: 'Title',
      accessor: 'title',
    },
    {
      Header: 'School',
      accessor: 'school',
      Cell: SchoolCell,
    },
    {
      Header: () => <div className={ styles.headerCenter }>Ritual</div>,
      accessor: 'ritual',
      Cell: ({ value }) => (
        value
          ? <IconCell title="Ritual"><RitualIcon /></IconCell>
          : null
      ),
    },
    {
      Header: () => <div className={ styles.headerCenter }>Components</div>,
      accessor: 'components',
      Cell: ComponentsCell,
    },
    {
      Header: 'Casting time',
      accessor: 'castingTime',
      Cell: TextWithHint,
    },
    {
      Header: 'Range',
      accessor: 'range',
      Cell: TextCell,
    },
    {
      Header: () => <div className={ styles.headerCenter } title="Concentration">Conc.</div>,
      accessor: 'concentration',
      Cell: ConcentrationCell,
    },
    {
      Header: 'Duration',
      accessor: 'duration',
      Cell: TextCell,
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
    <table { ...getTableProps() }>
      <thead>
        { headerGroups.map((headerGroup) => (
          <tr { ...headerGroup.getHeaderGroupProps() }>
            { headerGroup.headers.map((column) => (
              <th { ...column.getHeaderProps() }>
                { column.render('Header') }
              </th>
            )) }
          </tr>
        )) }
      </thead>
      <tbody { ...getTableBodyProps() }>
        { rows.map((row) => {
          prepareRow(row);
          return (
            <TableRow
              key={ row.original.title }
              visibleColumns={ visibleColumns }
              row={ row as Row<Spell> & UseExpandedRowProps<Spell> }
            />
          );
        }) }
      </tbody>
    </table>
  );
}

export default SpellsList;
