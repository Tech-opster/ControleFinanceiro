import React, { useEffect, useMemo, useState } from "react";
import { IonContent, IonPage } from "@ionic/react";
import Table from "../../components/tables/Table";
import { MRT_ColumnDef } from "material-react-table";
import * as api from "../../services/api";
import { formatDatePtBr } from "../../utils/formatDatePtBr";

type Data = {
  id: string | number;
  name: string;
  quantity: number;
  dueDate: Date | string;
  issuer: string;
};

const Rewards: React.FC = () => {
  const [data, setData] = useState<Data[]>([]);
  const [validationErrors, setValidationErrors] = useState<
    Record<string, string | undefined>
  >({});
  const route = "/rewards";

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const outflowData = await api.get<Data[]>(route);
      const parsed = outflowData.map((item, idx) => ({
        ...item,
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
            onRefresh={fetchData}
            onValidationError={handleValidationError}
          />
        </div>
      </IonContent>
    </IonPage>
  );
};

export default Rewards;
