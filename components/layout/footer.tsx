"use client";

import { useData } from "@/app/providers/DataProvider";
import { Card, CardContent, CardHeader } from "../ui/card";
import { formatNumber } from "@/lib/utils";

export default function Footer() {
  const { chartData } = useData();

  return (
    <div className="w-[90%] bg-white">
      <Card className="border-white">
        <CardHeader>일별 거래 내역</CardHeader>
        <CardContent>
          <div className="flex flex-col">
            <div className="flex mb-3 justify-between font-bold text-center border-b pb-2">
              <div className="w-20">일차</div>
              <div className="w-28">평균 단가</div>
              <div className="w-32">현재 평가 금액</div>
              <div className="w-28">보유 주식 수</div>
              <div className="w-28">총 매수금액</div>
              <div className="w-20">수익률</div>
            </div>
            {chartData.map((data) => {
              return (
                <div className="flex justify-between mb-3 text-center" key={data.days}>
                  <div className="w-20">{data.days}일차</div>
                  <div className="w-28">{formatNumber(data.averagePrice)}</div>
                  <div className="w-32">{formatNumber(data.currentValuation)}</div>
                  <div className="w-28">{formatNumber(data.shares)}</div>
                  <div className="w-28">{formatNumber(data.totalInvestment)}</div>
                  <div className="w-20">{data.profitLoss}</div>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
