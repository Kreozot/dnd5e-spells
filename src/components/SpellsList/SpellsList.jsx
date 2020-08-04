import React, { useMemo, Fragment } from 'react';
import { useTable, useExpanded } from 'react-table';
import useTraceUpdate from 'use-trace-update';

import Components from './Components';
import TextWithHint from './TextWithHint';
import Description from './Description';
import IconCell from './IconCell';
import TableRow from './TableRow';

import ConcentrateIcon from 'images/icon-concentrate.svg';
import RitualIcon from 'images/icon-ritual.svg';
import styles from './SpellsList.module.scss';

export default function SpellsList(props) {
  const { data, currentLevel } = props;

  useTraceUpdate(props);

  const columns = useMemo(() => [
    // {
    //   Header: 'Level',
    //   accessor: 'level',
    // },
    {
      Header: 'Title',
      accessor: 'title',
    },
    {
      Header: 'School',
      accessor: 'school',
    },
    {
      Header: () => <div className={ styles.headerCenter }>Ritual</div>,
      accessor: 'ritual',
      Cell: ({ value }) => (
        value
          ? <IconCell title="Ritual"><RitualIcon/></IconCell>
          : null
      ),
    },
    {
      Header: () => <div className={ styles.headerCenter }>Components</div>,
      accessor: 'components',
      Cell: ({ value }) => (<Components components={ value }/>),
    },
    {
      Header: () => 'Casting time',
      accessor: 'castingTime',
      Cell: ({ value }) => (<TextWithHint>{ value }</TextWithHint>),
    },
    {
      Header: 'Range',
      accessor: 'range',
    },
    {
      Header: () => <div className={ styles.headerCenter } title="Concentration">Conc.</div>,
      accessor: 'concentration',
      Cell: ({ value }) => (
        value
          ? <IconCell title="Concentration"><ConcentrateIcon/></IconCell>
          : null
      ),
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
          return <TableRow key={ row.original.title } visibleColumns={ visibleColumns } currentLevel={ currentLevel } row={ row }/>
          // prepareRow(row)
          // const mainTR = (
          //   <tr
          //     { ...row.getRowProps() }
          //     onClick={ () => row.toggleRowExpanded(!row.isExpanded) }
          //     className={ styles.row }
          //   >
          //     { row.cells.map((cell) => {
          //       return (
          //         <td
          //           { ...cell.getCellProps() }
          //           className={ row.isExpanded ? styles.cellExpanded : styles.cell }
          //         >
          //           { cell.render('Cell') }
          //         </td>
          //       );
          //     }) }
          //   </tr>
          // );
          // return (
          //   <Fragment key={ row.getRowProps().key }>
          //     { mainTR }
          //     { Boolean(row.isExpanded) &&
          //       <tr>
          //         <td colSpan={ visibleColumns.length }>
          //           <Description item={ row.original } currentLevel={ currentLevel }/>
          //         </td>
          //       </tr>
          //     }
          //   </Fragment>
          // )
        }) }
      </tbody>
    </table>
  );
}
