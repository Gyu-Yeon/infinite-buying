import { useData } from "@/app/providers/DataProvider";
import { Input } from "../../shared/ui/input";
import { Label } from "../../shared/ui/label";
import { Button } from "../../shared/ui/shadcn/button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "../../shared/ui/shadcn/dialog";

export default function FormDialog() {
  const { formData, modalOpen, onChangeModalState, handleChange, handleSubmit } = useData();

  return (
    <Dialog open={modalOpen} onOpenChange={onChangeModalState}>
      <form onSubmit={(e) => handleSubmit(e, formData)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>데이터 추가하기</DialogTitle>
            <DialogDescription>오늘의 매수를 추가하세요</DialogDescription>
          </DialogHeader>
          <div className="grid gap-4">
            <div className="grid gap-3">
              <Label htmlFor="days">Day</Label>
              <Input id="days" name="days" value={formData.days} onChange={handleChange} />
            </div>
            <div className="grid gap-3">
              <Label htmlFor="averagePrice">평균 단가</Label>
              <Input id="averagePrice" name="averagePrice" value={formData.averagePrice} onChange={handleChange} />
            </div>
            <div className="grid gap-3">
              <Label htmlFor="shares">매수 갯수</Label>
              <Input id="shares" name="shares" value={formData.shares} onChange={handleChange} />
            </div>
            <div className="grid gap-3">
              <Label htmlFor="totalInvestment">총매수금</Label>
              <Input id="totalInvestment" name="totalInvestment" value={formData.totalInvestment} onChange={handleChange} />
            </div>
            <div className="grid gap-3">
              <Label htmlFor="currentValuation">현재 평가액</Label>
              <Input id="currentValuation" name="currentValuation" value={formData.currentValuation} onChange={handleChange} />
            </div>
          </div>
          <DialogFooter>
            <Button onClick={(e) => handleSubmit(e, formData)} variant="outline" type="submit">
              데이터 추가하기
            </Button>
          </DialogFooter>
        </DialogContent>
      </form>
    </Dialog>
  );
}
