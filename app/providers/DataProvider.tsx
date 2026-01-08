// app/providers/DataProvider.tsx
"use client";

import { useAddInvestmentData } from "@/entities/app/hooks";
import useFetchData from "@/entities/app/queries/use-fecth-data";
import { DataContextType, FormDataType } from "@/entities/app/types";
import { createContext, useCallback, useContext, useMemo, useState } from "react";

export const DataContext = createContext<DataContextType | undefined>(undefined);

const defaultFormData: FormDataType = {
  days: 0,
  shares: 0,
  averagePrice: 0,
  totalInvestment: 0,
  currentValuation: 0,
};

export default function DataProvider({ children }: { children: React.ReactNode }) {
  const { data: fetchedData, isLoading, error } = useFetchData();
  const { mutateAsync: addInvestmentData } = useAddInvestmentData();

  const [modalOpen, setModalOpen] = useState(false);
  const [formData, setFormData] = useState(defaultFormData);

  // useMemo로 파생 상태 계산 (state 불필요)
  const chartData = useMemo(() => {
    return fetchedData || [];
  }, [fetchedData]);

  const cardData = useMemo(() => {
    if (!chartData.length) return null;
    return chartData[chartData.length - 1];
  }, [chartData]);

  const onChangeModalState = useCallback(() => {
    setModalOpen((prev) => !prev);
  }, []);

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const { name, value } = e.target;
      setFormData((prev) => ({
        ...prev,
        [name]: value, // 빈 값이면 0
      }));
    },
    [setFormData]
  );

  const handleSubmit = useCallback(
    async (e: React.FormEvent, formData: FormDataType) => {
      e.preventDefault();
      await addInvestmentData(formData);
      onChangeModalState();
    },
    [addInvestmentData, onChangeModalState]
  );

  const value = useMemo(
    () => ({
      cardData,
      chartData,
      formData,
      modalOpen,
      isLoading,
      error,
      onChangeModalState,
      handleChange,
      handleSubmit,
    }),
    [cardData, chartData, formData, modalOpen, isLoading, error, onChangeModalState, handleChange, handleSubmit]
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

  return <DataContext.Provider value={value}>{children}</DataContext.Provider>;
}

export function useData() {
  const context = useContext(DataContext);
  if (!context) {
    throw new Error("useData must be used within DataProvider");
  }
  return context;
}
