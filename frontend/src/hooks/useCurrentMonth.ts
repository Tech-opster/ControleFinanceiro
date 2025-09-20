import { useMemo } from "react";

export function useCurrentMonth<T extends { date: Date | string }>(data: T[]) {
    
  const currentMonthData = useMemo(() => {
    const now = new Date();
    const currentMonth = now.getMonth();
    const currentYear = now.getFullYear();

    return data.filter((item) => {
      const itemDate = new Date(item.date);
      if (Number.isNaN(itemDate.getTime())) return false; // valida
      return (
        itemDate.getMonth() === currentMonth &&
        itemDate.getFullYear() === currentYear
      );
    });
  }, [data]);

  return currentMonthData;
}
