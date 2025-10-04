import React, { useMemo, useState } from "react";
import { IonContent, IonPage } from "@ionic/react";
import { Data, useRewards } from "../../hooks/useRewards";
import Table from "../../components/table/Table";
import { MRT_ColumnDef } from "material-react-table";
import { formatDatePtBr } from "../../utils/formatDatePtBr";

const Rewards: React.FC = () => {
  const { data, fetchRewards, route } = useRewards();
  const [validationErrors, setValidationErrors] = useState<
    Record<string, string | undefined>
  >({});

  const columns = useMemo<MRT_ColumnDef<Data>[]>(
    () => [
      {
        accessorKey: "name",
        header: "Programa",
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
        accessorKey: "issuer",
        header: "Emissor",
        meta: { type: "string" },
        muiEditTextFieldProps: {
          required: true,
          error: !!validationErrors?.issuer,
          helperText: validationErrors?.issuer,
          onFocus: () =>
            setValidationErrors({
              ...validationErrors,
              issuer: undefined,
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
            origin="Pontuação"
            route={route}
            onRefresh={fetchRewards}
            onValidationError={setValidationErrors}
          />
        </div>
      </IonContent>
    </IonPage>
  );
};

export default Rewards;
