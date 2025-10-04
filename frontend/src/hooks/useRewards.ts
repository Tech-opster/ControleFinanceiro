import { useEffect, useState } from "react";
import * as api from "../services/api";

export type Data = {
  id: string | number;
  name: string;
  quantity: number;
  dueDate: Date | string;
  issuer: string;
};

export const useRewards = () => {
  const route = "/rewards";
  const [data, setData] = useState<Data[]>([]);

  useEffect(() => {
    fetchRewards();
  }, []);

  const fetchRewards = async () => {
    try {
      const rewardData = await api.get<Data[]>(route);
      const parsed = rewardData.map((item, idx) => ({
        ...item,
        dueDate: new Date(item.dueDate).toISOString().split("T")[0],
        id: item.id ?? idx,
      }));

      setData(parsed);
    } catch (err) {
      console.error(err);
    }
  };

  return { data, fetchRewards, route };
};
