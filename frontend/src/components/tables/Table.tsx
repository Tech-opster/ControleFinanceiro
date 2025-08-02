import { useMemo } from "react";
import {
  MaterialReactTable,
  MRT_EditActionButtons,
  useMaterialReactTable,
  type MRT_ColumnDef,
  type MRT_Row,
} from "material-react-table";
import {
  Box,
  Button,
  darken,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  Tooltip,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

type Props<T extends object> = {
  columns: MRT_ColumnDef<T>[];
  data: T[];
  origin: string;
};

const Table = <T extends { [key: string]: unknown }>({
  data,
  columns,
  origin,
}: Props<T>) => {
  const openDeleteConfirmModal = (row: MRT_Row<T>) => {
    if (
      window.confirm(
        `Você tem certeza que quer deletar o registro ${row.original.name}?`
      )
    ) {
      // deleteRow(row.original.id);
    }
  };

  const table = useMaterialReactTable({
    columns,
    data,
    enableEditing: true,
    enableFullScreenToggle: false,
    initialState: { density: "compact" },
    mrtTheme: (theme) => ({
      baseBackgroundColor: "rgb(160, 160, 160)"
    }),
    muiTablePaperProps: {
      sx: {
        minHeight: "100% !important",
      },
    },
    muiTableContainerProps: {
      sx: {
        width: "100vw !important",
      },
    },
    renderCreateRowDialogContent: ({ table, row, internalEditComponents }) => (
      <>
        <DialogTitle variant="h3">Adicionar {origin}</DialogTitle>
        <DialogContent
          sx={{ display: "flex", flexDirection: "column", gap: "1rem" }}
        >
          {internalEditComponents} {/* or render custom edit components here */}
        </DialogContent>
        <DialogActions>
          <MRT_EditActionButtons variant="text" table={table} row={row} />
        </DialogActions>
      </>
    ),
    renderEditRowDialogContent: ({ table, row, internalEditComponents }) => (
      <>
        <DialogTitle variant="h3">Editar {origin}</DialogTitle>
        <DialogContent
          sx={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}
        >
          {internalEditComponents} {/* or render custom edit components here */}
        </DialogContent>
        <DialogActions>
          <MRT_EditActionButtons variant="text" table={table} row={row} />
        </DialogActions>
      </>
    ),
    renderRowActions: ({ row, table }) => (
      <Box sx={{ display: "flex", gap: "1rem" }}>
        <Tooltip title="Editar">
          <IconButton onClick={() => table.setEditingRow(row)}>
            <EditIcon />
          </IconButton>
        </Tooltip>
        <Tooltip title="Deletar">
          <IconButton color="error" onClick={() => openDeleteConfirmModal(row)}>
            <DeleteIcon />
          </IconButton>
        </Tooltip>
      </Box>
    ),
    renderTopToolbarCustomActions: ({ table }) => (
      <Button
        variant="contained"
        onClick={() => {
          table.setCreatingRow(true);
        }}
      >
        Adicionar {origin}
      </Button>
    ),
  });

  return <MaterialReactTable table={table} />;
};

export default Table;
