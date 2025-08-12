import React from "react";
import { IonContent, IonPage } from "@ionic/react";
import Table from "../../components/tables/Table";
import { MRT_ColumnDef } from "material-react-table";
import * as api from "../../services/api";

type Data = {
  name: string;
  amount: number;
  date: Date;
};

const Incomes: React.FC = () => {
  const [data, setData] = React.useState<Data[]>([]);

  const fetchData = async () => {
    try {
      const outflowData = await api.get<Data[]>("/incomes");
      const parsed = outflowData.map((item) => ({
        ...item,
        date: new Date(item.date),
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
      { accessorKey: "name", header: "Receita" },
      { accessorKey: "amount", header: "Valor" },
      {
        accessorKey: "date",
        header: "Data",
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
    ],
    []
  );

  return (
    <IonPage>
      <IonContent className="ion-padding">
        <div className="h-full min-h-fit flex justify-center items-center">
          <Table columns={columns} data={data} origin="Entrada" />
        </div>
      </IonContent>
    </IonPage>
  );
};

export default Incomes;
