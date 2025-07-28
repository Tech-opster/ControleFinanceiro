export interface CreateOutflowDTO {
  outflow: string;
  amount: number;
  date: Date;
  categoryId: number;
  status: boolean;
}

export type UpdateOutflowDTO = Partial<CreateOutflowDTO>;