import React, { useEffect, useMemo, useState } from "react";
import { IonContent, IonPage } from "@ionic/react";
import Table from "../../components/tables/Table";
import { MRT_ColumnDef } from "material-react-table";
import * as api from "../../services/api";
import { formatDatePtBr } from "../../utils/formatDatePtBr";

type Data = {
  id: string | number;
  name: string;
  investmentType: string;
  amount: number;
  purchaseDate: Date | string;
  dueDate: Date | string;
  yieldValue: number;
  yieldType: string;
  bank: string;
};

const Investments: React.FC = () => {
  const [data, setData] = useState<Data[]>([]);
  const [validationErrors, setValidationErrors] = useState<
    Record<string, string | undefined>
  >({});
  const route = "/investments";

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const outflowData = await api.get<Data[]>(route);
      const parsed = outflowData.map((item, idx) => ({
        ...item,
        purchaseDate: new Date(item.purchaseDate).toISOString().split("T")[0],
        dueDate: new Date(item.dueDate).toISOString().split("T")[0],
        id: item.id ?? idx,
      }));

      setData(parsed);
    } catch (err) {
      console.error(err);
    }
  };

  const handleValidationError = (errors: Record<string, string>) => {
    setValidationErrors(errors);
  };

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
        <div className="h-full min-h-fit flex justify-center items-center">
          <Table
            columns={columns}
            data={data}
            origin="Investimento"
            route={route}
            onRefresh={fetchData}
            onValidationError={handleValidationError}
          />
        </div>
      </IonContent>
    </IonPage>
  );
};

export default Investments;
