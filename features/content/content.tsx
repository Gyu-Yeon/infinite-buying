"use client";

import { useData } from "@/app/providers/DataProvider";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, ResponsiveContainer, Tooltip, Legend } from "recharts";
import { Card, CardContent, CardHeader } from "../../shared/ui/shadcn/card";

export default function Content() {
  const { chartData } = useData();

  const filteredChartData = chartData.map((data) => ({
    day: data.days,
    close: data.currentValuation / data.shares,
    averagePrice: data.averagePrice,
    profitLoss: data.profitLoss,
  }));

  return (
    <div className="w-[90%]">
      <Card className="bg-white border-white mb-5">
        <CardHeader>수익률 추이</CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={filteredChartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis
                dataKey="day"
                label={{
                  value: "거래일",
                  position: "insideBottom",
                  offset: -5,
                }}
              />
              <YAxis
                yAxisId="left"
                orientation="left"
                domain={["dataMin - 5", "dataMax + 5"]} // 최솟값-5 ~ 최댓값+5
                label={{
                  value: "가격 ($)",
                  angle: -90,
                  position: "insideLeft",
                }}
              />
              <YAxis
                yAxisId="right"
                orientation="right"
                domain={["dataMin - 2", "dataMax + 2"]} // 수익률 범위 조정
                label={{
                  value: "수익률 (%)",
                  angle: 90,
                  position: "insideRight",
                }}
              />
              <Tooltip />
              <Legend />
              <Line
                yAxisId="right" // 수익률은 오른쪽 Y축 사용
                type="monotone"
                dataKey="profitLoss"
                stroke="#3b82f6"
                strokeWidth={2}
                dot={true}
                name="수익률 (%)"
              />
              <Line yAxisId="left" type="monotone" dataKey="averagePrice" stroke="#ef4444" strokeWidth={2} strokeDasharray="5 5" dot={true} name="평단가 ($)" />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  );
}
