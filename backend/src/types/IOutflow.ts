export interface CreateOutflowDTO {
  despesa: string;
  valor: number;
  data: Date;
  categoria: string;
  status: boolean;
}

export type UpdateOutflowDTO = Partial<CreateOutflowDTO>;