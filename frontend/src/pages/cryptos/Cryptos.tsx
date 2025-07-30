import React from "react";
import { IonContent, IonPage } from "@ionic/react";
import Table from "../../components/tables/Table";
import { MRT_ColumnDef } from "material-react-table";
import * as api from "../../services/api";

type Data = {
  name: string;
  amount: number;
  price: number;
  quantity: number;
  purchaseDate: Date;
  bank: string;
};

const Cryptos: React.FC = () => {

  const [data, setData] = React.useState<Data[]>([]);
  
    React.useEffect(() => {
      const fetchData = async () => {
        try {
          const outflowData = await api.get<Data[]>("/cryptos");
          const parsed = outflowData.map((item) => ({
            ...item,
            purchaseDate: new Date(item.purchaseDate),
          }));
          
          setData(parsed);
        } catch (err) {
          console.error(err);
        }
      };
  
      fetchData();
    }, []);

  const columns = React.useMemo<MRT_ColumnDef<Data>[]>(
    () => [
      { accessorKey: "name", header: "Moeda" },
      { accessorKey: "amount", header: "Valor"},
      { accessorKey: "price", header: "Cotação" },
      { accessorKey: "quantity", header: "Quantidade" },
      {
        accessorKey: "purchaseDate",
        header: "Compra",
        Cell: ({ cell }) => {
          const date = cell.getValue<Date>();
          return date.toLocaleDateString("pt-BR");
        },
      },
      { accessorKey: "bank", header: "Banco" },
    ],
    []
  );

  return (
    <IonPage>
      <IonContent className="ion-padding">
        <div className="h-full min-h-fit flex justify-center items-center">
          <Table columns={columns} data={data} origin="Criptomoeda"/>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default Cryptos;
