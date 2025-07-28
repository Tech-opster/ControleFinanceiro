import React from "react";
import { IonContent, IonPage } from "@ionic/react";
import Table from "../../components/tables/Table";
import { MRT_ColumnDef } from "material-react-table";
import * as api from "../../services/api";

type Data = {
  issuer: string;
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
  
    React.useEffect(() => {
      const fetchData = async () => {
        try {
          const outflowData = await api.get<Data[]>("/investments");
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
  
      fetchData();
    }, []);

  const columns = React.useMemo<MRT_ColumnDef<Data>[]>(
    () => [
      { accessorKey: "issuer", header: "Emissor" },
      { accessorKey: "investmentType", header: "Título" },
      { accessorKey: "amount", header: "Valor"},
      {
        accessorKey: "purchaseDate",
        header: "Compra",
        Cell: ({ cell }) => {
          const date = cell.getValue<Date>();
          return date.toLocaleDateString("pt-BR");
        },
      },
      {
        accessorKey: "dueDate",
        header: "Vencimento",
        Cell: ({ cell }) => {
          const date = cell.getValue<Date>();
          return date.toLocaleDateString("pt-BR");
        },
      },
      { accessorKey: "yieldValue", header: "Rentabilidade" },
      { accessorKey: "yieldType", header: "Tipo" },
      { accessorKey: "bank", header: "Banco" },
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

export default Investments;
