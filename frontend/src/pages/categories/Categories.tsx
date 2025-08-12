import React from "react";
import { IonContent, IonPage } from "@ionic/react";
import Table from "../../components/tables/Table";
import { MRT_ColumnDef } from "material-react-table";
import * as api from "../../services/api";

type Data = {
  category: string;
};

const Categories: React.FC = () => {
  const [data, setData] = React.useState<Data[]>([]);

  const fetchData = async () => {
    try {
      const outflowData = await api.get<Data[]>("/categories");
      const parsed = outflowData.map((item) => ({
        ...item,
        name: item.category,
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
    () => [{ accessorKey: "category", header: "Categoria" }],
    []
  );

  return (
    <IonPage>
      <IonContent className="ion-padding">
        <div className="h-full min-h-fit flex justify-center items-center">
          <Table columns={columns} data={data} origin="Categoria" />
        </div>
      </IonContent>
    </IonPage>
  );
};

export default Categories;
