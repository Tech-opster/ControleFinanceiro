import React from "react";
import { IonContent, IonPage } from "@ionic/react";
import Table from "../../components/tables/Table";
import { MRT_ColumnDef } from "material-react-table";
import * as api from "../../services/api";

type Data = {
  name: string;
  investmentType: string;
  amount: number;
  purchaseDate: Date;
  dueDate: Date;
  yieldValue: number;
  yieldType: string;
  bank: string;
};

const Investments: React.FC = () => {
  const [data, setData] = React.useState<Data[]>([]);
  const route = "/investments";

  const fetchData = async () => {
    try {
      const outflowData = await api.get<Data[]>(route);
      const parsed = outflowData.map((item) => ({
        ...item,
        purchaseDate: new Date(item.purchaseDate),
        dueDate: new Date(item.dueDate),
      }));

      setData(parsed);
    } catch (err) {
      console.error(err);
    }
  };

  React.useEffect(() => {
    fetchData();
  }, []);

  const columns = React.useMemo<MRT_ColumnDef<Data>[]>(
    () => [
      { accessorKey: "name", header: "Emissor", meta: { type: "string" } },
      { accessorKey: "investmentType", header: "Título", meta: { type: "string" } },
      { accessorKey: "amount", header: "Valor", meta: { type: "number" } },
      {
        accessorKey: "purchaseDate",
        header: "Compra",
        meta: { type: "date" },
        Cell: ({ cell }) => {
          const date = cell.getValue<Date>();
          return date.toLocaleDateString("pt-BR");
        },
        muiEditTextFieldProps: {
          type: "date",
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
          const date = cell.getValue<Date>();
          return date.toLocaleDateString("pt-BR");
        },
        muiEditTextFieldProps: {
          type: "date",
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
      { accessorKey: "yieldValue", header: "Rentabilidade", meta: { type: "number" } },
      { accessorKey: "yieldType", header: "Tipo", meta: { type: "string" } },
      { accessorKey: "bank", header: "Banco", meta: { type: "string" } },
    ],
    []
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
          />
        </div>
      </IonContent>
    </IonPage>
  );
};

export default Investments;
