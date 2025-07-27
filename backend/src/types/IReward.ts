export interface CreateRewardDTO {
  programa: string;
  quantidade: number;
  dataVencimento: Date;
  emissor: string;
}

export type UpdateRewardDTO = Partial<CreateRewardDTO>;