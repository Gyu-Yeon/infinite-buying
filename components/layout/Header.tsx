"use client";

import { useData } from "@/app/providers/DataProvider";
import { Card, CardContent } from "../ui/card";
import { Button } from "../ui/button";

const TEXT_COLOR_BY_FIELD = {
  보유주식: "text-blue-600",
  현재평가액: "text-green-600",
  총매수금: "text-green-600",
  평균단가: "text-gray-800",
  수익률: "text-gray-800",
  수익금: "text-gray-800",
} as const;

type FieldType = keyof typeof TEXT_COLOR_BY_FIELD;

export default function Header() {
  const { data } = useData();

  console.log(data);
  return (
    <div className="w-[90%] bg-gray-50">
      <div className="flex">
        <h1 className="text-3xl font-bold mb-6 text-gray-800">FNGU 무한매수법 1회차</h1>
        <Button variant="default" className="bg-blue-400 ml-4">
          ADD
        </Button>
      </div>
      <div className="grid grid-cols-2 gap-4 mb-4">
        <HeaderCard field="보유주식" value={data.shares} unit="개" />
        <HeaderCard field="평균단가" value={data.averagePrice} unit="원" />
      </div>
      <div className="grid grid-cols-2 gap-4 mb-4">
        <HeaderCard field="현재평가액" value={data.currentValuation} unit="원" />
        <HeaderCard field="총매수금" value={data.totalInvestment} unit="원" />
      </div>
      <div className="grid grid-cols-2 gap-4">
        <HeaderCard field="수익금" value={data.profits} unit="원" />
        <HeaderCard field="수익률" value={data.profitLoss} unit="%" />
      </div>
    </div>
  );
}

function HeaderCard({ field, value, unit }: { field: FieldType; value: number; unit: string }) {
  return (
    <Card className=" bg-white border-white">
      <CardContent>
        <div className="flex flex-col">
          <div className="text-sm text-gray-600">{field}</div>
          <div className={`text-2xl font-bold ${TEXT_COLOR_BY_FIELD[field]}`}>
            {value}
            {unit}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
