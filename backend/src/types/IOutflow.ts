export interface CreateOutflowDTO {
  despesa: string;
  valor: number;
  data: Date;
  categoriaId: number;
  status: boolean;
}

export type UpdateOutflowDTO = Partial<CreateOutflowDTO>;