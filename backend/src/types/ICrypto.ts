export interface CreateCryptoDTO {
  currency: string;
  amount: number;
  price: number;
  quantity: number;
  purchaseDate: Date;
}

export type UpdateCryptoDTO = Partial<CreateCryptoDTO>;