import { useState } from "react";
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
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  Tooltip,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import * as api from "../../services/api";
import { normalizeValues } from "../../utils/normalizerValues";
import { createNormalizerConfigFromColumns } from "../../utils/createNormalizerConfigFromColumns";

type Props<T extends object> = {
  columns: MRT_ColumnDef<T>[];
  data: T[];
  origin: string;
  route: string;
  onRefresh?: () => void;
};

const Table = <T extends { [key: string]: unknown }>({
  data,
  columns,
  origin,
  route,
  onRefresh,
}: Props<T>) => {
  const [isLoading, setIsLoading] = useState(false);

  // Função para criar novo registro
  const handleCreateRecord = async (values: T) => {
    setIsLoading(true);
    try {
      await api.post(route, values);

      // Chama a função de refresh se fornecida
      if (onRefresh) {
        onRefresh();
      }
    } catch (error) {
      console.error("Erro ao criar registro:", error);
      // Aqui você pode adicionar tratamento de erro (toast, alert, etc.)
    } finally {
      setIsLoading(false);
    }
  };

  // Função para atualizar registro
  const handleUpdateRecord = async (values: T) => {
    setIsLoading(true);
    try {
      await api.put(`${route}/${values.id}`, values);

      if (onRefresh) {
        onRefresh();
      }
    } catch (error) {
      console.error("Erro ao atualizar registro:", error);
    } finally {
      setIsLoading(false);
    }
  };

  // Função para deletar registro
  const handleDeleteRecord = async (id: string | number) => {
    setIsLoading(true);
    try {
      await api.del(`${route}/${id}`);

      if (onRefresh) {
        onRefresh();
      }
    } catch (error) {
      console.error("Erro ao deletar registro:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const openDeleteConfirmModal = (row: MRT_Row<T>) => {
    if (
      window.confirm(
        `Você tem certeza que quer deletar o registro ${
          row.original.name || "selecionado"
        }?`
      )
    ) {
      handleDeleteRecord(row.original.id as string | number);
    }
  };

  const table = useMaterialReactTable({
    columns,
    data,
    enableEditing: true,
    enableFullScreenToggle: false,
    initialState: {
      density: "compact",
      pagination: { pageSize: 100, pageIndex: 0 },
    },
    state: {
      isLoading,
    },
    mrtTheme: () => ({
      baseBackgroundColor: "rgb(160, 160, 160)",
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
    onCreatingRowSave: async ({ values, table }) => {
      const config = createNormalizerConfigFromColumns(columns);
      const normalizedValues = normalizeValues(values, config);
      await handleCreateRecord(normalizedValues);
      table.setCreatingRow(null);
    },
    onEditingRowSave: async ({ values, row, table }) => {
      const config = createNormalizerConfigFromColumns(columns);
      // Garante que o id do registro original seja mantido
      const normalizedValues = {
        ...normalizeValues(values, config),
        id: row.original.id,
      };
      await handleUpdateRecord(normalizedValues);
      table.setEditingRow(null);
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
