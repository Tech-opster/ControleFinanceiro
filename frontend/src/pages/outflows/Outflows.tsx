import React, { useEffect, useMemo, useState } from "react";
import { IonContent, IonPage } from "@ionic/react";
import Table from "../../components/tables/Table";
import { MRT_ColumnDef } from "material-react-table";
import * as api from "../../services/api";
import { formatDatePtBr } from "../../utils/formatDatePtBr";

type Data = {
  id: string | number;
  name: string;
  amount: number;
  date: Date | string;
  categoryId: number;
  status: boolean;
  category: {
    id: number;
    category: string;
  };
};

const Outflows: React.FC = () => {
  const [data, setData] = useState<Data[]>([]);
  const [categories, setCategories] = React.useState<
    { id: number; category: string }[]
  >([]);
  const [validationErrors, setValidationErrors] = useState<
    Record<string, string | undefined>
  >({});
  const route = "/outflows";

  useEffect(() => {
    fetchData();
    fetchCategories();
  }, []);

  const fetchData = async () => {
    try {
      const outflowData = await api.get<Data[]>(route);
      const parsed = outflowData.map((item, idx) => ({
        ...item,
        date: new Date(item.date).toISOString().split("T")[0],
        id: item.id ?? idx,
      }));

      setData(parsed);
    } catch (err) {
      console.error(err);
    }
  };

  const fetchCategories = async () => {
    try {
      const categoryData = await api.get<{ id: number; category: string }[]>(
        "/categories"
      );
      setCategories(categoryData);
    } catch (err) {
      console.error("Erro ao buscar categorias:", err);
    }
  };

  const handleValidationError = (errors: Record<string, string>) => {
    setValidationErrors(errors);
  };

  const columns = useMemo<MRT_ColumnDef<Data>[]>(
    () => [
      {
        accessorKey: "name",
        header: "Despesa",
        meta: { type: "string" },
        muiEditTextFieldProps: {
          required: true,
          error: !!validationErrors?.name,
          helperText: validationErrors?.name,
          onFocus: () =>
            setValidationErrors({
              ...validationErrors,
              name: undefined,
            }),
        },
      },
      {
        accessorKey: "amount",
        header: "Valor",
        meta: { type: "number" },
        muiEditTextFieldProps: {
          type: "number",
          required: true,
          error: !!validationErrors?.amount,
          helperText: validationErrors?.amount,
          onFocus: () =>
            setValidationErrors({
              ...validationErrors,
              amount: undefined,
            }),
          inputProps: {
            style: {
              colorScheme: "light",
            },
            min: 0,
          },
        },
      },
      {
        accessorKey: "date",
        header: "Data",
        meta: { type: "date" },
        Cell: ({ cell }) => {
          const v = cell.getValue<Date | string | null>();
          return formatDatePtBr(v);
        },
        muiEditTextFieldProps: {
          type: "date",
          required: true,
          error: !!validationErrors?.date,
          helperText: validationErrors?.date,
          onFocus: () =>
            setValidationErrors({
              ...validationErrors,
              date: undefined,
            }),
          InputLabelProps: {
            shrink: true,
          },
          inputProps: {
            style: {
              colorScheme: "light",
            },
          },
        },
      },
      {
        accessorKey: "categoryId",
        header: "Categoria",
        meta: { type: "number" },
        Cell: ({ row }) => {
          return row.original.category?.category || "Sem categoria";
        },
        editSelectOptions: categories.map((cat) => ({
          value: cat.id.toString(),
          label: cat.category,
        })),
        muiEditTextFieldProps: {
          required: true,
          select: true,
          error: !!validationErrors?.categoryId,
          helperText: validationErrors?.categoryId,
          onFocus: () =>
            setValidationErrors({
              ...validationErrors,
              categoryId: undefined,
            }),
        },
      },
      {
        accessorKey: "status",
        header: "Situação",
        meta: { type: "boolean" },
        Cell: ({ cell }) => (cell.getValue<boolean>() ? "Pago" : "Não pago"),
        editVariant: "select",
        editSelectOptions: [
          { value: "true", label: "Pago" },
          { value: "false", label: "Não pago" },
        ],
        muiEditTextFieldProps: {
          required: true,
          select: true,
          error: !!validationErrors?.status,
          helperText: validationErrors?.status,
          onFocus: () =>
            setValidationErrors({
              ...validationErrors,
              status: undefined,
            }),
        },
      },
    ],
    [categories, validationErrors]
  );

  return (
    <IonPage>
      <IonContent className="ion-padding">
        <div className="h-full min-h-fit flex justify-center items-center">
          <Table
            columns={columns}
            data={data}
            origin="Saída"
            route={route}
            onRefresh={fetchData}
            onValidationError={handleValidationError}
            availableCategories={categories}
          />
        </div>
      </IonContent>
    </IonPage>
  );
};

export default Outflows;
