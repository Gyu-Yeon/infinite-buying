"use client";

import { useData } from "@/app/providers/DataProvider";
import { Card, CardContent } from "../ui/shadcn/card";
import { Button } from "../ui/shadcn/button";
import { formatNumber } from "@/lib/utils";
import FormDialog from "./form-dialog";

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
    const { cardData, modalOpen, onChangeModalState } = useData();

    console.log("modalOpen", modalOpen);

    return (
        <div className="w-[90%] bg-gray-50 pt-10">
            <div className="flex">
                <h1 className="text-3xl font-bold mb-6 text-gray-800">
                    FNGU 무한매수법 1회차
                </h1>
                <Button
                    variant="default"
                    className="bg-blue-400 ml-4"
                    onClick={onChangeModalState}
                >
                    ADD
                </Button>
            </div>
            <div className="grid grid-cols-2 gap-4 mb-4">
                <HeaderCard
                    field="보유주식"
                    value={cardData?.shares}
                    unit="개"
                />
                <HeaderCard
                    field="평균단가"
                    value={formatNumber(cardData ? cardData?.averagePrice : 0)}
                    unit="원"
                />
            </div>
            <div className="grid grid-cols-2 gap-4 mb-4">
                <HeaderCard
                    field="현재평가액"
                    value={formatNumber(
                        cardData ? cardData?.currentValuation : 0
                    )}
                    unit="원"
                />
                <HeaderCard
                    field="총매수금"
                    value={formatNumber(
                        cardData ? cardData?.totalInvestment : 0
                    )}
                    unit="원"
                />
            </div>
            <div className="grid grid-cols-2 gap-4">
                <HeaderCard
                    field="수익금"
                    value={formatNumber(cardData ? cardData?.profits : 0)}
                    unit="원"
                />
                <HeaderCard
                    field="수익률"
                    value={cardData?.profitLoss}
                    unit="%"
                />
            </div>
            {modalOpen && <FormDialog />}
        </div>
    );
}

function HeaderCard({
    field,
    value,
    unit,
}: {
    field: FieldType;
    value: number | string | undefined;
    unit: string;
}) {
    return (
        <Card className=" bg-white border-white">
            <CardContent>
                <div className="flex flex-col">
                    <div className="text-sm text-gray-600">{field}</div>
                    <div
                        className={`text-2xl font-bold ${TEXT_COLOR_BY_FIELD[field]}`}
                    >
                        {value && value}
                        {unit}
                    </div>
                </div>
            </CardContent>
        </Card>
    );
}
