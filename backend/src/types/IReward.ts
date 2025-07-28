export interface CreateRewardDTO {
  loyaltyProgram: string;
  quantity: number;
  dueDate: Date;
  issuer: string;
}

export type UpdateRewardDTO = Partial<CreateRewardDTO>;