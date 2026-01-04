"use client";

import { useContext, useMemo, useState } from "react";
import { createContext } from "react";

type DataType = {
  days: number;
  shares: number;
  averagePrice: number;
  totalInvestment: number;
  currentValuation: number;
  profits: number;
  profitLoss: number;
};

interface DataContextType {
  data: DataType;
}

export const DataContext = createContext<DataContextType | undefined>(undefined);

export default function DataProvider({ children }: { children: React.ReactNode }) {
  const [data, setData] = useState<DataType>({
    days: 7,
    shares: 26,
    averagePrice: 37315,
    totalInvestment: 967569,
    currentValuation: 900277,
    profits: -69041,
    profitLoss: -6.65,
  });

  const [chartData, setChartData] = useState<DataType[]>([{ days: 1, shares: 4, averagePrice: 38352, totalInvestment: 175000, currentValuation: 180000, profits: 5000, profitLoss: 2.86 }]);

  const value = useMemo(() => ({ data, chartData }), [data, chartData]);

  return <DataContext.Provider value={value}>{children}</DataContext.Provider>;
}

export function useData() {
  const context = useContext(DataContext);
  if (!context) {
    throw new Error("useData must be used within DataProvider");
  }
  return context;
}
