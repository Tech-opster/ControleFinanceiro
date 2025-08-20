import React from "react";
import { IonContent, IonPage } from "@ionic/react";
import Table from "../../components/tables/Table";
import { MRT_ColumnDef } from "material-react-table";
import * as api from "../../services/api";

type Data = {
  id: string | number;
  name: string;
  quantity: number;
  dueDate: Date;
  issuer: string;
};

const Rewards: React.FC = () => {
  const [data, setData] = React.useState<Data[]>([]);
  const route = "/rewards";

  const fetchData = async () => {
    try {
      const outflowData = await api.get<Data[]>(route);
      const parsed = outflowData.map((item, idx) => ({
        ...item,
        dueDate: new Date(item.dueDate),
        id: item.id ?? idx,
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
      { accessorKey: "name", header: "Programa", meta: { type: "string" } },
      { accessorKey: "quantity", header: "Quantidade", meta: { type: "number" } },
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
      { accessorKey: "issuer", header: "Emissor", meta: { type: "string" } },
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
            origin="Pontuação"
            route={route}
            onRefresh={fetchData}
          />
        </div>
      </IonContent>
    </IonPage>
  );
};

export default Rewards;
