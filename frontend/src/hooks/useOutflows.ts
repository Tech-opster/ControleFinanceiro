import { useEffect, useState } from "react";
import * as api from "../services/api";
import { useCurrentMonth } from "./useCurrentMonth";

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
  const currentMonthData = useCurrentMonth(data);

  useEffect(() => {
    fetchOutflows();
  }, []);

  const fetchOutflows = async () => {
    try {
      const outflowData = await api.get<Data[]>(route);
      const parsed = outflowData.map((item, idx) => ({
        ...item,
        date: new Date(item.date).toISOString().split("T")[0],
        id: item.id ?? idx,
      }));

      setData(parsed);
    } catch (err) {
      console.error(err);
    }
  };

  return { data, fetchOutflows, route, currentMonthData };
};
