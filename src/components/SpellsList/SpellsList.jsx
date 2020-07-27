import React, { useMemo, Fragment } from 'react';
import { useTable, useExpanded } from 'react-table';

import data from 'content/spells.yaml';
import Components from './Components';
import TextWithHint from './TextWithHint';
import IconCell from './IconCell';
import TableRow from './TableRow';

import ConcentrateIcon from 'images/icon-concentrate.svg';
import RitualIcon from 'images/icon-ritual.svg';

export default function SpellsList(props) {
  const columns = useMemo(() => [
    {
      Header: 'Level',
      accessor: 'level',
    },
    {
      Header: 'Title',
      accessor: 'title',
    },
    {
      Header: 'Ritual',
      accessor: 'ritual',
      Cell: ({ value }) => (
        value
          ? <IconCell title="Ritual"><RitualIcon/></IconCell>
          : null
      )
    },
    {
      Header: 'Components',
      accessor: 'components',
      Cell: ({ value }) => (<Components components={ value }/>)
    },
    {
      Header: 'Casting time',
      accessor: 'castingTime',
      Cell: ({ value }) => (<TextWithHint>{ value }</TextWithHint>)
    },
    {
      Header: 'Range',
      accessor: 'range',
    },
    {
      Header: 'Conc.',
      accessor: 'concentration',
      Cell: ({ value }) => (
        value
          ? <IconCell title="Concentration"><ConcentrateIcon/></IconCell>
          : null
      )
    },
    {
      Header: 'Duration',
      accessor: 'duration',
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
          prepareRow(row)
          const mainTR = (
            <tr { ...row.getRowProps() } onClick={ () => row.toggleRowExpanded(!row.isExpanded) }>
              { row.cells.map((cell) => {
                return (
                  <td { ...cell.getCellProps() }>
                    { cell.render('Cell') }
                  </td>
                )
              }) }
            </tr>
          );
          return (
            <Fragment key={ row.getRowProps().key }>
              { mainTR }
              { Boolean(row.isExpanded) &&
                <tr>
                  <td colSpan={ visibleColumns.length }>
                    { row.original.description }
                  </td>
                </tr>
              }
            </Fragment>
          )
        }) }
      </tbody>
    </table>
  );
}
