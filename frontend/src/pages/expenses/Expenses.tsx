import React from "react";
import { IonContent, IonPage } from "@ionic/react";
import Table from "../../components/tables/Table";
import { MRT_ColumnDef } from "material-react-table";
import * as api from "../../services/api";

type Data = {
  categoria: string;
};

const Expenses: React.FC = () => {
  const [data, setData] = React.useState<Data[]>([]);

  React.useEffect(() => {
    const fetchData = async () => {
      try {
        const outflowData = await api.get<Data[]>("/expenses");
        const parsed = outflowData.map((item) => ({
          ...item,
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
      { accessorKey: "categoria", header: "Categoria" },
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

export default Expenses;
