import { MRT_RowData, MRT_ColumnDef } from "material-react-table";
import { NormalizerConfig } from "./normalizerValues";

export function createNormalizerConfigFromColumns <T extends MRT_RowData>(
  columns: MRT_ColumnDef<T>[]
): NormalizerConfig<T> {
  const config: NormalizerConfig<T> = {};

  columns.forEach((col) => {
    const key = col.accessorKey as keyof T;
    const type = (col.meta as { type?: string })?.type;

    if (type === "number") {
      config[key] = (v) =>
        v === "" || v == null ? (undefined as unknown as T[keyof T]) : (Number(v) as unknown as T[keyof T]);
    }

    if (type === "date") {
      config[key] = (v) => {
        if (v instanceof Date) return v as T[keyof T];
        const s = typeof v === "string" ? v : String(v ?? "");
        const d = s.length === 10 ? new Date(`${s}T00:00:00`) : new Date(s);
        return d as unknown as T[keyof T];
      };
    }

    if (type === "string") {
      config[key] = (v) => String(v ?? "") as unknown as T[keyof T];
    }

    if (type === "boolean") {
      config[key] = (v) => {
        if (typeof v === "boolean") return v as T[keyof T];
        if (typeof v === "string") return (v === "true") as unknown as T[keyof T];
        if (typeof v === "number") return (v === 1) as unknown as T[keyof T];
        return Boolean(v) as T[keyof T];
      };
    }
  });

  return config;
}