// entities/app/services/index.ts
import { CreateInvestmentRequest } from "@/app/api/investment/route";
import { DataType } from "../types";

export async function GET(): Promise<DataType[]> {
    const response = await fetch("/api/investment", {
        cache: "no-store",
    });

    if (!response.ok) {
        throw new Error("Failed to fetch investment data");
    }

    const json = await response.json();
    return json.data;
}

export async function addInvestment(data: CreateInvestmentRequest) {
    console.log("📤 데이터 전송:", data);

    const response = await fetch("/api/investment", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
    });

    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to create investment data");
    }

    return response.json();
}
