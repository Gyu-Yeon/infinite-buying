// entities/app/queries/use-fetch-data.ts
"use client";

import { useQuery } from "@tanstack/react-query";
import { GET } from "../services";
import { DataType } from "../types";

export const QUERY_KEYS = {
    data: ["investmentData"] as const,
};

export default function useFetchData() {
    return useQuery<DataType[], Error>({
        queryKey: QUERY_KEYS.data,
        queryFn: GET,
        staleTime: 60 * 1000, // 1분
        meta: {
            exceptionType: "toast",
        },
    });
}
