import { useEffect, useState } from "react";
import * as api from "../services/api";

export type Data = {
  id: string | number;
  name: string;
  amount: number;
  date: Date | string;
};

export const useIncomes = () => {
  const route = "/incomes";
  const [data, setData] = useState<Data[]>([]);

  useEffect(() => {
    fetchIncomes();
  }, []);

  const fetchIncomes = async () => {
    try {
      const incomeData = await api.get<Data[]>(route);
      const parsed = incomeData.map((item, idx) => ({
        ...item,
        date: new Date(item.date).toISOString().split("T")[0],
        id: item.id ?? idx,
      }));

      setData(parsed);
    } catch (err) {
      console.error(err);
    }
  };

  return { data, fetchIncomes, route };
};
