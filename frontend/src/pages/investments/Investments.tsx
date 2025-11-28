import React, { useMemo, useState } from "react";
import { IonContent, IonPage } from "@ionic/react";
import { Data, useInvestments } from "../../hooks/useInvestments";
import Table from "../../components/table/Table";
import { MRT_ColumnDef } from "material-react-table";
import { formatDatePtBr } from "../../utils/formatDatePtBr";

const Investments: React.FC = () => {
  const { data, fetchInvestments, route } = useInvestments();
  const [validationErrors, setValidationErrors] = useState<
    Record<string, string | undefined>
  >({});

  const columns = useMemo<MRT_ColumnDef<Data>[]>(
    () => [
      {
        accessorKey: "name",
        header: "Emissor",
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
        accessorKey: "investmentType",
        header: "Título",
        meta: { type: "string" },
        muiEditTextFieldProps: {
          required: true,
          error: !!validationErrors?.investmentType,
          helperText: validationErrors?.investmentType,
          onFocus: () =>
            setValidationErrors({
              ...validationErrors,
              investmentType: undefined,
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
        accessorKey: "purchaseDate",
        header: "Compra",
        meta: { type: "date" },
        Cell: ({ cell }) => {
          const v = cell.getValue<Date | string | null>();
          return formatDatePtBr(v);
        },
        muiEditTextFieldProps: {
          type: "date",
          required: true,
          error: !!validationErrors?.purchaseDate,
          helperText: validationErrors?.purchaseDate,
          onFocus: () =>
            setValidationErrors({
              ...validationErrors,
              purchaseDate: undefined,
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
        accessorKey: "dueDate",
        header: "Vencimento",
        meta: { type: "date" },
        Cell: ({ cell }) => {
          const v = cell.getValue<Date | string | null>();
          return formatDatePtBr(v);
        },
        muiEditTextFieldProps: {
          type: "date",
          required: true,
          error: !!validationErrors?.dueDate,
          helperText: validationErrors?.dueDate,
          onFocus: () =>
            setValidationErrors({
              ...validationErrors,
              dueDate: undefined,
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
        accessorKey: "yieldValue",
        header: "Rentabilidade",
        meta: { type: "number" },
        muiEditTextFieldProps: {
          type: "number",
          required: true,
          error: !!validationErrors?.yieldValue,
          helperText: validationErrors?.yieldValue,
          onFocus: () =>
            setValidationErrors({
              ...validationErrors,
              yieldValue: undefined,
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
        accessorKey: "yieldType",
        header: "Tipo",
        meta: { type: "string" },
        muiEditTextFieldProps: {
          required: true,
          error: !!validationErrors?.yieldType,
          helperText: validationErrors?.yieldType,
          onFocus: () =>
            setValidationErrors({
              ...validationErrors,
              yieldType: undefined,
            }),
        },
      },
      {
        accessorKey: "bank",
        header: "Banco",
        meta: { type: "string" },
        muiEditTextFieldProps: {
          required: true,
          error: !!validationErrors?.bank,
          helperText: validationErrors?.bank,
          onFocus: () =>
            setValidationErrors({
              ...validationErrors,
              bank: undefined,
            }),
        },
      },
    ],
    [validationErrors]
  );

  return (
    <IonPage>
      <IonContent className="ion-padding">
          <Table
            columns={columns}
            data={data}
            origin="Investimento"
            route={route}
            onRefresh={fetchInvestments}
            onValidationError={setValidationErrors}
          />
      </IonContent>
    </IonPage>
  );
};

export default Investments;
