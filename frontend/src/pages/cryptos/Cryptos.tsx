import React from "react";
import { IonContent, IonPage } from "@ionic/react";
import Table from "../../components/tables/Table";
import { MRT_ColumnDef } from "material-react-table";
import * as api from "../../services/api";

type Data = {
  moeda: string;
  valor: number;
  cotacao: number;
  quantidade: number;
  dataCompra: Date;
};

const Cryptos: React.FC = () => {

  const [data, setData] = React.useState<Data[]>([]);
  
    React.useEffect(() => {
      const fetchData = async () => {
        try {
          const outflowData = await api.get<Data[]>("/cryptos");
          const parsed = outflowData.map((item) => ({
            ...item,
            dataCompra: new Date(item.dataCompra),
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
      { accessorKey: "moeda", header: "Moeda" },
      { accessorKey: "valor", header: "Valor"},
      { accessorKey: "cotacao", header: "Cotação" },
      { accessorKey: "quantidade", header: "Quantidade" },
      {
        accessorKey: "dataCompra",
        header: "Compra",
        Cell: ({ cell }) => {
          const date = cell.getValue<Date>();
          return date.toLocaleDateString("pt-BR");
        },
      },
      { accessorKey: "banco", header: "Banco" },
    ],
    []
  );

  return (
    <IonPage>
      <IonContent className="ion-padding">
        <div className="h-full min-h-fit flex justify-center items-center">
          <Table columns={columns} data={data} />
        </div>
      </IonContent>
    </IonPage>
  );
};

export default Cryptos;
