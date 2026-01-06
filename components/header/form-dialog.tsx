import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "../ui/shadcn/dialog";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { useData } from "@/app/providers/DataProvider";
import { Button } from "../ui/shadcn/button";
import { useAddInvestmentData } from "@/entities/app/hooks";
import { useState } from "react";

export default function FormDialog() {
    const { modalOpen, onChangeModalState } = useData();
    const { mutateAsync: addInvestmentData } = useAddInvestmentData();

    const [formData, setFormData] = useState({
        days: 0,
        shares: 0,
        averagePrice: 0,
        totalInvestment: 0,
        currentValuation: 0,
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value, // 빈 값이면 0
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        await addInvestmentData(formData);
    };

    return (
        <Dialog open={modalOpen} onOpenChange={onChangeModalState}>
            <form onSubmit={handleSubmit}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>데이터 추가하기</DialogTitle>
                        <DialogDescription>
                            오늘의 매수를 추가하세요
                        </DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4">
                        <div className="grid gap-3">
                            <Label htmlFor="days">Day</Label>
                            <Input
                                id="days"
                                name="days"
                                value={formData.days}
                                onChange={handleChange}
                            />
                        </div>
                        <div className="grid gap-3">
                            <Label htmlFor="averagePrice">평균 단가</Label>
                            <Input
                                id="averagePrice"
                                name="averagePrice"
                                value={formData.averagePrice}
                                onChange={handleChange}
                            />
                        </div>
                        <div className="grid gap-3">
                            <Label htmlFor="shares">매수 갯수</Label>
                            <Input
                                id="shares"
                                name="shares"
                                value={formData.shares}
                                onChange={handleChange}
                            />
                        </div>
                        <div className="grid gap-3">
                            <Label htmlFor="totalInvestment">총매수금</Label>
                            <Input
                                id="totalInvestment"
                                name="totalInvestment"
                                value={formData.totalInvestment}
                                onChange={handleChange}
                            />
                        </div>
                        <div className="grid gap-3">
                            <Label htmlFor="currentValuation">
                                현재 평가액
                            </Label>
                            <Input
                                id="currentValuation"
                                name="currentValuation"
                                value={formData.currentValuation}
                                onChange={handleChange}
                            />
                        </div>
                    </div>
                    <DialogFooter>
                        <Button
                            onClick={handleSubmit}
                            variant="outline"
                            type="submit"
                        >
                            데이터 추가하기
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </form>
        </Dialog>
    );
}
