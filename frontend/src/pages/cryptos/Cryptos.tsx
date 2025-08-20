import React from "react";
import { IonContent, IonPage } from "@ionic/react";
import Table from "../../components/tables/Table";
import { MRT_ColumnDef } from "material-react-table";
import * as api from "../../services/api";

type Data = {
  id: string | number;
  name: string;
  amount: number;
  price: number;
  quantity: number;
  purchaseDate: Date;
  bank: string;
};

const Cryptos: React.FC = () => {
  const [data, setData] = React.useState<Data[]>([]);
  const route = "/cryptos";

  const fetchData = async () => {
    try {
      const outflowData = await api.get<Data[]>(route);
      const parsed = outflowData.map((item, idx) => ({
        ...item,
        purchaseDate: new Date(item.purchaseDate),
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
      { accessorKey: "name", header: "Moeda", meta: { type: "string" } },
      { accessorKey: "amount", header: "Valor", meta: { type: "number" } },
      { accessorKey: "price", header: "Cotação", meta: { type: "number" } },
      { accessorKey: "quantity", header: "Quantidade", meta: { type: "number" } },
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
            origin="Criptomoeda"
            route={route}
            onRefresh={fetchData}
          />
        </div>
      </IonContent>
    </IonPage>
  );
};

export default Cryptos;
