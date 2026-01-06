"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addInvestment } from "../services";
import { QUERY_KEYS } from "../queries/use-fecth-data";
import { CreateInvestmentRequest } from "@/app/api/investment/route";

export function useAddInvestmentData() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (data: CreateInvestmentRequest) => addInvestment(data),
        onSuccess: (response) => {
            console.log("✅ 생성 성공:", response);
            // 데이터 목록 자동 갱신
            queryClient.invalidateQueries({
                queryKey: QUERY_KEYS.data,
            });
        },
        onError: (error) => {
            console.error("❌ 생성 실패:", error);
        },
    });
}
