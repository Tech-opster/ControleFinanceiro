export interface CreateInvestmentDTO {
  name: string;
  investmentType: string;
  amount: number;
  purchaseDate: Date;
  dueDate: Date;
  yieldValue: number;
  yieldType: string;
  bank: string;
  userId: number;
}

export type UpdateInvestmentDTO = Partial<CreateInvestmentDTO>;
