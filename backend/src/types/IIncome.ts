export interface CreateIncomeDTO {
  income: string;
  amount: number;
  date: Date;
}

export type UpdateIncomeDTO = Partial<CreateIncomeDTO>;