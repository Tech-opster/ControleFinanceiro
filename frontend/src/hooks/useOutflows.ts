import { useEffect, useState } from "react";
import { useIonLoading } from "@ionic/react";
import * as api from "../services/api";

export type Data = {
  id: string | number;
  name: string;
  amount: number;
  date: Date | string;
  categoryId: number;
  status: boolean;
  category: {
    id: number;
    category: string;
  };
};

export const useOutflows = () => {
  const route = "/outflows";
  const [data, setData] = useState<Data[]>([]);
  const [present, dismiss] = useIonLoading();

  useEffect(() => {
    fetchOutflows();
  }, []);

  const fetchOutflows = async (all?: boolean) => {
    try {
      await present();

      const query = all ? "?all=true" : "";
      const outflowData = await api.get<Data[]>(`${route}${query}`);
      const parsed = outflowData.map((item, idx) => ({
        ...item,
        date: new Date(item.date).toISOString().split("T")[0],
        id: item.id ?? idx,
      }));

      setData(parsed);
    } catch (err) {
      console.error(err);
    } finally {
      await dismiss();
    }
  };

  return { data, fetchOutflows, route };
};
