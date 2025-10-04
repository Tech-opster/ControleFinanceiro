import { useEffect, useState } from "react";
import * as api from "../services/api";

export type Data = {
  id: string | number;
  name: string;
  amount: number;
  price: number;
  quantity: number;
  purchaseDate: Date | string;
  bank: string;
};

export const useCryptos = () => {
  const route = "/cryptos";
  const [data, setData] = useState<Data[]>([]);

  useEffect(() => {
    fetchCryptos();
  }, []);

  const fetchCryptos = async () => {
    try {
      const cryptoData = await api.get<Data[]>(route);
      const parsed = cryptoData.map((item, idx) => ({
        ...item,
        purchaseDate: new Date(item.purchaseDate).toISOString().split("T")[0],
        id: item.id ?? idx,
      }));

      setData(parsed);
    } catch (err) {
      console.error(err);
    }
  };

  return { data, fetchCryptos, route };
};
