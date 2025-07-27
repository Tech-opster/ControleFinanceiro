import React from "react";
import { IonContent, IonPage } from "@ionic/react";
import Table from "../../components/tables/Table";
import { MRT_ColumnDef } from "material-react-table";
import * as api from "../../services/api";

type Data = {
  receita: string;
  valor: number;
  data: Date;
};

const Incomes: React.FC = () => {

  const [data, setData] = React.useState<Data[]>([]);
  
    React.useEffect(() => {
      const fetchData = async () => {
        try {
          const outflowData = await api.get<Data[]>("/incomes");
          const parsed = outflowData.map((item) => ({
            ...item,
            data: new Date(item.data),
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
      { accessorKey: "receita", header: "Receita" },
      { accessorKey: "valor", header: "Valor" },
      {
        accessorKey: "data",
        header: "Data",
        Cell: ({ cell }) => {
          const date = cell.getValue<Date>();
          return date.toLocaleDateString("pt-BR");
        },
      },
    ],
    []
  );

  return (
    <IonPage>
      <IonContent>
        <div className="h-full min-h-fit flex justify-center items-center">
          <Table columns={columns} data={data} />
        </div>
      </IonContent>
    </IonPage>
  );
};

export default Incomes;
