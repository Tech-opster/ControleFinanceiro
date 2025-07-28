export interface CreateInvestmentDTO {
  issuer: string;
  investmentType: string;
  amount: number;
  purchaseDate: Date;
  dueDate: Date;
  yieldValue: number;
  yieldType: string;
  bank: string;
}

export type UpdateInvestmentDTO = Partial<CreateInvestmentDTO>;