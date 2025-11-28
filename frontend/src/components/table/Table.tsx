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
  ListItemIcon,
  MenuItem,
  Tooltip,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import * as api from "../../services/api";
import { normalizeValues } from "../../utils/normalizerValues";
import { createNormalizerConfigFromColumns } from "../../utils/createNormalizerConfigFromColumns";
import {
  getInvalidFields,
  validateRequired,
} from "../../utils/validateRequired";
import { checkEditableValues } from "../../utils/checkEditableValues";

type Props<T extends object> = {
  columns: MRT_ColumnDef<T>[];
  data: T[];
  origin: string;
  route: string;
  onRefresh?: () => void;
  onValidationError?: (errors: Record<string, string>) => void;
  availableCategories?: Array<{ id: number | string; category: string }>;
};

const Table = <T extends { [key: string]: unknown }>({
  data,
  columns,
  origin,
  route,
  onRefresh,
  onValidationError,
  availableCategories = [],
}: Props<T>) => {
  const [isLoading, setIsLoading] = useState(false);

  const handleCreateRecord = async (values: T) => {
    setIsLoading(true);
    try {
      await api.post(route, values);

      if (onRefresh) {
        onRefresh();
      }
    } catch (error) {
      console.error("Erro ao criar registro:", error);
      // adicionar tratamento de erro (toast, alert, etc.)
    } finally {
      setIsLoading(false);
    }
  };

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

  const isCategoryValid = (item: T): boolean => {
    if (availableCategories.length === 0) return true;

    const categoryValue = item["categoryId"];
    if (!categoryValue) return false;

    return availableCategories.some((cat) => cat.id === categoryValue);
  };

  const table = useMaterialReactTable({
    columns,
    data,
    // enableEditing: true,
    enableFullScreenToggle: false,
    enableColumnOrdering: true,
    enableRowVirtualization: true,
    enablePagination: false,
    enableRowActions: true,
    // enableRowSelection: true,
    initialState: {
      density: "compact",
      pagination: { pageSize: 100, pageIndex: 0 },
      columnPinning: {
        left: ["mrt-row-actions"],
      },
    },
    displayColumnDefOptions: {
      "mrt-row-actions": {
        header: "Ações",
      },
    },
    state: {
      isLoading,
    },
    mrtTheme: () => ({
      baseBackgroundColor: "rgb(160, 160, 160)",
    }),
    muiTablePaperProps: {
      sx: {
        height: "100%",
        display: "flex",
        flexDirection: "column",
      },
    },
    muiBottomToolbarProps: {
      sx: { justifyContent: "end", alignItems: "center" },
    },
    renderBottomToolbarCustomActions: () => (
      <div>Registros totais: {data.length.toLocaleString("pt-BR")}</div>
    ),
    onCreatingRowSave: async ({ values, table }) => {
      const checkedEditableValues = checkEditableValues(values, columns);
      const config = createNormalizerConfigFromColumns(columns);
      const normalizedValues = normalizeValues(checkedEditableValues, config);

      if (!validateRequired(normalizedValues)) {
        if (onValidationError) {
          const errors: Record<string, string> = {};
          getInvalidFields(normalizedValues).forEach((field) => {
            errors[field] = "Campo obrigatório";
          });
          onValidationError(errors);
        }
        return;
      }

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

      if (
        !validateRequired(normalizedValues) ||
        !isCategoryValid(normalizedValues)
      ) {
        if (onValidationError) {
          const errors: Record<string, string> = {};

          if (!validateRequired(normalizedValues)) {
            getInvalidFields(normalizedValues).forEach((field) => {
              errors[field] = "Campo obrigatório";
            });
          }

          if (!isCategoryValid(normalizedValues)) {
            errors["categoryId"] = "Campo obrigatório";
          }

          onValidationError(errors);
        }
        return;
      }

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
    renderRowActionMenuItems: ({ closeMenu, row, table }) => [
      <MenuItem
        key={0}
        onClick={() => {
          closeMenu();
        }}
        sx={{ m: 0 }}
      >
        <Tooltip title="Editar" placement="right">
          <IconButton
            onClick={() => {
              onValidationError?.({});
              table.setEditingRow(row);
            }}
          >
            <EditIcon />
          </IconButton>
        </Tooltip>
      </MenuItem>,
      <MenuItem
        key={1}
        onClick={() => {
          closeMenu();
        }}
        sx={{ m: 0 }}
      >
        <Tooltip title="Deletar" placement="right">
          <IconButton color="error" onClick={() => openDeleteConfirmModal(row)}>
            <DeleteIcon />
          </IconButton>
        </Tooltip>
      </MenuItem>,
    ],
    renderTopToolbarCustomActions: ({ table }) => (
      <Button
        variant="contained"
        onClick={() => {
          onValidationError?.({});
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
