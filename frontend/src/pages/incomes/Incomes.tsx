import React, { useMemo, useState } from "react";
import { IonContent, IonPage } from "@ionic/react";
import { Data, useIncomes } from "../../hooks/useIncomes";
import Table from "../../components/table/Table";
import TabTable from "../../components/tabTable/TabTable";
import { MRT_ColumnDef } from "material-react-table";
import { formatDatePtBr } from "../../utils/formatDatePtBr";

const Incomes: React.FC = () => {
  const { data, fetchIncomes, route, currentMonthData } = useIncomes();
  const [validationErrors, setValidationErrors] = useState<
    Record<string, string | undefined>
  >({});

  const columns = useMemo<MRT_ColumnDef<Data>[]>(
    () => [
      {
        accessorKey: "name",
        header: "Receita",
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
        muiEditTextFieldProps: () => ({
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
        }),
      },
    ],
    [validationErrors]
  );

  return (
    <IonPage>
      <IonContent className="ion-padding">
        <TabTable
          childrenMonth={
            <Table
              columns={columns}
              data={currentMonthData}
              origin="Entrada"
              route={route}
              onRefresh={fetchIncomes}
              onValidationError={setValidationErrors}
            />
          }
          childrenTotal={
            <Table
              columns={columns}
              data={data}
              origin="Entrada"
              route={route}
              onRefresh={fetchIncomes}
              onValidationError={setValidationErrors}
            />
          }
        />
      </IonContent>
    </IonPage>
  );
};

export default Incomes;
