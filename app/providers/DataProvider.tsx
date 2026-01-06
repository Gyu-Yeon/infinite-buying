// app/providers/DataProvider.tsx
"use client";

import useFetchData from "@/entities/app/queries/use-fecth-data";
import { DataContextType } from "@/entities/app/types";
import { createContext, useContext, useMemo } from "react";

export const DataContext = createContext<DataContextType | undefined>(
    undefined
);

export default function DataProvider({
    children,
}: {
    children: React.ReactNode;
}) {
    const { data: fetchedData, isLoading, error } = useFetchData();

    // useMemo로 파생 상태 계산 (state 불필요)
    const chartData = useMemo(() => {
        return fetchedData || [];
    }, [fetchedData]);

    const cardData = useMemo(() => {
        if (!chartData.length) return null;
        return chartData[chartData.length - 1];
    }, [chartData]);

    console.log("fetchedData", fetchedData);

    const value = useMemo(
        () => ({
            cardData,
            chartData,
            isLoading,
            error,
        }),
        [cardData, chartData, isLoading, error]
    );

    // 로딩 중
    if (isLoading) {
        return (
            <DataContext.Provider value={value}>
                <div>데이터 로딩 중...</div>
            </DataContext.Provider>
        );
    }

    // 에러 발생
    if (error) {
        return (
            <DataContext.Provider value={value}>
                <div>에러 발생: {error.message}</div>
            </DataContext.Provider>
        );
    }

    return (
        <DataContext.Provider value={value}>{children}</DataContext.Provider>
    );
}

export function useData() {
    const context = useContext(DataContext);
    if (!context) {
        throw new Error("useData must be used within DataProvider");
    }
    return context;
}
