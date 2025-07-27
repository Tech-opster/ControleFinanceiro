export interface CreateIncomeDTO {
  receita: string;
  valor: number;
  data: Date;
}

export type UpdateIncomeDTO = Partial<CreateIncomeDTO>;