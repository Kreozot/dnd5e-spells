/* eslint-disable react/no-unstable-nested-components */
/* eslint-disable react/jsx-props-no-spreading */
import React, {
  FC, useMemo, useState, useEffect
} from 'react';
import { connect, ConnectedProps } from 'react-redux';
import {
  ColumnDef,
  createColumnHelper,
  ExpandedState,
  flexRender,
  getCoreRowModel,
  getExpandedRowModel,
  useReactTable,
  VisibilityState
} from '@tanstack/react-table';

import { getKnownSpellsCount, State } from 'common/store';
import SpellChoose from 'components/Spells/SpellChoose';
import TableRow from 'components/Spells/TableRow';
import SpellTitleMobile from './SpellTitleMobile';

import * as styles from './SpellsListMobile.module.scss';

type Props = {
  data: Spell[];
  level: SpellLevel;
};

const columnHelper = createColumnHelper<Spell>();

const SpellsList: FC<Props & ReduxProps> = (props) => {
  const { data, level, haveSpellsCount } = props;

  const columns = useMemo<ColumnDef<Spell, any>[]>(() => {
    return [
      columnHelper.display({
        header: 'Active',
        cell: ({ row }) => <SpellChoose spell={row.original} />,
        id: 'isActive',
      }),
      columnHelper.accessor('title', {
        header: 'Title',
        cell: ({ row }) => <SpellTitleMobile spell={row.original} />,
      }),
    ];
  }, []);

  const [expanded, setExpanded] = useState<ExpandedState>({});
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({
    isActive: haveSpellsCount,
  });
  const table = useReactTable<Spell>({
    columns,
    data,
    state: {
      expanded,
      columnVisibility,
    },
    onExpandedChange: setExpanded,
    onColumnVisibilityChange: setColumnVisibility,
    getCoreRowModel: getCoreRowModel(),
    getExpandedRowModel: getExpandedRowModel(),
  });

  useEffect(() => {
    table.setColumnVisibility({
      isActive: haveSpellsCount,
    });
  }, [table, haveSpellsCount]);

  useEffect(() => {
    table.resetExpanded();
  }, [table, level]);

  return (
    <table className={styles.table}>
      <thead>
        { table.getHeaderGroups().map((headerGroup) => (
          <tr key={headerGroup.id}>
            { headerGroup.headers.map((header) => (
              <th key={header.id}>
                {
                  header.isPlaceholder
                    ? null
                    : flexRender(
                      header.column.columnDef.header,
                      header.getContext()
                    )
                }
              </th>
            )) }
          </tr>
        )) }
      </thead>
      <tbody>
        { table.getRowModel().rows.map((row) => {
          return (
            <TableRow
              key={row.id}
              row={row}
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
