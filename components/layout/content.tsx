"use client";

import { useData } from "@/app/providers/DataProvider";
import { Card, CardHeader } from "../ui/card";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, ResponsiveContainer } from "recharts";

const chartData = [
  { day: 1, 종가: 25, 평단가: 25, "수익률(%)": 0 },
  { day: 2, 종가: 24.42, 평단가: 24.71, "수익률(%)": -1.2 },
  { day: 3, 종가: 24.81, 평단가: 24.76, "수익률(%)": 0.2 },
];

export default function Content() {
  const { data } = useData();

  return (
    <div className="w-[90%]">
      <Card className="bg-white border-white">
        <CardHeader>
          가격 & 평단가 추이
          <ResponsiveContainer width="100%" height={300}>
            {/* 여기에 차트 내용 */}
            <LineChart data={chartData}>
              {/* 차트 구성 요소들 */}
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
                label={{
                  value: "가격 ($)",
                  angle: -90,
                  position: "insideLeft",
                }}
              />
              <YAxis
                yAxisId="right"
                orientation="right"
                label={{
                  value: "수익률 (%)",
                  angle: 90,
                  position: "insideRight",
                }}
              />

              <Line
                yAxisId="left" // 왼쪽 Y축 사용
                type="monotone" // 선 스타일 (부드러운 곡선)
                dataKey="종가" // 데이터의 '종가' 값 사용
                stroke="#3b82f6" // 선 색상 (파란색)
                strokeWidth={2} // 선 두께
                dot={false} // 점 표시 안함
              />
            </LineChart>
          </ResponsiveContainer>
        </CardHeader>
      </Card>
    </div>
  );
}
