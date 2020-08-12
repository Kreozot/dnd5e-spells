import React, { useMemo } from 'react';
import { useTable, useExpanded } from 'react-table';
import { connect } from 'react-redux';

import ComponentsCell from './cells/ComponentsCell';
import TextWithHint from './TextWithHint';
import IconCell from './cells/IconCell';
import SchoolCell from './cells/SchoolCell';
import TableRow from './TableRow';
import SpellChoose from './SpellChoose';
import { getKnownSpellsCount } from 'common/store';

import ConcentrateIcon from 'images/icon-concentrate.svg';
import RitualIcon from 'images/icon-ritual.svg';
import styles from './SpellsList.module.scss';

function SpellsList(props) {
  const { data, haveSpellsCount } = props;

  const columns = useMemo(() => [
    ...(haveSpellsCount
      ? [{
        Header: 'Active',
        accessor: 'title',
        Cell: SpellChoose,
        id: 'isActive',
      }]
      : []
    ),
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
          ? <IconCell title="Ritual"><RitualIcon/></IconCell>
          : null
      ),
    },
    {
      Header: () => <div className={ styles.headerCenter }>Components</div>,
      accessor: 'components',
      Cell: ComponentsCell,
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
  ], [haveSpellsCount]);

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
              row={ row }
            />
          );
        }) }
      </tbody>
    </table>
  );
}

const mapStateToProps = (state) => ({
  haveSpellsCount: Boolean(getKnownSpellsCount(state)),
});

export default connect(mapStateToProps)(SpellsList);
