import { sql } from "@vercel/postgres";
import { NextRequest, NextResponse } from "next/server";

// DB 타입 (snake_case)
type InvestmentDataDB = {
    id: number;
    days: number;
    shares: number;
    average_price: number;
    total_investment: number;
    current_valuation: number;
    profits: number;
    profit_loss: number;
    created_at: Date;
};

// 클라이언트 타입 (camelCase)
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

export type CreateInvestmentRequest = {
    days: number;
    shares: number; // 이번에 구매한 주식 수
    averagePrice: number;
    totalInvestment: number;
    currentValuation: number;
};

// DB 데이터를 camelCase로 변환
function convertToCamelCase(data: InvestmentDataDB): DataType {
    return {
        id: data.id,
        days: data.days,
        shares: data.shares,
        averagePrice: Number(data.average_price),
        totalInvestment: Number(data.total_investment),
        currentValuation: Number(data.current_valuation),
        profits: Number(data.profits),
        profitLoss: Number(data.profit_loss),
    };
}

export async function GET() {
    try {
        const result = await sql<InvestmentDataDB>`
            SELECT * FROM investment_data ORDER BY days
        `;

        const data = result.rows.map(convertToCamelCase);

        return NextResponse.json({ data });
    } catch (error) {
        return NextResponse.json(
            { error: error instanceof Error ? error.message : "Unknown error" },
            { status: 500 }
        );
    }
}

export async function POST(request: NextRequest) {
    console.log("🚀 API Route /api/investment POST 호출");

    try {
        const body = (await request.json()) as CreateInvestmentRequest;
        const {
            days,
            shares: newShares,
            averagePrice,
            totalInvestment,
            currentValuation,
        } = body;

        console.log("📝 받은 데이터:", body);

        // 유효성 검사
        if (
            !days ||
            !newShares ||
            !averagePrice ||
            !totalInvestment ||
            !currentValuation
        ) {
            return NextResponse.json(
                { error: "모든 필드를 입력해주세요" },
                { status: 400 }
            );
        }

        // 해당 day의 기존 데이터 조회
        const existingData = await sql<InvestmentDataDB>`
            SELECT * FROM investment_data WHERE days = ${days}
        `;

        let totalShares: number;

        if (existingData.rows.length > 0) {
            // 기존 데이터가 있으면 shares 누적
            const existing = existingData.rows[0];
            totalShares = existing.shares + newShares;
            console.log(
                `📊 기존 ${existing.shares}주 + 신규 ${newShares}주 = 총 ${totalShares}주`
            );
        } else {
            // 새로운 day면 그대로 사용
            totalShares = newShares;
            console.log(`📊 신규 데이터: ${totalShares}주`);
        }

        // profits 계산: 현재 평가액 - 총 투자금
        const profits = currentValuation - totalInvestment;

        // profitLoss 계산: (수익 / 총 투자금) * 100
        const profitLoss =
            totalInvestment > 0 ? (profits / totalInvestment) * 100 : 0;

        console.log(`💰 수익: ${profits}원, 수익률: ${profitLoss.toFixed(2)}%`);

        // 데이터 삽입 또는 업데이트
        if (existingData.rows.length > 0) {
            // 기존 데이터 업데이트
            const result = await sql<InvestmentDataDB>`
                UPDATE investment_data 
                SET 
                    shares = ${totalShares},
                    average_price = ${averagePrice},
                    total_investment = ${totalInvestment},
                    current_valuation = ${currentValuation},
                    profits = ${profits},
                    profit_loss = ${profitLoss}
                WHERE days = ${days}
                RETURNING *
            `;

            console.log("✅ 데이터 업데이트 완료");
            const data = convertToCamelCase(result.rows[0]);

            return NextResponse.json(
                {
                    success: true,
                    data,
                    message: `Day ${days} 데이터가 업데이트되었습니다`,
                },
                { status: 200 }
            );
        } else {
            // 새 데이터 삽입
            const result = await sql<InvestmentDataDB>`
                INSERT INTO investment_data (
                    days, shares, average_price, total_investment, 
                    current_valuation, profits, profit_loss
                )
                VALUES (
                    ${days}, ${totalShares}, ${averagePrice}, ${totalInvestment},
                    ${currentValuation}, ${profits}, ${profitLoss}
                )
                RETURNING *
            `;

            console.log("✅ 새 데이터 생성 완료");
            const data = convertToCamelCase(result.rows[0]);

            return NextResponse.json(
                {
                    success: true,
                    data,
                    message: `Day ${days} 데이터가 생성되었습니다`,
                },
                { status: 201 }
            );
        }
    } catch (error) {
        console.error("❌ POST 에러:", error);
        return NextResponse.json(
            { error: error instanceof Error ? error.message : "Unknown error" },
            { status: 500 }
        );
    }
}
