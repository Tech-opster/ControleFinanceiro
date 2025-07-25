import React from "react";
import { IonContent, IonPage } from "@ionic/react";
import Table from "../../components/tables/Table";
import { MRT_ColumnDef } from "material-react-table";
import * as api from "../../services/api";

type Data = {
  despesa: string;
  valor: number;
  data: Date;
  categoria: string;
  status: boolean;
};

const Outflows: React.FC = () => {
  const [data, setData] = React.useState<Data[]>([]);

  React.useEffect(() => {
    const fetchData = async () => {
      try {
        const outflowData = await api.get<Data[]>("/outflows/outflow");
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
      { accessorKey: "despesa", header: "Despesa" },
      { accessorKey: "valor", header: "Valor" },
      {
        accessorKey: "data",
        header: "Data",
        Cell: ({ cell }) => {
          const date = cell.getValue<Date>();
          return date.toLocaleDateString("pt-BR");
        },
      },
      {
        accessorKey: "status",
        header: "Status",
        Cell: ({ cell }) => (cell.getValue<boolean>() ? "Pago" : "Não pago"),
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

export default Outflows;
