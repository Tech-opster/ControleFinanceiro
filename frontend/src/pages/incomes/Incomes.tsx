import React from "react";
import { IonContent, IonPage } from "@ionic/react";
import Table from "../../components/tables/Table";
import { MRT_ColumnDef } from "material-react-table";

type Data = {
  receita: string;
  valor: number;
  data: Date;
};

const Incomes: React.FC = () => {
  const teste: Data[] = [
    { receita: "Salário", valor: 10000, data: new Date()},
    { receita: "Cashback", valor: 200, data: new Date()},
  ];

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
          <Table columns={columns} data={teste || []} />
        </div>
      </IonContent>
    </IonPage>
  );
};

export default Incomes;
