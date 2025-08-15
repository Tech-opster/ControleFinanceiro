export interface CreateCryptoDTO {
  name: string;
  amount: number;
  price: number;
  quantity: number;
  purchaseDate: Date;
  bank: string;
  userId: number;
}

export type UpdateCryptoDTO = Partial<CreateCryptoDTO>;
