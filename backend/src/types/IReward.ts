export interface CreateRewardDTO {
  name: string;
  quantity: number;
  dueDate: Date;
  issuer: string;
  userId: number;
}

export type UpdateRewardDTO = Partial<CreateRewardDTO>;
