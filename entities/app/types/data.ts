// entities/app/types.ts
export type DataType = {
    id: number;
    days: number;
    shares: number;
    averagePrice: number;
    totalInvestment: number;
    currentValuation: number;
    profits: number;
    profitLoss: number;
};

export type DataContextType = {
    cardData: DataType | null;
    chartData: DataType[];
    isLoading: boolean;
    error: Error | null;
};
