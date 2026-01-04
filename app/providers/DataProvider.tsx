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
  chartData: DataType[];
}

export const DataContext = createContext<DataContextType | undefined>(undefined);

export default function DataProvider({ children }: { children: React.ReactNode }) {
  const [chartData, setChartData] = useState<DataType[]>([
    { days: 1, shares: 4, averagePrice: 38352, totalInvestment: 153410, currentValuation: 153230, profits: -466, profitLoss: 2.39 },
    { days: 2, shares: 6, averagePrice: 38311, totalInvestment: 229869, currentValuation: 235766, profits: 5484, profitLoss: 2.23 },
    { days: 3, shares: 8, averagePrice: 38594, totalInvestment: 308756, currentValuation: 315192, profits: 5875, profitLoss: 1.9 },
    { days: 4, shares: 10, averagePrice: 38631, totalInvestment: 386314, currentValuation: 385452, profits: -1565, profitLoss: -0.41 },
    { days: 5, shares: 14, averagePrice: 38312, totalInvestment: 536370, currentValuation: 518346, profits: -18979, profitLoss: -3.54 },
    { days: 6, shares: 18, averagePrice: 38048, totalInvestment: 684864, currentValuation: 667372, profits: -18705, profitLoss: -2.73 },
    { days: 7, shares: 22, averagePrice: 37720, totalInvestment: 829846, currentValuation: 797402, profits: -33901, profitLoss: -4.09 },
    { days: 8, shares: 26, averagePrice: 37315, totalInvestment: 967569, currentValuation: 900277, profits: -69041, profitLoss: -7.14 },
  ]);
  const [data, setData] = useState<DataType>(chartData[chartData.length - 1]);

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
