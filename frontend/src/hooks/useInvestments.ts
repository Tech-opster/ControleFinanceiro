import { useEffect, useState } from "react";
import * as api from "../services/api";

export type Data = {
  id: string | number;
  name: string;
  investmentType: string;
  amount: number;
  purchaseDate: Date | string;
  dueDate: Date | string;
  yieldValue: number;
  yieldType: string;
  bank: string;
};

export const useInvestments = () => {
  const route = "/investments";
  const [data, setData] = useState<Data[]>([]);

  useEffect(() => {
    fetchInvestments();
  }, []);

  const fetchInvestments = async () => {
    try {
      const investmentData = await api.get<Data[]>(route);
      const parsed = investmentData.map((item, idx) => ({
        ...item,
        purchaseDate: new Date(item.purchaseDate).toISOString().split("T")[0],
        dueDate: new Date(item.dueDate).toISOString().split("T")[0],
        id: item.id ?? idx,
      }));

      setData(parsed);
    } catch (err) {
      console.error(err);
    }
  };

  return { data, fetchInvestments, route };
};
