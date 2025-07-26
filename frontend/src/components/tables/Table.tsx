import { useMemo } from "react";
import {
  MaterialReactTable,
  useMaterialReactTable,
  type MRT_ColumnDef,
} from "material-react-table";

type Props<T extends object> = {
  columns: MRT_ColumnDef<T>[];
  data: T[];
};

const Table = <T extends { [key: string]: unknown }>({ data, columns }: Props<T>) => {
  const table = useMaterialReactTable({
    columns,
    data,
  });

  return <MaterialReactTable table={table} />;
};

export default Table;
