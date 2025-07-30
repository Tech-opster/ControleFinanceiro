export interface CreateIncomeDTO {
  name: string;
  amount: number;
  date: Date;
}

export type UpdateIncomeDTO = Partial<CreateIncomeDTO>;