import React from "react";
import { IonContent, IonPage } from "@ionic/react";
import Table from "../../components/tables/Table";
import { MRT_ColumnDef } from "material-react-table";
import * as api from "../../services/api";

type Data = {
  programa: string;
  quantidade: number;
  dataVencimento: Date;
  emissor: string;
};

const Rewards: React.FC = () => {

  const [data, setData] = React.useState<Data[]>([]);
  
    React.useEffect(() => {
      const fetchData = async () => {
        try {
          const outflowData = await api.get<Data[]>("/rewards");
          const parsed = outflowData.map((item) => ({
            ...item,
            dataVencimento: new Date(item.dataVencimento),
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
      { accessorKey: "programa", header: "Programa" },
      { accessorKey: "quantidade", header: "Quantidade" },
      {
        accessorKey: "dataVencimento",
        header: "Vencimento",
        Cell: ({ cell }) => {
          const date = cell.getValue<Date>();
          return date.toLocaleDateString("pt-BR");
        },
      },
      { accessorKey: "emissor", header: "Emissor" },
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

export default Rewards;
