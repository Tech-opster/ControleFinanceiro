export interface CreateIncomeDTO {
  name: string;
  amount: number;
  date: Date;
  userId: number;
}

export type UpdateIncomeDTO = Partial<CreateIncomeDTO>;