export interface CreateOutflowDTO {
  name: string;
  amount: number;
  date: Date;
  categoryId: number;
  status: boolean;
}

export type UpdateOutflowDTO = Partial<CreateOutflowDTO>;