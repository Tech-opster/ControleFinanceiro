import React, { useMemo, useState } from "react";
import { IonContent, IonPage } from "@ionic/react";
import { Data, useOutflows } from "../../hooks/useOutflows";
import { useCategories } from "../../hooks/useCategories";
import Table from "../../components/table/Table";
import TabTable from "../../components/tabTable/TabTable";
import { MRT_ColumnDef } from "material-react-table";
import { formatDatePtBr } from "../../utils/formatDatePtBr";
import { useCurrentMonth } from "../../hooks/useCurrentMonth";

const Outflows: React.FC = () => {
  const { data, fetchOutflows, route } = useOutflows();
  const { dataCategories } = useCategories();
  const [validationErrors, setValidationErrors] = useState<
    Record<string, string | undefined>
  >({});
  const currentMonthData = useCurrentMonth(data);

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
        editSelectOptions: dataCategories.map((cat) => ({
          value: cat.id,
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
    [dataCategories, validationErrors]
  );

  return (
    <IonPage>
      <IonContent className="ion-padding">
        <TabTable
          childrenMonth={
            <Table
              columns={columns}
              data={currentMonthData}
              origin="Saída"
              route={route}
              onRefresh={fetchOutflows}
              onValidationError={setValidationErrors}
              availableCategories={dataCategories}
            />
          }
          childrenTotal={
            <Table
              columns={columns}
              data={data}
              origin="Saída"
              route={route}
              onRefresh={fetchOutflows}
              onValidationError={setValidationErrors}
              availableCategories={dataCategories}
            />
          }
        />
      </IonContent>
    </IonPage>
  );
};

export default Outflows;
