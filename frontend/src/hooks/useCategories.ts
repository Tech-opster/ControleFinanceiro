import { useEffect, useState } from "react";
import * as api from "../services/api";

export type Data = {
  id: string | number;
  category: string;
};

export const useCategories = () => {
  const route = "/categories";
  const [dataCategories, setDataCategories] = useState<Data[]>([]);

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const categoryData = await api.get<Data[]>(route);
      const parsed = categoryData.map((item, idx) => ({
        ...item,
        id: item.id ?? idx,
      }));

      setDataCategories(parsed);
    } catch (err) {
      console.error(err);
    }
  };

  return { dataCategories, fetchCategories, route };
};
