import React from "react";
import { IonContent, IonPage } from "@ionic/react";
import Table from "../../components/tables/Table";
import { MRT_ColumnDef } from "material-react-table";
import * as api from "../../services/api";

type Data = {
  id: string | number;
  name: string;
  amount: number;
  date: Date;
  categoryId: number;
  status: boolean;
  category: {
    id: number;
    category: string;
  };
};

const Outflows: React.FC = () => {
  const [data, setData] = React.useState<Data[]>([]);
  const [categories, setCategories] = React.useState<
    { id: number; category: string }[]
  >([]);
  const route = "/outflows";

  const fetchData = async () => {
    try {
      const outflowData = await api.get<Data[]>(route);
      const parsed = outflowData.map((item, idx) => ({
        ...item,
        date: new Date(item.date),
        id: item.id ?? idx,
      }));

      setData(parsed);
    } catch (err) {
      console.error(err);
    }
  };

  const fetchCategories = async () => {
    try {
      const categoryData = await api.get<{ id: number; category: string }[]>(
        "/categories"
      );
      setCategories(categoryData);
    } catch (err) {
      console.error("Erro ao buscar categorias:", err);
    }
  };

  React.useEffect(() => {
    fetchData();
    fetchCategories();
  }, []);

  const columns = React.useMemo<MRT_ColumnDef<Data>[]>(
    () => [
      { accessorKey: "name", header: "Despesa", meta: { type: "string" } },
      { accessorKey: "amount", header: "Valor", meta: { type: "number" } },
      {
        accessorKey: "date",
        header: "Data",
        meta: { type: "date" },
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
      {
        accessorKey: "categoryId",
        header: "Categoria",
        meta: { type: "number" },
        Cell: ({ row }) => {
          return row.original.category?.category || "Sem categoria";
        },
        editSelectOptions: categories.map((cat) => ({
          value: cat.id.toString(),
          label: cat.category,
        })),
        muiEditTextFieldProps: {
          select: true,
        },
      },
      {
        accessorKey: "status",
        header: "Situação",
        meta: { type: "boolean" },
        Cell: ({ cell }) => (cell.getValue<boolean>() ? "Pago" : "Não pago"),
        editVariant: "select",
        editSelectOptions: [
          { value: "true", label: "Pago" },
          { value: "false", label: "Não pago" },
        ],
        muiEditTextFieldProps: {
          select: true,
        },
      },
    ],
    [categories]
  );

  return (
    <IonPage>
      <IonContent className="ion-padding">
        <div className="h-full min-h-fit flex justify-center items-center">
          <Table
            columns={columns}
            data={data}
            origin="Saída"
            route={route}
            onRefresh={fetchData}
          />
        </div>
      </IonContent>
    </IonPage>
  );
};

export default Outflows;
