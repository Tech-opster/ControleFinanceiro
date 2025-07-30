export interface CreateRewardDTO {
  name: string;
  quantity: number;
  dueDate: Date;
  issuer: string;
}

export type UpdateRewardDTO = Partial<CreateRewardDTO>;