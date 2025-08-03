export interface CreateOutflowDTO {
  name: string;
  amount: number;
  date: Date;
  categoryId: number;
  status: boolean;
  userId: number;
}

export type UpdateOutflowDTO = Partial<CreateOutflowDTO>;