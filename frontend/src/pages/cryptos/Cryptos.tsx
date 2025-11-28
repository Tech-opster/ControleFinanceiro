import React, { useMemo, useState } from "react";
import { IonContent, IonPage } from "@ionic/react";
import { Data, useCryptos } from "../../hooks/useCryptos";
import Table from "../../components/table/Table";
import { MRT_ColumnDef } from "material-react-table";
import { formatDatePtBr } from "../../utils/formatDatePtBr";

const Cryptos: React.FC = () => {
  const { data, fetchCryptos, route } = useCryptos();
  const [validationErrors, setValidationErrors] = useState<
    Record<string, string | undefined>
  >({});

  const columns = useMemo<MRT_ColumnDef<Data>[]>(
    () => [
      {
        accessorKey: "name",
        header: "Moeda",
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
        accessorKey: "price",
        header: "Cotação",
        meta: { type: "number" },
        muiEditTextFieldProps: {
          type: "number",
          required: true,
          error: !!validationErrors?.price,
          helperText: validationErrors?.price,
          onFocus: () =>
            setValidationErrors({
              ...validationErrors,
              price: undefined,
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
        accessorKey: "quantity",
        header: "Quantidade",
        meta: { type: "number" },
        muiEditTextFieldProps: {
          type: "number",
          required: true,
          error: !!validationErrors?.quantity,
          helperText: validationErrors?.quantity,
          onFocus: () =>
            setValidationErrors({
              ...validationErrors,
              quantity: undefined,
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
            origin="Criptomoeda"
            route={route}
            onRefresh={fetchCryptos}
            onValidationError={setValidationErrors}
          />
      </IonContent>
    </IonPage>
  );
};

export default Cryptos;
