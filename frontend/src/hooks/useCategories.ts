import { useEffect, useState } from "react";
import * as api from "../services/api";

export type Data = {
  id: string | number;
  category: string;
  totalAmount: string;
};

export const useCategories = () => {
  const route = "/categories";
  const [dataCategories, setDataCategories] = useState<Data[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async (all?: boolean) => {
    try {
      setIsLoading(true);

      const query = all ? "?all=true" : "";
      const categoryData = await api.get<Data[]>(`${route}${query}`);
      const parsed = categoryData.map((item, idx) => ({
        ...item,
        id: item.id ?? idx,
        totalAmount: item.totalAmount ?? "0.00",
      }));

      setDataCategories(parsed);
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  return { dataCategories, fetchCategories, route, isLoading };
};
