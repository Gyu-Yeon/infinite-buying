"use client";

import { Card, CardContent } from "../ui/card";

const TEXT_COLOR_BY_FIELD = {
    보유주식: "text-blue-600",
    현재평가액: "text-green-600",
    평균단가: "text-gray-800",
    수익률: "text-gray-800",
} as const;

type FieldType = keyof typeof TEXT_COLOR_BY_FIELD;

export default function Header() {
    return (
        <div className="w-[90%] bg-gray-50">
            <h1 className="text-3xl font-bold mb-6 text-gray-800">
                FNGU 무한매수법 1회차
            </h1>
            <div className="grid grid-cols-2 gap-4 mb-4">
                <HeaderCard field="보유주식" value="255개" />
                <HeaderCard field="평균단가" value="$25.55" />
            </div>
            <div className="grid grid-cols-2 gap-4">
                <HeaderCard field="현재평가액" value="$1,664" />
                <HeaderCard field="수익률" value="3.55%" />
            </div>
        </div>
    );
}

function HeaderCard({
    field,
    value,
}: {
    field: FieldType;
    value: string | number;
}) {
    return (
        <Card className=" bg-white border-white">
            <CardContent>
                <div className="flex flex-col">
                    <div className="text-sm text-gray-600">{field}</div>
                    <div
                        className={`text-2xl font-bold ${TEXT_COLOR_BY_FIELD[field]}`}
                    >
                        {value}
                    </div>
                </div>
            </CardContent>
        </Card>
    );
}

//     finalDay.profitLoss >= 0
//         ? "text-green-600"
//         : "text-red-600"
