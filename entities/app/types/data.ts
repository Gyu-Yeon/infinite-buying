// entities/app/types.ts
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

export type DataContextType = {
  cardData: DataType | null;
  chartData: DataType[];
  formData: FormDataType;
  modalOpen: boolean;
  isLoading: boolean;
  error: Error | null;
  onChangeModalState: () => void;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleSubmit: (e: React.FormEvent, formData: FormDataType) => Promise<void>;
};

export type FormDataType = { days: number; shares: number; averagePrice: number; totalInvestment: number; currentValuation: number };
