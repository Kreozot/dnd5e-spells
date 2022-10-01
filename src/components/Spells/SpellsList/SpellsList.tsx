/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react/no-unstable-nested-components */
import React, {
  FC, useMemo, useState, useEffect
} from 'react';
import { useElementSize } from 'usehooks-ts';
import {
  ExpandedState,
  useReactTable,
  getCoreRowModel,
  getExpandedRowModel,
  ColumnDef,
  flexRender,
  createColumnHelper,
  VisibilityState,
} from '@tanstack/react-table';
import { connect, ConnectedProps } from 'react-redux';

import { getKnownSpellsCount, State } from 'common/store';
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
  level: SpellLevel;
};

const columnHelper = createColumnHelper<Spell>();

const SpellsList: FC<Props & ReduxProps> = (props) => {
  const { data, level, haveSpellsCount } = props;

  const [tableRef, { width }] = useElementSize();

  const columns = useMemo<ColumnDef<Spell, any>[]>(() => [
    columnHelper.display({
      header: 'Active',
      cell: ({ row }) => <SpellChoose spell={row.original} />,
      id: 'isActive',
    }),
    columnHelper.accessor('title', {
      header: 'Title',
    }),
    columnHelper.accessor('school', {
      header: 'School',
      cell: ({ getValue }) => <School value={getValue()} />,
    }),
    columnHelper.accessor('ritual', {
      header: () => <div className={styles.headerCenter}>Ritual</div>,
      cell: ({ getValue }) => (
        getValue()
          ? <Icon title="Ritual"><RitualIcon /></Icon>
          : null
      ),
    }),
    columnHelper.accessor('components', {
      header: () => <div className={styles.headerCenter}>Components</div>,
      cell: ({ getValue }) => <Components components={getValue()} />,
    }),
    columnHelper.accessor('castingTime', {
      header: 'Casting time',
      cell: ({ getValue }) => <TextWithHint text={getValue()} />,
    }),
    columnHelper.accessor('range', {
      header: 'Range',
      cell: ({ getValue, row }) => <TextWithUpgrades value={getValue()} spell={row.original} />,
    }),
    columnHelper.accessor('concentration', {
      header: () => <div className={styles.headerCenter} title="Concentration">Conc.</div>,
      cell: ({ getValue, row }) => <Concentration value={getValue()} spell={row.original} />,
    }),
    columnHelper.accessor('duration', {
      header: 'Duration',
      cell: ({ getValue, row }) => <TextWithUpgrades value={getValue()} spell={row.original} />,
    }),
  ], []);

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
    <table ref={tableRef}>
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
              width={width}
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
