import { MRT_ColumnDef, MRT_RowData } from "material-react-table";

export function checkEditableValues<T extends MRT_RowData>(
  values: Record<string, unknown>,
  columns: MRT_ColumnDef<T>[]
): Partial<T> {
  return Object.fromEntries(
    Object.entries(values).filter(([key]) => {
      const column = columns.find((col) => col.accessorKey === key);
      return column?.enableEditing !== false;
    })
  ) as Partial<T>;
}
