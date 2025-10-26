import React, { useMemo, useState } from "react";
import { IonContent, IonPage } from "@ionic/react";
import { Data, useCategories } from "../../hooks/useCategories";
import Table from "../../components/table/Table";
import TabTable from "../../components/tabTable/TabTable";
import { MRT_ColumnDef } from "material-react-table";
import { useCurrentMonth } from "../../hooks/useCurrentMonth";

const Categories: React.FC = () => {
  const { dataCategories, fetchCategories, route } = useCategories();
  const [validationErrors, setValidationErrors] = useState<
    Record<string, string | undefined>
  >({});
  const currentMonthData = useCurrentMonth(dataCategories);

  const columns = useMemo<MRT_ColumnDef<Data>[]>(
    () => [
      {
        accessorKey: "category",
        header: "Categoria",
        meta: { type: "string" },
        muiEditTextFieldProps: {
          required: true,
          error: !!validationErrors?.category,
          helperText: validationErrors?.category,
          onFocus: () =>
            setValidationErrors({
              ...validationErrors,
              category: undefined,
            }),
        },
      },
      {
        accessorKey: "totalAmount",
        header: "Total",
        enableEditing: false,
        muiEditTextFieldProps: {
          hidden: true,
        },
      },
    ],
    [validationErrors]
  );

  return (
    <IonPage>
      <IonContent className="ion-padding">
        <TabTable
          childrenMonth={
            <Table
              columns={columns}
              data={currentMonthData}
              origin="Categoria"
              route={route}
              onRefresh={fetchCategories}
              onValidationError={setValidationErrors}
            />
          }
          childrenTotal={
            <Table
              columns={columns}
              data={dataCategories}
              origin="Categoria"
              route={route}
              onRefresh={fetchCategories}
              onValidationError={setValidationErrors}
            />
          }
        />
      </IonContent>
    </IonPage>
  );
};

export default Categories;
